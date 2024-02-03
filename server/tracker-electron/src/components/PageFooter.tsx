import React from 'react';
import { version } from '../../package.json';

const PageFooter = () => {
    const footerStyle: React.CSSProperties = {
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        fontFamily: "Inter",
        fontWeight: '400',
        fontSize: "12px"
    }
    const locale = 'ru';
    const [today, setDate] = React.useState(new Date());

    // update the current displayed date every minute
    React.useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);

        return () => {
            clearInterval(timer);
        }

    }, [])

    const time = today.toLocaleTimeString(locale, {hour: 'numeric', hour12: false, minute: 'numeric'});


    return (
        <div style={footerStyle}>
            <div>{`Version ${version}`}</div>
            <div>{time}</div>
        </div>
    )
}

export default PageFooter;