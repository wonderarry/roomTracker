import React, { ReactNode } from 'react';
import { StatusCode } from '../common/enums';

interface FloatingItemProps {
    roomName: string;
    specialistName: string;
    serviceName: string;
    statusCode: StatusCode;
}

interface TextItemProps {
    children: ReactNode;
}

const StatusColors = new Map();
StatusColors.set(StatusCode.Inactive, '#dddddd')
StatusColors.set(StatusCode.PendingInvite, '#e3e098')
StatusColors.set(StatusCode.Available, '#ace6ac')
StatusColors.set(StatusCode.Occupied, '#ccaaaa')

const CodeToStatus = new Map();
CodeToStatus.set(0, 'Нет приема');
CodeToStatus.set(1, 'Ожидайте приглашения');
CodeToStatus.set(2, 'Свободно');
CodeToStatus.set(3, 'Занято');


const TextItem: React.FC<TextItemProps> = ({ children }) => {
    const textStyles: React.CSSProperties = {
        fontFamily: 'Inter',
        fontSize: '40px',
        fontWeight: '500',
        color: '#222222',
    }
    return (
        <div
            style={textStyles}
        >
            {children}
        </div>
    )
}
/* 
color: #dddddd for inactive
#fcffe0 for pending invite
#d8ffd8 for available
#ffe0e0 for occupied
*/
const FloatingItem: React.FC<FloatingItemProps> = ({ roomName, specialistName, serviceName, statusCode }) => {
    const itemStyles: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '12% 23% 34% 31%',
        gap: '8px',
        padding: '8px',
        width: '96%',
        margin: 'auto',
        backgroundColor: StatusColors.get(statusCode),
        borderRadius: '12px',
        boxShadow: '2px 2px 6px 1px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        marginBottom: '12px',
        transition: '0.3s',
        alignItems: 'center'
    }
    return (
        <div style={itemStyles}>
            <TextItem>{roomName}</TextItem>
            <TextItem>{specialistName}</TextItem>
            <TextItem>{serviceName}</TextItem>
            <TextItem>{CodeToStatus.get(statusCode)}</TextItem>
        </div>
    )
}

export default FloatingItem;