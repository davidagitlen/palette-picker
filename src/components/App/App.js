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
import {
  generateHex,
  lockColors,
  mapLockedColors,
  reconstructColors
  } from '../../util/dataHandlers';
import headerRt from '../../images/header-rt.png';
import headerLt from '../../images/header-lt.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPalette: {
        palette: "",
        project_name: "",
        colors: [
          { hex_1: generateHex(), locked: false },
          { hex_2: generateHex(), locked: false },
          { hex_3: generateHex(), locked: false },
          { hex_4: generateHex(), locked: false },
          { hex_5: generateHex(), locked: false }
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
    this.setState({ projects });
    const palettes = await getPalettes();
    this.setState({ palettes });
  };

  getRandomHexes = () => {
    const { colors, project_name, palette } = this.state.currentPalette;
    const newColors = mapLockedColors(colors);
    this.setState({ currentPalette: { palette, project_name, colors: newColors }});
  };

  saveCurrentPalette = async (paletteName, projectName) => {
    const palette = paletteName;
    const project_name = projectName;
    const { projects } = this.state;
    const { colors } = this.state.currentPalette;
    await this.setState({currentPalette: {palette, project_name, colors}});
    if (projects.some(project => project.project === projectName)) {
      this.handlePalettePost();
    } else {
      this.handlePaletteAndProjectPost(projectName);
    }
  };

  handlePalettePost = async () => {
    const { currentPalette } = this.state;
    try {
      await postPalette(currentPalette);
      const palettes = await getPalettes();
      this.setState({ palettes });
    } catch (error) {
      this.setState({ error });
    }
  }

  handlePaletteAndProjectPost = async (projectName) => {
    const { currentPalette } = this.state;
    try {
      await postProject(projectName);
      await postPalette(currentPalette);
      const projects = await getProjects();
      const palettes = await getPalettes();
      this.setState({ projects, palettes });
    } catch (error) {
      this.setState({ error });
    }
  }

  toggleLock = position => {
    const { colors, project_name, palette } = this.state.currentPalette;
    const newColors = lockColors(colors, position);
    this.setState({ currentPalette: { palette, project_name, colors: newColors } });
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

  selectPalette = selectedPalette => {
    const { palette, project_name } = selectedPalette;
    const colors = reconstructColors(selectedPalette);
    this.setState({currentPalette: { palette , project_name, colors}});
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
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

  clearSearch = () => {
    this.setState({foundPalettes: []});
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
    const projectsToShow = foundPalettes.length ? foundProjects : this.state.projects;
    return (
      <main className="App">
        <header>
          <img src={headerLt} alt="logo-left" className="header-img" />
          <h1>Color Schema</h1>
          <img src={headerRt} alt="logo-right" className="header-img" />
        </header>
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
          <Preview
            projectName={currentPalette.project_name}
            paletteName={currentPalette.palette}
            colors={currentPalette}
          />
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