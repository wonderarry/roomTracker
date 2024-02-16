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
    
      
})

ws.on('message', (data) => {
    
})

ws.on('ping', (data) => {
    
    ws.ping()
})