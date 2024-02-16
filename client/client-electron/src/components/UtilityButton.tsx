interface UtilityButtonProps {
    title: string;
    onHandleClick: () => void;
}

const UtilityButton: React.FC<UtilityButtonProps> = ({ title, onHandleClick }) => {

    const buttonStyles: React.CSSProperties = {
        padding: '0.25rem',
        display: 'flex',
        margin: '0.25rem',
        width: '100%',
        justifyContent: 'center',
    }

    return (
        <button
            style={buttonStyles}
            onClick={onHandleClick}
        >
            {title}
        </button>
    )
}

export default UtilityButton;