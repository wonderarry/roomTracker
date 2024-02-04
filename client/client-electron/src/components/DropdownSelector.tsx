import React from 'react';


interface DropdownSelectorProps {
    onClickHandler: (itemIndex: number) => void;
    items: string[];
}


const DropdownSelector: React.FC<DropdownSelectorProps> = ({ onClickHandler, items }) => {
    const handleItemClick = (itemIndex: number) => {
        onClickHandler(itemIndex);
    }
    return (
        <>
        </>
    )
};

export default DropdownSelector;