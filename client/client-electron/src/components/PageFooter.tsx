import {version} from '../../package.json';

const PageFooter = () => {
    const footerStyle: React.CSSProperties = {
        fontSize: '12px',
        fontFamily: 'Inter',
        fontWeight: '400',
        display: 'flex'
    }
    return (
        <div style={footerStyle}>
            <div>{`Version ${version}`}</div>
        </div>
    )
}

export default PageFooter;