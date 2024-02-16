import CustomButton from "../components/CustomButton";
import DropdownSelector from "../components/DropdownSelector";
import UtilityButton from "../components/UtilityButton";
import PageFooter from "../components/PageFooter";
import React, { useState, useEffect } from 'react';
import ConnectionConfig from "../components/ConfigPage";

interface DropdownIndices {
    roomIndex: number;
    specialistIndex: number;
    serviceIndex: number;
}

interface DropdownValues {
    isSet: boolean,
    rooms: string[],
    specialists: string[],
    services: string[]
}

const MainPage = () => {

    const divStyles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    const paddedDivStyles: React.CSSProperties = {
        paddingTop: '7px'
    }

    const [minimize, setMinimize] = useState(false);
    const [pin, setPin] = useState(false);

    const [dropdownIndices, setDropdownIndices] = useState<DropdownIndices>({
        roomIndex: -1,
        specialistIndex: -1,
        serviceIndex: -1
    })

    const [dropdownValues, setDropdownValues] = useState<DropdownValues>({
        isSet: false,
        rooms: [],
        specialists: [],
        services: []
    })

    useEffect(() => {
        if (minimize) {
            // TODO: collapse window
        }
    }, [minimize]);

    useEffect(() => {
        if (pin) {
            // TODO: pin to top
        }
    }, [pin]);

    const [ws, setWs] = useState<WebSocket | null>(null);

    const handleDropdownChange = (dropdownName: keyof DropdownIndices) => (selectedIndex: number) => {
        console.log('handleDropdownChange')
        setDropdownIndices(prevIndices => ({
            ...prevIndices,
            [dropdownName]: selectedIndex,
        }));
    };

    const handleWebsocketOnConnect = (rooms: string[], specialists: string[], services: string[], socket: WebSocket) => {   
        console.log('handleWebsocketOnConnect')
        setDropdownValues({
            isSet: true,
            rooms,
            specialists,
            services
        })
        setWs(socket)
    }

    const handleCustomButtonClick = (index: number) => {
        console.log('handleCustomButtonClick')
        ws?.send(JSON.stringify({
            requestType: 'selectionData',
            roomIndex: dropdownIndices.roomIndex,
            specialistIndex: dropdownIndices.specialistIndex,
            serviceIndex: dropdownIndices.serviceIndex,
            statusIndex: index
        }))
    }

    return (

        <div>
            {
                !dropdownValues.isSet && <ConnectionConfig onConnect={handleWebsocketOnConnect} />
            }
            {
                dropdownValues.isSet && <div>
                    {/* Main buttons section. 4 buttons -> 2 rows of 2 buttons */}
                    <div>
                        <div style={divStyles}>
                            <CustomButton title="Не работает" defaultColor="#bbbbbb" hoverColor="#999999" pressColor="#888888" onClickHandler={() => handleCustomButtonClick(0)} />
                            <CustomButton title="Ожидайте приглашения" defaultColor="#cccb9d" hoverColor="#abaa84" pressColor="#8a896a" onClickHandler={() => handleCustomButtonClick(1)} />
                        </div>
                        <div style={divStyles}>
                            <CustomButton title="Свободно, заходите" defaultColor="#95c795" hoverColor="#7ca67c" pressColor="#658765" onClickHandler={() => handleCustomButtonClick(2)} />
                            <CustomButton title="Занято" defaultColor="#ccaaaa" hoverColor="#ab8e8e" pressColor="#8a7272" onClickHandler={() => handleCustomButtonClick(3)} />
                        </div>
                    </div>
                    {/* Utility buttons section. 2 buttons, to pin on top and to extend/collapse */}
                    <div
                        style={divStyles}
                    >
                        <UtilityButton title="Уменьшить" onHandleClick={() => setMinimize(!minimize)} />
                        <UtilityButton title="Закрепить" onHandleClick={() => setPin(!pin)} />
                    </div>
                    {/* Room, Specialist and Service selection dropdowns. 3 dropdowns, 1 per row */}
                    {
                        <div style={paddedDivStyles}>
                            <DropdownSelector
                                onClickHandler={(index: number) => handleDropdownChange("roomIndex")(index)}
                                items={dropdownValues['rooms']}
                                placeholder="Выберите кабинет..."
                            />
                            <DropdownSelector
                                onClickHandler={(index: number) => handleDropdownChange("specialistIndex")(index)}
                                items={dropdownValues['specialists']}
                                placeholder="Выберите специалиста..."
                            />
                            <DropdownSelector
                                onClickHandler={(index: number) => handleDropdownChange("serviceIndex")(index)}
                                items={dropdownValues['services']}
                                placeholder="Выберите услугу..."
                            />
                        </div>
                    }
                </div>
            }
            {/* Footer section. */}
            <PageFooter />
        </div>
    )
}

export default MainPage;