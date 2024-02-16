import React, {useState, useEffect} from 'react';
import { ButtonColorStates } from '../interfaces/enums';

interface CustomButtonProps {
    title: string;
    defaultColor: string,
    hoverColor: string,
    pressColor: string,
    onClickHandler: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({title, defaultColor, hoverColor, pressColor, onClickHandler }) => {

    

    const colorMap = new Map();

    colorMap.set(ButtonColorStates.Default, defaultColor)
    colorMap.set(ButtonColorStates.Hovered, hoverColor)
    colorMap.set(ButtonColorStates.Pressed, pressColor)

    const buttonStyles: React.CSSProperties = {
        paddingTop: '1rem',
        paddingBottom: '1rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: '400',
        backgroundColor: defaultColor,
        display: "inline-flex",
        borderRadius: '7px',
        margin: '0.25rem',
        userSelect: 'none',
        transition: '0.4s all',
        minWidth: '28dvw',
        justifyContent:'center',
        alignItems: 'center',
        textAlign: 'center'
    }


    const [mouseEntered, setMouseEntered] = useState(false);
    const [mousePressed, setMousePressed] = useState(false);
    const [currentColor, setCurrentColor] = useState(defaultColor);
    useEffect(() => {
        if (!mouseEntered && mousePressed) {
            setMousePressed(false);
        }
        else if (mousePressed){
            setCurrentColor(colorMap.get(ButtonColorStates.Pressed))
        }
        else if (mouseEntered) {
            setCurrentColor(colorMap.get(ButtonColorStates.Hovered))
        }
        else {
            setCurrentColor(colorMap.get(ButtonColorStates.Default))
        }
    }, [mouseEntered, mousePressed])


    return (
        <div 
            style={{...buttonStyles, backgroundColor: currentColor}} 
            onMouseEnter={() => setMouseEntered(true)}
            onMouseLeave={() => setMouseEntered(false)}
            onMouseDown={() => setMousePressed(true)}
            onMouseUp={() => setMousePressed(false)}
            onClick={() => onClickHandler()}
            >
            {title}
        </div>
    )
}

export default CustomButton;