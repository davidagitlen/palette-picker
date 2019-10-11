import React from 'react';
import './Display.css';

const Display = ({ currentPalette, toggleLock }) => {
  const swatches = currentPalette.colors.map((color, i) => 
      <button 
      className='swatch'
      style={{backgroundColor:color[`hex_${i+1}`]}}
      key={i + Date.now()}
      onClick={() => toggleLock(i)}
      >
      </button>
    )
  return (
    <section className="Display">
      <h2>Display</h2>
      <div>
        {swatches}
      </div>
    </section>
  )
}

export default Display;