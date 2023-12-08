import React from 'react';
import AdvertisementImage from '../assets/ad.gif';

const AdStrip = () => {
    const stripStyles: React.CSSProperties = {
        width: '100%',
    }

    const imageStyles: React.CSSProperties = {
        objectFit: 'fill'
    }

    return (
        <div style={stripStyles}>
            <img 
                style={imageStyles}
                src={AdvertisementImage}
            />
        </div>
    )
}

export default AdStrip;