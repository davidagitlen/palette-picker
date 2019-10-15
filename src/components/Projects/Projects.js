import React from "react";
import "./Projects.css";
import Project from '../Project/Project';

const Projects = ({projects, palettes, editProject, editPalette, trashProject, trashPalette, selectPalette}) => {
  const projectList = projects.map(project => (
    <Project
      key={project.id}
      project={project}
      palettes={palettes}
      editProject={editProject}
      editPalette={editPalette}
      trashProject={trashProject}
      trashPalette={trashPalette}
      selectPalette={selectPalette}
    />
  )); 
  return (
    <section className="Projects">
      {projectList}
    </section>
  )
};

export default Projects;