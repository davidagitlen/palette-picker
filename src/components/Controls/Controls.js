import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Controls.css";
import horizontalLine from '../../images/horizontal.png';
import verticalLine from '../../images/vertical_line.png';

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
            New Color Swatches
          </button>
          <img src={verticalLine} alt="line" className="line1" />
          <input
            id="project-name"
            className="project-name-input"
            list="project-list"
            type="text"
            name="project"
            placeholder="Enter a Project Name"
            autoComplete="off"
            value={this.state.project}
            onChange={this.handleChange}
          />
          <datalist id="project-list">{projectList}</datalist>
          <img src={horizontalLine} alt="line" className="line2" />
          <input
            className="palette-name-input"
            type="text"
            name="palette"
            placeholder="Enter a Palette Name"
            value={this.state.palette}
            onChange={this.handleChange}
          />
          <img src={verticalLine} alt="line" className="line3" />
          <button className="save-button" onClick={this.handleSave}>
            Save Palette
          </button>
          <h3>Search By Hex:</h3>
          <input
            className="hex-input"
            type="text"
            name="hex"
            placeholder="Enter a hex code"
            value={this.state.hex}
            onChange={this.handleChange}
          />
          <img src={horizontalLine} alt="line" className="line4" />
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

Controls.propTypes = {
  projects: PropTypes.array,
  clearSearch: PropTypes.func.isRequired,
  getRandomHexes: PropTypes.func.isRequired,
  saveCurrentPalette: PropTypes.func.isRequired,
  findPalettes: PropTypes.func.isRequired
};