import React, { Component } from "react";
import "./Controls.css";

class Controls extends Component {
  constructor() {
    super()
    this.state = {
      projects: [],
      palette: ""
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <form className="Controls">
        <h2>Controls</h2>
      </form>
    )
  }
};

export default Controls;
