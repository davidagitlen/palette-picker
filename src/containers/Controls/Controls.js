import React, { Component } from "react";
import "./Controls.css";

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [...this.props.projects],
      palette: "",
      project: ""
    }
  }

  componentDidMount() {

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
    return (
      <form className="Controls">
        <h2>Controls</h2>
        <button onClick={this.handleRandomize}>New palette!</button>
        <input
          type='text'
          name='project'
          placeholder='Select a project!'
          value={this.state.project} 
          onChange={this.handleChange}
        />
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
