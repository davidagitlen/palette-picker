import React from 'react';
import './Project.css';
import Palettes from '../Palettes/Palettes';

const Project = ({project, palettes, editProject, editPalette, trashProject, trashPalette}) => {
  const filteredPalettes = palettes.filter(palette => palette.project_id === project.id)
  return (
    <article className="Project">
      <div className="project-wrapper">
        <h3>Project:</h3>
        <h3>{project.project}</h3>
      </div>
      <Palettes
        palettes={filteredPalettes}
        editPalette={editPalette}
        trashPalette={trashPalette}
      />
    </article>
  );
}

export default Project;