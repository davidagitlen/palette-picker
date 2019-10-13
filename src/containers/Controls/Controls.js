import React, { Component } from "react";
import "./Controls.css";

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      palette: "",
      project: ""
    }
  }

  componentDidMount() {
    this.setState({projects: this.props.projects})
  }

  handleChange = e => {
    this.setState({ [e.target.name]:e.target.value })
  }

  handleRandomize = e => {
    e.preventDefault();
    this.props.getRandomHexes();
  }

  handleSave = e => {
    e.preventDefault();
    const { palette, project } = this.state;
    this.props.saveCurrentPalette(palette, project)
  }


  render() {
    const { projects } = this.props;
    const projectList = projects.map(project => {
      return <option value={project.project} key={project.id}>{project.project}</option>
    });
    return (
      <form className="Controls">
        <h2>Controls</h2>
        <button onClick={this.handleRandomize}>New palette!</button>
        <input
          list='project-list'
          type='text'
          name='project'
          placeholder='Select a project!'
          autoComplete='off'
          value={this.state.project} 
          onChange={this.handleChange}
        />
        <datalist id='project-list'>
          {projectList}
        </datalist>
        <input
          type='text'
          name='palette'
          placeholder='Name your palette!'
          value={this.state.palette}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSave}>Save Palette</button>
      </form>
    )
  }
};

export default Controls;
