import AdStrip from './components/AdStrip';
import FloatingItem from './components/FloatingItem';
import PageFooter from './components/PageFooter';
import { StatusCode } from './common/enums';




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
        gridTemplateColumns: '12% 34% 34% 20%',
        gap: '8px',
        paddingRight: '2%',
        paddingLeft: '2%',
        paddingBottom: '8px',
        fontSize: '40px',
        fontFamily: 'Inter',
        fontWeight: '600',
        alignItems: 'center',
        textAlign: 'center',
        width: '96%',
        borderBottom: '3px solid #dadada',
        marginBottom: '12px'
    }

    // const roomNumbers = import.meta.env.VITE_ROOM_NUMBERS;
    // const specialistNames = import.meta.env.VITE_SPECIALIST_NAMES;
    // const servicesPerformed = import.meta.env.VITE_SERVICES_PERFORMED;


    
    return (
        <div style={mainPageStyles}>
            { /* Table component that will host a couple of FloatingItem (items of the table) */}
            <div style={{ flex: 1 }}>
                <div style={headingStyles}>
                    <div>Номер кабинета</div>
                    <div>Имя специалиста</div>
                    <div>Исследование</div>
                    <div>Статус</div>
                </div>
                {/*roomNumbers.split(';')*/}
                <FloatingItem 
                    roomName='123'
                    specialistName='Пантикова И.Н.'
                    serviceName='ЭКГ ФВД ХМ-ЭКГ СМАД'
                    statusCode={StatusCode.Available}
                />
            </div>

            <AdStrip />
            <PageFooter />

        </div>
    )
}

export default TablePage;