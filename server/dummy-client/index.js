import WebSocket from 'ws';

const ws = new WebSocket("ws://localhost:5555");

ws.on('open', () => {
    console.log('connected!')
    const fieldsDataRequest = {
        requestType: 'selectionData',
        roomIndex: 0,
        specialistIndex: 1,
        serviceIndex: 2,
        statusIndex: 3
      };
    
      ws.send(JSON.stringify(fieldsDataRequest));
})

ws.on('message', (data) => {
    console.log(JSON.parse(data))
})

ws.on('ping', (data) => {
    console.log('ping data: ', data)
    ws.ping()
})