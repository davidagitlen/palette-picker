import React from 'react';
import PropTypes from "prop-types";
import './Display.css';
import locked from '../../images/locked.svg';
import unlocked from '../../images/unlocked.svg';

const Display = ({ currentPalette, toggleLock }) => {
  const swatches = currentPalette.colors.map((color, i) => {
  const lockPath = color.locked ? locked : unlocked;
      return(
      <div key={'div' + i + Date.now()}>
        <input 
          className='lock-image'
          type='image' 
          alt='Lock/Unlock'
          key={'lock' + Date.now()}
          src={lockPath}
          onClick={() => toggleLock(i)}
          />
        <div 
          className='swatch'
          style={{backgroundColor:color[`hex_${i+1}`]}}
          key={i + Date.now()}
          >
        </div>
        <h3
          className='hex-code'
          key={'h3' + Date.now()}
        >
        {color[`hex_${i + 1}`]}
        </h3>
      </div>
      )
  })
  return (
    <section className="Display">
      <div>
        {swatches}
      </div>
    </section>
  )
}

export default Display;

Display.propTypes = {
  currentPalette: PropTypes.object.isRequired,
  toggleLock: PropTypes.func.isRequired
};