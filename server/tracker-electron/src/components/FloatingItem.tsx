import React, { ReactNode } from 'react';

interface FloatingItemProps {
    roomName: string;
    specialistName: string;
    serviceName: string;
    statusCode: number;
}

interface TextItemProps {
    children: ReactNode;
}

const TextItem: React.FC<TextItemProps> = ({ children }) => {
    const textStyles: React.CSSProperties = {
        fontFamily: 'Inter',
        fontSize: '25px',
        fontWeight: '500',
        color: '#222222'
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
color: #eeeeee for inactive
#fcffe0 for pending invite
#d8ffd8 for available
#ffe0e0 for occupied
*/
const FloatingItem: React.FC<FloatingItemProps> = ({ roomName, specialistName, serviceName, statusCode }) => {
    const itemStyles: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '12% 34% 34% 20%',
        gap: '8px',
        padding: '16px',
        width: '96%',
        margin: 'auto',
        backgroundColor: '#ffe0e0',
        borderRadius: '12px',
        boxShadow: '2px 2px 6px 1px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
    }
    return (
        <div style={itemStyles}>
            <TextItem>{roomName}</TextItem>
            <TextItem>{specialistName}</TextItem>
            <TextItem>{serviceName}</TextItem>
            <TextItem>{statusCode}</TextItem>
        </div>
    )
}

export default FloatingItem;