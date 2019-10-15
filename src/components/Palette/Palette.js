import React from "react";
import "./Palette.css";
import trash from '../../images/trash.svg';

const Palette = ({palette, editPalette, trashPalette, selectPalette}) => {
  const {
    hex_1,
    hex_2,
    hex_3,
    hex_4,
    hex_5
  } = palette;
  const hexArray = [hex_1, hex_2, hex_3, hex_4, hex_5];
  const swatchList = hexArray.map((hex, i) => 
    <div 
      className='swatches'
      key={i + Date.now()}
      style={{ backgroundColor: hex}}
    >
    </div>
    )
  return (
    <>
    <article className="Palette">
      <div 
        className='palette-name-wrapper'
        onClick={() => selectPalette(palette)}
      >
        <h3>{palette.palette}</h3>
      </div>
      <div 
        className='swatch-wrapper'
        onClick={() => selectPalette(palette)}
        >
        {swatchList}
      </div>
      <input
        className='trash'
        type='image'
        alt='trash'
        src={trash}
        onClick={() => trashPalette(palette.id)}
      />
    </article>
    </>
  );
};

export default Palette;
