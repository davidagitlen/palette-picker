import React from "react";
import "./Palettes.css";
import Palette from "../Palette/Palette";

const Palettes = ({palettes, editPalette, trashPalette}) => {
  const paletteList = palettes.map(palette => 
    <Palette 
      key={palette.id}
      palette={palette}
      editPalette={editPalette}
      trashPalette={trashPalette}
    />)
  return (
    <article className="Palettes">
      <h3>Palettes</h3>
      {paletteList}
    </article>
  );
};

export default Palettes;