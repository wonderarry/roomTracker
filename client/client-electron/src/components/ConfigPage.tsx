import React, { useState, useRef } from 'react';
import CustomButton from './CustomButton';

interface ConnectionConfigProps {
    onConnect: (rooms: string[], specialists: string[], services: string[], socketRef: WebSocket) => void;
}

const ConnectionConfig: React.FC<ConnectionConfigProps> = ({ onConnect }) => {

    const [host, setHost] = useState('');
    const [port, setPort] = useState('');

    const handleConnect = () => {
        const url = `ws://${host}:${port}`

        const socket = new WebSocket(url);

        socket.onopen = () => {
            socket.send(JSON.stringify({
                requestType: 'fieldsData'
            }));
        }

        const onMessageCall = (event: MessageEvent) => {
            socket.removeEventListener('message', onMessageCall)
            const message = JSON.parse(event.data);
            if (message.requestType === 'fieldsData') {
                const { rooms, specialists, services } = message;
                onConnect(rooms, specialists, services, socket);
            }


        }

        socket.addEventListener('message', onMessageCall);
        //TODO: connect to websocket
        //TODO: send request: {requestType: 'fieldsData'}
    }


    const inputStyles: React.CSSProperties = {
        display: 'flex',
        fontSize: '16px',
        fontFamily: 'Inter',
        padding: '0.4rem',
        marginRight: '2dvw',
        marginLeft: '2dvw'
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '93dvh',
                width: '96dvw',
                paddingLeft: '2dvw'
            }}
        >
            <a
                style={{
                    fontSize: '26px',
                    fontFamily: 'Inter',
                    textAlign: 'center',
                    fontWeight: '500',
                    paddingBottom: '1rem'
                }}
            >
                Подключение к серверу
            </a>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    paddingBottom: '1rem'
                }}
            >
                <input
                    type='text'
                    placeholder='Server Host'
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    style={{ ...inputStyles, ...{ width: '60%' } }}
                />
                <input
                    type='text'
                    placeholder='Server Port'
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    style={{ ...inputStyles, ...{ width: '35%' } }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <CustomButton
                    onClickHandler={() => handleConnect()}
                    title='Подключиться'
                    defaultColor='#ababab'
                    hoverColor='#787878'
                    pressColor='#454545'
                />
            </div>
        </div>
    )
}

export default ConnectionConfig;