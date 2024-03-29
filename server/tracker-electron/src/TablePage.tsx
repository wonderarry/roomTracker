import AdStrip from './components/AdStrip';
import FloatingItem from './components/FloatingItem';
import PageFooter from './components/PageFooter';
import { StatusCode } from './common/enums';
import { useState, useEffect } from 'react';
import OrgLogo from './assets/org_logo.jpg';

interface TableDataItem {
    room: string,
    specialist: string,
    service: string,
    status: StatusCode
}


const TablePage = () => {
    const mainPageStyles: React.CSSProperties = {
        backgroundColor: '#fefefe',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        width: '100dvw',
    }

    const headingStyles: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '12% 23% 34% 31%',
        gap: '8px',
        paddingRight: '2%',
        paddingLeft: '2%',
        paddingBottom: '8px',
        fontSize: '46px',
        fontFamily: 'Inter',
        fontWeight: '600',
        alignItems: 'center',
        textAlign: 'center',
        width: '96%',
        borderBottom: '1px solid #888888',
        marginBottom: '12px'
    }

    const [tableData, setTableData] = useState<TableDataItem[]>([]);
    

    useEffect(() => {
        // setTableData([
        //     { room: '209 A', specialist: '---', service: '---', status: 0 },
        //     { room: '209 Б', specialist: '---', service: '---', status: 0 },
        //     { room: '210', specialist: '---', service: '---', status: 0 },
        //     { room: '210 А', specialist: '---', service: '---', status: 0 },
        //     { room: '211', specialist: '---', service: '---', status: 0 }
        // ])
        window.electronAPI.onUpdateRooms((value: TableDataItem[]) => { 
            setTableData(value.map((item) => {
                const convertedItem: TableDataItem = {
                    room: item.room,
                    specialist: item.specialist,
                    service: item.service,
                    status: item.status
                }
                return convertedItem
            }))
        })
    }, [])

    return (
        <div style={mainPageStyles}>
            { /* Table component that will host a couple of FloatingItem (items of the table) */}
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '45% 55%',
                        borderBottom: '1px solid #888888',
                        overflow: 'hidden',
                        paddingLeft: '3%',
                        paddingRight: '3%'
                    }}
                >     
                <img 
                    style={{
                        height: '180px',
                        scale: '1.25',
                        overflow: 'hidden'
                    }}
                    src={OrgLogo}
                />       
                <div
                    style={{
                        fontSize: '60px',
                        fontFamily: 'Inter',
                        fontWeight: '500',
                        paddingTop: '8px',
                        textAlign: 'center',
                        
                    }}
                >Отделение функциональной и ультразвуковой диагностики</div>
                </div>
                <div style={headingStyles}>
                    <div>Кабинет</div>
                    <div>Имя врача</div>
                    <div>Исследование</div>
                    <div>Статус</div>
                </div>
                
                {
                    tableData.map((item) => {
                        if (item.status !== 0) {
                            return <FloatingItem
                            key={`${item.room}`} 
                            roomName={item.room}
                            specialistName={item.specialist}
                            serviceName={item.service}
                            statusCode={item.status}
                        />
                        }
                    })
                }
            </div>

            <AdStrip />
            <PageFooter />

        </div>
    )
}

export default TablePage;