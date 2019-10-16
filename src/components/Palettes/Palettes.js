import React from "react";
import PropTypes from "prop-types";
import "./Palettes.css";
import Palette from "../Palette/Palette";

const Palettes = ({palettes, editPalette, trashPalette, selectPalette}) => {
  const paletteList = palettes.map(palette => 
    <Palette 
      key={palette.id}
      palette={palette}
      editPalette={editPalette}
      trashPalette={trashPalette}
      selectPalette={selectPalette}
    />)
  return (
    <article className="Palettes">
      <h3>Palettes: Click to Edit</h3>
      {paletteList}
    </article>
  );
};

export default Palettes;

Palettes.propTypes = {
  palettes: PropTypes.array.isRequired,
  editPalette: PropTypes.func.isRequired,
  trashPalette: PropTypes.func.isRequired,
  selectPalette: PropTypes.func.isRequired
};