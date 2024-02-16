import React, {useEffect, useState} from 'react';


interface DropdownSelectorProps {
    onClickHandler: (itemIndex: number) => void;
    placeholder: string;
    items: string[];
}


const DropdownSelector: React.FC<DropdownSelectorProps> = ({ onClickHandler, placeholder, items }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newIndex = e.target.value === '' ? null : parseInt(e.target.value, 10);
      setSelectedIndex(newIndex);
      onClickHandler(newIndex !== null ? newIndex : -1); // Pass -1 if no option is selected
    };
    
    

    return (
      <div>
        <select
          value={selectedIndex !== null ? selectedIndex : ''}
          onChange={handleSelectChange}
          style={{
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            margin: '1dvw',
            width: '98dvw'
          }}
        >
          <option 
            value=""  
          disabled>{placeholder}</option>
          {items.map((item, index) => (
            <option 
                key={index}
                value={index}
            >
                {item}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default DropdownSelector;