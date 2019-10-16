import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  getProjects,
  getPalettes,
  postPalette,
  postProject
} from '../../util/apiCalls';

jest.mock('../../util/apiCalls');

configure({ adapter: new Adapter() });

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

});
