import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import {
  getProjects,
  getPalettes,
  postPalette,
  postProject,
  patchProject,
  deleteProject,
  patchPalette,
  deletePalette,
  searchByHex
} from '../../util/apiCalls';
import {
  lockColors,
  reconstructColors
} from '../../util/dataHandlers.js';

jest.mock('../../util/apiCalls');
jest.mock('../../util/dataHandlers.js')


describe('App', () => {
  let wrapper, mockState;
  
  beforeEach(() => {
    wrapper = shallow(<App/>);
    mockState = {
      currentPalette: {
        palette: "Mock_Palette",
        project_name: "Mock_Project",
        colors: [
          { hex_1: '#ABABAB', locked: false },
          { hex_2: '#CDCDCD', locked: false },
          { hex_3: '#EFEFEF', locked: false },
          { hex_4: '#121212', locked: false },
          { hex_5: '#343434', locked: false }
        ]
      },
      projects: [
        {id: 1, project: 'Project_One'}, 
        {id: 2, project: 'Project_Two'}
      ],
      palettes: [
        {
          id: 1, 
          project_name: 'Project_One', 
          hex_1: '#565656',
          hex_2: '#787878',
          hex_3: '#909090',
          hex_4: '#A1A1A1',
          hex_5: '#B2B2B2',
          project_id: 1
        },
        {
          id: 2,
          project_name: 'Project_Two',
          hex_1: '#565656',
          hex_2: '#787878',
          hex_3: '#909090',
          hex_4: '#A1A1A1',
          hex_5: '#B2B2B2',
          project_id: 2
        }
      ],
      error: "",
      foundPalettes: []
    };
  });


  it('should match the snapshot', () => {
    wrapper.instance().setState(mockState);
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should fire getProjects', () => {
      expect(getProjects).toHaveBeenCalled();
    });

    it('should fire getPalettes', () => {
      expect(getPalettes).toHaveBeenCalled();
    });
  });

  describe('getRandomHexes', () => {
    it('should return an array of new random hex colors and set it to state', () => {
      const { colors } = wrapper.state().currentPalette;

      wrapper.instance().getRandomHexes();
      const newColors = wrapper.state().currentPalette
      expect(newColors).not.toEqual(colors);
    });
  });

  describe('saveCurrentPalette', () => {
    it('should update state with the palette and project names passed into it', async () => {
      wrapper.instance().setState(mockState);
      const { palette, project_name } = wrapper.state('currentPalette');

      expect(palette).toEqual('Mock_Palette');
      expect(project_name).toEqual('Mock_Project');

      await wrapper.instance().saveCurrentPalette('New_Palette', 'New_Name');

      const { palette: newPalette, project_name: new_Project_Name } = wrapper.state('currentPalette');

      expect(newPalette).toEqual('New_Palette');
      expect(new_Project_Name).toEqual('New_Name');
    }); 

    it('should invoke handlePalettePost if passed a value of a projectName that already exists in state', async () => {
      wrapper.instance().setState(mockState);
      wrapper.instance().handlePalettePost = jest.fn();

      await wrapper.instance().saveCurrentPalette('Test_Palette', 'Project_One');

      expect(wrapper.instance().handlePalettePost).toHaveBeenCalled();
    });

    it('should invoke both handlePalettePost and handlePaletteAndProjectPost if passed a value of a projectName that does not already exist in state', async () => {
      wrapper.instance().setState(mockState);
      wrapper.instance().handlePaletteAndProjectPost = jest.fn();

      await wrapper.instance().saveCurrentPalette('Test_Palette', 'New_Project_Name');

      expect(wrapper.instance().handlePaletteAndProjectPost).toHaveBeenCalled();
    });
  });

  describe('handlePalettePost', () => {
    it('should invoke postPalette with the currentPalette passed in', async () => {
      const { currentPalette } = wrapper.state(); 
      await wrapper.instance().handlePalettePost();

      expect(postPalette).toHaveBeenCalledWith(currentPalette);
    });
  });

  describe('handlePaletteAndProjectPost', () => {
    it('should invoke postProject with the current projectName passed in', async () => {
      const { project_name } = wrapper.state();

      await wrapper.instance().handlePaletteAndProjectPost();

      expect(postProject).toHaveBeenCalledWith(project_name);
    });

    it('should invoke postPalette with the currentPalette passed in', async () => {
      const { currentPalette } = wrapper.state();

      await wrapper.instance().handlePalettePost();

      expect(postPalette).toHaveBeenCalledWith(currentPalette);
    });
  });

  describe('toggleLock', () => {
    it('should invoke lockColors with the current colors from state and the position it is passed', () => {
      const expectedColors = [
        { hex_1: '#ABABAB', locked: false },
        { hex_2: '#CDCDCD', locked: false },
        { hex_3: '#EFEFEF', locked: false },
        { hex_4: '#121212', locked: false },
        { hex_5: '#343434', locked: false }
      ];

      wrapper.instance().setState(mockState);
      wrapper.instance().toggleLock(1);

      expect(lockColors).toHaveBeenCalledWith(expectedColors, 1);
    });

    it('should set state with result of lockColors', async () => {
      const expected = [
        { hex_1: '#ABABAB', locked: false },
        { hex_2: '#CDCDCD', locked: true },
        { hex_3: '#EFEFEF', locked: false },
        { hex_4: '#121212', locked: false },
        { hex_5: '#343434', locked: false }
      ];
      lockColors.mockImplementation(() => expected);

      wrapper.instance().setState(mockState);
      wrapper.instance().toggleLock(1);

      const { colors } = wrapper.state().currentPalette;

      expect(colors).toEqual(expected);
    });
  });

  describe('editProject', () => {
    it('should invoke patchProject with the projectName and id passed into it', async () => {
      await wrapper.instance().editProject('Test_Edit', 5);
      expect(patchProject).toHaveBeenCalledWith('Test_Edit', 5);
    });
  });

  describe('trashProject', () => {
    it('should invoke deleteProject with the id passed into it', async () => {
      await wrapper.instance().trashProject(5);
      expect(deleteProject).toHaveBeenCalledWith(5)
    });
  });

  describe('editPalette', () => {
    it('should invoke patchPalette with palette and id passed into it', async () => {
      await wrapper.instance().editPalette('Palette_One', 1);
      expect(patchPalette).toHaveBeenCalledWith('Palette_One', 1);
    });
  });

  describe('trashPalette', () => {
    it('should invoke deletePalette with the id passed into it', async () => {
      await wrapper.instance().trashPalette(1);
      expect(deletePalette).toHaveBeenCalledWith(1);
    });
  });

  describe('selectPalette', () => {
    it('should invoke reconstructColors with the palette passed to it and window.scrollTo', () => {
      window.scrollTo = jest.fn();
      const selectedPalette = {
        palette: 'Test_Palette',
        project_name: 'Test_Project',
        hex_1: '#ABABAB',
        hex_2: '#CDCDCD',
        hex_3: '#EFEFEF',
        hex_4: '#121212',
        hex_5: '#343434'
      };

      wrapper.instance().selectPalette(selectedPalette);

      expect(reconstructColors).toHaveBeenCalledWith(selectedPalette);
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  describe('findPalettes', () => {
    it('should invoke searchByHex with an event and the hex code passed into it', async () => {
      const mockEvent = {
        preventDefault: jest.fn()
      };

      await wrapper.instance().findPalettes(mockEvent, '#121212');

      expect(searchByHex).toHaveBeenCalledWith('#121212');
    });
  });

  describe('clearSearch', () => {
    it('should reset foundPalettes in state with an empty array', () => {
      const mockState = {
        currentPalette: {
          palette: "Mock_Palette",
          project_name: "Mock_Project",
          colors: [
            { hex_1: '#ABABAB', locked: false },
            { hex_2: '#CDCDCD', locked: false },
            { hex_3: '#EFEFEF', locked: false },
            { hex_4: '#121212', locked: false },
            { hex_5: '#343434', locked: false }
          ]
        },
        projects: [
          { id: 1, project: 'Project_One' },
          { id: 2, project: 'Project_Two' }
        ],
        palettes: [
          {
            id: 1,
            project_name: 'Project_One',
            hex_1: '#565656',
            hex_2: '#787878',
            hex_3: '#909090',
            hex_4: '#A1A1A1',
            hex_5: '#B2B2B2',
            project_id: 1
          },
          {
            id: 2,
            project_name: 'Project_Two',
            hex_1: '#565656',
            hex_2: '#787878',
            hex_3: '#909090',
            hex_4: '#A1A1A1',
            hex_5: '#B2B2B2',
            project_id: 2
          }
        ],
        error: "",
        foundPalettes: [{id: 1, palette: 'Test_Palette'}]
      };
      const expected = {
        currentPalette: {
          palette: "Mock_Palette",
          project_name: "Mock_Project",
          colors: [
            { hex_1: '#ABABAB', locked: false },
            { hex_2: '#CDCDCD', locked: false },
            { hex_3: '#EFEFEF', locked: false },
            { hex_4: '#121212', locked: false },
            { hex_5: '#343434', locked: false }
          ]
        },
        projects: [
          { id: 1, project: 'Project_One' },
          { id: 2, project: 'Project_Two' }
        ],
        palettes: [
          {
            id: 1,
            project_name: 'Project_One',
            hex_1: '#565656',
            hex_2: '#787878',
            hex_3: '#909090',
            hex_4: '#A1A1A1',
            hex_5: '#B2B2B2',
            project_id: 1
          },
          {
            id: 2,
            project_name: 'Project_Two',
            hex_1: '#565656',
            hex_2: '#787878',
            hex_3: '#909090',
            hex_4: '#A1A1A1',
            hex_5: '#B2B2B2',
            project_id: 2
          }
        ],
        error: "",
        foundPalettes: []
      };

      wrapper.instance().setState(mockState);
      wrapper.instance().clearSearch();
      
      expect(wrapper.state()).toEqual(expected);
    });
  });

});