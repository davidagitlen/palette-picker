import React from 'react';
import './Display.css';
import locked from '../../images/locked.svg';
import unlocked from '../../images/unlocked.svg';

const Display = ({ currentPalette, toggleLock }) => {
  const swatches = currentPalette.colors.map((color, i) => {
  const lockPath = color.locked ? locked : unlocked;
      return(
      <>
        <div 
          className='swatch'
          style={{backgroundColor:color[`hex_${i+1}`]}}
          key={i + Date.now()}
          >
        </div>
        <input 
          className='lock-image'
          type='image' 
          alt='Lock/Unlock'
          key={'lock' + Date.now()}
          src={lockPath}
          onClick={() => toggleLock(i)}
          />
        <h3
          className='hex-code'
        >
        {color[`hex_${i + 1}`]}
        </h3>
      </>
      )
  })
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