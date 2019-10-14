import React, { Component } from "react";
import "./Controls.css";

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      palette: "",
      project: "",
      hex: ""
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
    const { projects, findPalettes, clearSearch } = this.props;
    const projectList = projects.map(project => {
      return <option value={project.project} key={project.id}>{project.project}</option>
    });
    return (
      <form className="Controls">
        <button 
          className='random-hex-button'
          onClick={this.handleRandomize}
          >
          New palette!
        </button>
        <input
          className='project-name-input'
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
          className='palette-name-input'
          type='text'
          name='palette'
          placeholder='Name your palette!'
          value={this.state.palette}
          onChange={this.handleChange}
        />
        <button 
          className='save-button'
          onClick={this.handleSave}
          >
          Save Palette
        </button>
        <p>Search By Hex</p>
        <input
          className='hex-input'
          type='text'
          name='hex'
          placeholder='Enter hex code!'
          value={this.state.hex}
          onChange={this.handleChange}
          />
        <button
          className='search-button'
          onClick={e => findPalettes(e, this.state.hex)}
        >
          Search
        </button>
        <button
          className='clear-button'
          onClick={clearSearch}
        >
          Clear
        </button>
      </form>
    )
  }
};

export default Controls;
