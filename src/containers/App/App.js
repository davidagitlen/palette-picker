import React, { Component } from 'react';
import './App.css';
import Display from '../Display/Display';
import Controls from '../Controls/Controls';
import Projects from '../Projects/Projects';
import { 
  getProjects, 
  getPalettes, 
  postPalette, 
  postProject,
  patchProject,
  patchPalette,
  deleteProject,
  deletePalette
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
      error: ""
    };
  }

  componentDidMount = async () => {
    const projects = await getProjects();
    this.setState({ projects }, () => {
      console.log(this.state);
    });
    const palettes = await getPalettes();
    this.setState({ palettes }, () => {
      console.log(this.state.currentPalette.colors);
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
      { currentPalette: { palette, project_name, colors: newColors } },
      () => {
        console.log(this.state);
      }
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
      },
      () => {
        console.log("after save", this.state);
      }
    );
    if (projects.some(project => project.project === projectName)) {
      try {
        await postPalette(this.state.currentPalette);
      } catch (error) {
        this.setState({ error });
      }
    } else {
      try {
        await postProject(projectName);
        await postPalette(this.state.currentPalette);
      } catch (error) {
        this.setState({ error }, () => {
          console.log(this.state);
        });
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
      { currentPalette: { palette, project_name, colors: newColors } },
      () => {
        console.log(this.state);
      }
    );
  };

  editProject = async (projectName, id) => {
    console.log('editProject args', projectName, id)
    try {
      await patchProject(projectName, id);
      const projects = await getProjects();
      this.setState({ projects });
    } catch (error) {
      this.setState({ error });
    }
  };

  trashProject = async id => {
    console.log('trying to trash project')
    try {
      console.log('inside the try catch')
      await deleteProject(id);
      console.log('deletion is finished')
      const projects = await getProjects();
      console.log('after fetching projects', projects)
      this.setState({ projects }, () => {console.log(this.state)});
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

  render() {
    const { currentPalette, projects, palettes } = this.state;

    return (
      <main className="App">
        <h1>Color Schema</h1>
        <div className="top-wrapper">
          <div className="controls-background">
            <Controls
              projects={projects}
              saveCurrentPalette={this.saveCurrentPalette}
              getRandomHexes={this.getRandomHexes}
            />
          </div>
          <Display
            currentPalette={currentPalette}
            toggleLock={this.toggleLock}
          />
        </div>
        <Projects
          projects={projects}
          palettes={palettes}
          editProject={this.editProject}
          editPalette={this.editPalette}
          trashProject={this.trashProject}
          trashPalette={this.trashPalette}
        />
      </main>
    );
  }
}

export default App;
