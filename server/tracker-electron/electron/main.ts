import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import WebSocket, { WebSocketServer } from 'ws';
import Config, { get } from 'config';
import { RoomData, Rooms } from './interfaces/rooms';
import { StatusCode } from './interfaces/statusCode';
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let mainWindow: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']


const wss = new WebSocketServer({
    port: 5555,
});



interface BaseRequestData {
    requestType: string;
}

interface FieldsReceivedData extends BaseRequestData {
}

interface SelectionReceivedData extends BaseRequestData {
    roomIndex: number;
    specialistIndex: number;
    serviceIndex: number;
    statusIndex: number;
}

function getConfigArray(tag: string): string[] {
    const result: string[] = Config.get<string>(tag).split(',').map((item: string) => item.trim()) || []
    return result
}




function fillRooms(): Rooms {
    const possibleRooms = getConfigArray('Rooms')
    const specialists = getConfigArray('Specialists')
    const services = getConfigArray('Services')
    let response: Rooms = { rooms: [] }
    possibleRooms.forEach((room) => {
        response.rooms.push({
            room: room,
            specialist: specialists[0],
            service: services[0],
            status: StatusCode.Inactive
        })
    })
    return response
}

let dataArray = fillRooms()

const roomIndexToWs = new Map();


function createWindow() {
    mainWindow = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    mainWindow.setFullScreen(true)
    mainWindow.setMenu(null);
    // Test active push message to Renderer-process.
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        mainWindow.loadFile(path.join(process.env.DIST, 'index.html'))
    }

    initWebSocketHandlers(mainWindow)
}

function initWebSocketHandlers(mainWindow: BrowserWindow) {
    function handleFieldsData(ws: WebSocket, message: FieldsReceivedData) {
        const rooms = getConfigArray('Rooms')
        const specialists = getConfigArray('Specialists')
        const services = getConfigArray('Services')

        const responseData = {
            requestType: 'fieldsData',
            rooms: rooms,
            specialists: specialists,
            services: services
        }

        ws.send(JSON.stringify(responseData));
    }

    function validateSelectionDataInput(message: SelectionReceivedData) {
        let isValid = true
        if (message.requestType != 'selectionData') {
            isValid = false
        }

        if (message.roomIndex < 0 || message.roomIndex >= getConfigArray('Rooms').length) {
            isValid = false
        }

        if (message.specialistIndex < 0 || message.specialistIndex >= getConfigArray('Specialists').length) {
            isValid = false
        }

        if (message.serviceIndex < 0 || message.serviceIndex >= getConfigArray('Services').length) {
            isValid = false
        }

        if (message.statusIndex < 0 || message.statusIndex >= 4) {
            isValid = false
        }

        return isValid
    }

    function isRoomVacant(ws: WebSocket, message: SelectionReceivedData) {
        if (roomIndexToWs.get(message.roomIndex) == undefined) {
            return true
        }
        else {
            if (roomIndexToWs.get(message.roomIndex) === ws) {
                return true
            }
            return false
        }
    }

    function sendRoomsToRenderer() {
        console.log(dataArray.rooms)
        mainWindow.webContents.send('update-rooms', dataArray.rooms)
    }

    function updateRooms(message: SelectionReceivedData) {
        const data: RoomData = {
            room: getConfigArray('Rooms')[message.roomIndex],
            specialist: getConfigArray('Specialists')[message.specialistIndex],
            service: getConfigArray('Services')[message.serviceIndex],
            status: message.statusIndex
        }
        console.log('inside updateRooms, data: ', data)
        dataArray = {
            rooms: dataArray.rooms.map((item) => {

                if (item.room === data.room) {

                    return {
                        room: data.room,
                        specialist: data.specialist,
                        service: data.service,
                        status: data.status
                    }
                }
                else {
                    return item
                }
            })
        }
        sendRoomsToRenderer()
    }

    function occupyRoom(ws: WebSocket, message: SelectionReceivedData) {
        
        function findPreviousRoom() {
            for (const [roomIndex, wsInstance] of roomIndexToWs.entries()) {
                if (wsInstance === ws){
                    return roomIndex
                }
            }
            return -1
        }
        function assignRoomToWs(oldIndex: number) {
            roomIndexToWs.delete(oldIndex)
            roomIndexToWs.set(message.roomIndex, ws)
        }
        const lastRoom = findPreviousRoom()
        assignRoomToWs(lastRoom)
        updateRooms(message)
        if (lastRoom !== -1 && lastRoom !== message.roomIndex){
            updateRooms({
                requestType: 'closeConnection',
                roomIndex: lastRoom,
                specialistIndex: 0,
                serviceIndex: 0,
                statusIndex: 0,
            })
        }

    }


    async function handleSelectionData(ws: WebSocket, message: SelectionReceivedData) {
        if (!validateSelectionDataInput(message)) {
            // handle bad response
            return
        }

        if (!isRoomVacant(ws, message)) {
            // handle occupied room
            return
        }
        occupyRoom(ws, message)

        const responseData = {
            requestType: 'fieldsData',
            code: '201',
            result: 'OK',
        }
        ws.send(JSON.stringify(responseData));
    }

    async function handleCloseConnection(ws: WebSocket) {
        function removeWsRoomAttachment() {
            for (const [roomIndex, wsInstance] of roomIndexToWs.entries()) {
                if (wsInstance === ws) {
                    roomIndexToWs.delete(roomIndex);
                    return roomIndex;
                }
            }
            return undefined
        }
        const resultingIndex = removeWsRoomAttachment()
        if (resultingIndex !== undefined) {
            updateRooms({
                requestType: 'closeConnection',
                roomIndex: resultingIndex,
                specialistIndex: 0,
                serviceIndex: 0,
                statusIndex: 0,
            })
        }

    }
    mainWindow.webContents.on('did-finish-load', sendRoomsToRenderer)
    wss.on('connection', (ws, req) => {

        const heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.ping()
            }
        }, Config.get('HeartbeatInterval'))

        const clientIP = req.socket.remoteAddress + ':' + req.socket.remotePort
        console.log(clientIP)

        ws.on('message', async (msg) => {
            try {
                const parsedMessage = JSON.parse(msg.toString());
                if (!parsedMessage.hasOwnProperty("requestType")) {
                    throw new TypeError("Parsed message does not include requestType")
                }

                const requestType: string = parsedMessage.requestType;

                if (requestType === 'fieldsData') {
                    // handle fieldsData req
                    handleFieldsData(ws, parsedMessage as FieldsReceivedData)
                }
                else if (requestType === 'selectionData') {
                    // handle selectionData req
                    handleSelectionData(ws, parsedMessage as SelectionReceivedData)
                }
            }
            catch (error) {

                console.error("Error parsing incoming message: ", error)
            }
        })

        ws.on('close', (code, reason) => {
            clearInterval(heartbeatInterval);
            handleCloseConnection(ws)
        })
    })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        mainWindow = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(createWindow)
