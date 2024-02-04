import React, {useState, useEffect} from 'react';
import { ButtonColorStates } from '../interfaces/enums';

interface CustomButtonProps {
    title: string;
    defaultColor: string,
    hoverColor: string,
    pressColor: string,
}

const CustomButton: React.FC<CustomButtonProps> = ({title, defaultColor, hoverColor, pressColor}) => {

    

    const colorMap = new Map();

    colorMap.set(ButtonColorStates.Default, defaultColor)
    colorMap.set(ButtonColorStates.Hovered, hoverColor)
    colorMap.set(ButtonColorStates.Pressed, pressColor)

    const buttonStyles: React.CSSProperties = {
        paddingTop: '2rem',
        paddingBottom: '2rem',
        paddingLeft: '4rem',
        paddingRight: '4rem',
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: '400',
        backgroundColor: defaultColor,
        display: "inline-flex",
        borderRadius: '7px',
        margin: '0.5rem',
        userSelect: 'none',
        transition: '0.4s all'
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
            >
            {title}
        </div>
    )
}

export default CustomButton;