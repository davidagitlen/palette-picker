import React, { Component } from 'react';
import './App.css';
import Display from '../Display/Display';
import Controls from '../Controls/Controls';
import Projects from '../Projects/Projects';
import { getProjects, getPalettes } from '../../util/apiCalls'; 

class App extends Component{
  constructor(){
    super();
    this.state = {
      currentPalette : {
        palette: '',
        project_name: '',
        colors: [
          { hex_1: this.generateHex(), locked: false },
          { hex_2: this.generateHex(), locked: false },
          { hex_3: this.generateHex(), locked: false },
          { hex_4: this.generateHex(), locked: false },
          { hex_5: this.generateHex(), locked: false },
        ]
      },
      projects: [],
      palettes: []
    }
  }

  componentDidMount = async () => {
    const projects = await getProjects();
    this.setState({projects}, () => {console.log(this.state)})
    const palettes = await getPalettes();
    this.setState({palettes}, () => {console.log(this.state.currentPalette.colors)})
  }
  
  generateHex = (string = '#') => {
    const hexadecimals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    const index = Math.floor(Math.random() * 16);
    if (string.length === 7) {
      return string;
    } else {
      return this.generateHex(string + hexadecimals[index])
    }
  }

  getRandomHexes = () => {
    const { colors, project_name, palette } = this.state.currentPalette; 
    const newColors = colors.map((color, i) => {
      if (!color.locked) {
        color[`hex_${i+1}`] = this.generateHex();
        return color;
      } else {
        return color;
      }
    });
    this.setState({currentPalette : { palette, project_name, colors: newColors } }, () => {console.log(this.state)})
  }

  saveCurrentPalette = (paletteName, projectName) => {
    const { colors }  = this.state.currentPalette;
    this.setState({ currentPalette: { palette: paletteName, project_name: projectName, colors: colors } }, () => { console.log('after save', this.state) });
  }

  toggleLock = (position) => {
    const { colors, project_name, palette } = this.state.currentPalette;
    const newColors = colors.map((color, i) => {
      if (i === position) {
        color.locked = !color.locked;
        return color;
      } else {
        return color;
      }
    });
    this.setState({ currentPalette: { palette, project_name, colors: newColors } }, () => { console.log(this.state) })
  }

  render(){
    const { currentPalette, projects, palettes } = this.state;
    return (
      <main className="App">
        <h1>App</h1>
        <Display 
          currentPalette={currentPalette}
          toggleLock={this.toggleLock}/>
        <Controls 
          projects={projects} 
          saveCurrentPalette={this.saveCurrentPalette}
          getRandomHexes={this.getRandomHexes}
          />
        <Projects />
      </main>
    );
  }
}

export default App;
