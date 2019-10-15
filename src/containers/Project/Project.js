import React, { Component } from 'react';
import './Project.css';
import Palettes from '../Palettes/Palettes';
import update from '../../images/update.svg';
import trash from '../../images/trash.svg';
import oneToMany from "../../images/one_to_many.png";

class Project extends Component{
  constructor(props){
    super(props);
    this.state = {
      project: ''
    }
  }

  handleChange = e => {
    this.setState({project: e.target.value}, () => {
      console.log(this.state)
    })
  }
  render() {
    const { 
      project, 
      palettes, 
      editProject, 
      editPalette, 
      trashProject, 
      trashPalette,
      selectPalette } = this.props;
    const filteredPalettes = palettes.filter(palette => palette.project_id === project.id)
    return (
      <article className="Project">
        <div className="input-wrapper">
          <input
            id="trash"
            type="image"
            alt="trash"
            src={trash}
            onClick={() => trashProject(project.id)}
          />
          <label htmlFor="trash">Trash</label>
        </div>
        <div className="input-wrapper">
          <input
            id="update"
            type="image"
            alt="update"
            src={update}
            onClick={() => editProject(this.state.project, project.id)}
          />
          <label htmlFor="update">Update</label>
        </div>
        <div className="project-wrapper">
          <h3>Project:</h3>
          <input
            className="project-name-input"
            type="text"
            value={this.state.project}
            placeholder={project.project}
            onChange={this.handleChange}
          />
        </div>
        <img src={oneToMany} alt="line" className="one-to-many" />
        <Palettes
          palettes={filteredPalettes}
          editPalette={editPalette}
          trashPalette={trashPalette}
          selectPalette={selectPalette}
        />
      </article>
    );
  }

}

export default Project;