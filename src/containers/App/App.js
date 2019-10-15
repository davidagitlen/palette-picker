import React, { Component } from 'react';
import './App.css';
import Display from '../Display/Display';
import Controls from '../Controls/Controls';
import Preview from "../Preview/Preview";
import Projects from '../Projects/Projects';
import { 
  getProjects, 
  getPalettes, 
  postPalette, 
  postProject,
  patchProject,
  patchPalette,
  deleteProject,
  deletePalette,
  searchByHex
  } from '../../util/apiCalls'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPalette: {
        palette: "",
        project_name: "",
        colors: [
          { hex_1: this.generateHex(), locked: false },
          { hex_2: this.generateHex(), locked: false },
          { hex_3: this.generateHex(), locked: false },
          { hex_4: this.generateHex(), locked: false },
          { hex_5: this.generateHex(), locked: false }
        ]
      },
      projects: [],
      palettes: [],
      error: "",
      foundPalettes: []
    };
  }

  componentDidMount = async () => {
    const projects = await getProjects();
    this.setState({ projects }, () => {
    });
    const palettes = await getPalettes();
    this.setState({ palettes }, () => {
    });
  };

  generateHex = (string = "#") => {
    const hexadecimals = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F"
    ];
    const index = Math.floor(Math.random() * 16);
    if (string.length === 7) {
      return string;
    } else {
      return this.generateHex(string + hexadecimals[index]);
    }
  };

  getRandomHexes = () => {
    const { colors, project_name, palette } = this.state.currentPalette;
    const newColors = colors.map((color, i) => {
      if (!color.locked) {
        color[`hex_${i + 1}`] = this.generateHex();
        return color;
      } else {
        return color;
      }
    });
    this.setState(
      { currentPalette: { palette, project_name, colors: newColors } }
    );
  };

  saveCurrentPalette = async (paletteName, projectName) => {
    const { projects } = this.state;
    const { colors } = this.state.currentPalette;
    await this.setState(
      {
        currentPalette: {
          palette: paletteName,
          project_name: projectName,
          colors: colors
        }
      }
    );
    if (projects.some(project => project.project === projectName)) {
      try {
        await postPalette(this.state.currentPalette);
        const palettes = await getPalettes();
        this.setState({palettes});
      } catch (error) {
        this.setState({ error });
      }
    } else {
      try {
        await postProject(projectName);
        await postPalette(this.state.currentPalette);
      } catch (error) {
        this.setState({ error });
      }
    }
  };

  toggleLock = position => {
    const { colors, project_name, palette } = this.state.currentPalette;
    const newColors = colors.map((color, i) => {
      if (i === position) {
        color.locked = !color.locked;
        return color;
      } else {
        return color;
      }
    });
    this.setState(
      { currentPalette: { palette, project_name, colors: newColors } }
    );
  };

  editProject = async (projectName, id) => {
    try {
      await patchProject(projectName, id);
      const projects = await getProjects();
      this.setState({ projects });
    } catch (error) {
      this.setState({ error });
    }
  };

  trashProject = async id => {
    try {
      await deleteProject(id);
      const projects = await getProjects();
      this.setState({ projects });
    } catch (error) {
      this.setState({ error });
    }
  };

  editPalette = async (palette, id) => {
    try {
      await patchPalette(palette, id);
      const palettes = await getPalettes();
      this.setState({ palettes });
    } catch (error) {
      this.setState({ error });
    }
  };

  trashPalette = async id => {
    try {
      await deletePalette(id);
      const palettes = await getPalettes();
      this.setState({ palettes });
    } catch (error) {
      this.setState({ error });
    }
  };

  selectPalette = palette => {
    const colors = [
      { hex_1: palette.hex_1 },
      { hex_2: palette.hex_2 },
      { hex_3: palette.hex_3 },
      { hex_4: palette.hex_4 },
      { hex_5: palette.hex_5 }
    ]; 
    this.setState({currentPalette: { palette: palette.palette, project_name: palette.project_name, colors}})
  }

  findPalettes = async (e, hex) => {
    e.preventDefault();
    try {
      const foundPalettes = await searchByHex(hex);
      this.setState({foundPalettes});
    } catch (error) {
      this.setState({error})
    }
  }

  clearSearch = e => {
    e.preventDefault();
    this.setState({foundPalettes: []}, () => {console.log(this.state)});
  }

  render() {
    const { currentPalette, foundPalettes } = this.state;
    let foundProjects;
    if (foundPalettes.length) {
      foundProjects = this.state.projects.filter(project => 
        foundPalettes.some(palette => palette.project_id === project.id)
      )
    }
    const palettes = foundPalettes.length ? foundPalettes : this.state.palettes;
    const projectsToShow = foundPalettes.length ? foundProjects : 
    this.state.projects;
    return (
      <main className="App">
        <h1>Color Schema</h1>
        <div className="top-wrapper">
          <div className="controls-background">
            <Controls
              projects={this.state.projects}
              saveCurrentPalette={this.saveCurrentPalette}
              getRandomHexes={this.getRandomHexes}
              findPalettes={this.findPalettes}
              clearSearch={this.clearSearch}
            />
          </div>
          <Display
            currentPalette={currentPalette}
            toggleLock={this.toggleLock}
          />
          <Preview projectName={currentPalette.project_name} paletteName={currentPalette.palette} colors={currentPalette} />
        </div>
        <Projects
          projects={projectsToShow}
          palettes={palettes}
          editProject={this.editProject}
          editPalette={this.editPalette}
          trashProject={this.trashProject}
          trashPalette={this.trashPalette}
          selectPalette={this.selectPalette}
        />
      </main>
    );
  }
}

export default App;
