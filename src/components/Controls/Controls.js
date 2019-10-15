import React, { Component } from "react";
import "./Controls.css";
import cross from '../../images/cross.png';

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

  handleClearForm = e => {
    e.preventDefault();
    this.props.clearSearch();
    this.setState({hex : ''});
  }

  render() {
    const { projects, findPalettes } = this.props;
    const projectList = projects.map(project => {
      return <option value={project.project} key={project.id}>{project.project}</option>
    });
    return (
      <>
        <h2>Add A Project & Palette:</h2>
        <form className="Controls">
          <button className="random-hex-button" onClick={this.handleRandomize}>
            New palette!
          </button>
          <img src={cross} alt="line" className="cross1" />
          <input
            className="project-name-input"
            list="project-list"
            type="text"
            name="project"
            placeholder="Select a project!"
            autoComplete="off"
            value={this.state.project}
            onChange={this.handleChange}
          />
          <datalist id="project-list">{projectList}</datalist>
          <img src={cross} alt="line" className="cross2" />
          <input
            className="palette-name-input"
            type="text"
            name="palette"
            placeholder="Name your palette!"
            value={this.state.palette}
            onChange={this.handleChange}
          />
          <img src={cross} alt="line" className="cross3" />
          <button className="save-button" onClick={this.handleSave}>
            Save Palette
          </button>
          <h3>Search By Hex:</h3>
          <input
            className="hex-input"
            type="text"
            name="hex"
            placeholder="Enter hex code!"
            value={this.state.hex}
            onChange={this.handleChange}
          />
          <img src={cross} alt="line" className="cross4" />
          <div className="button-wrapper">
            <button
          className='search-button'
          onClick={e => findPalettes(e, this.state.hex)}
        >
          Search
        </button>
        <button
          className='clear-button'
          onClick={this.handleClearForm}
        >
          Clear
        </button>
          </div>
        </form>
      </>
    );
  }
};

export default Controls;