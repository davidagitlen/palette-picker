import React from 'react';
import { shallow } from 'enzyme';
import Palettes from './Palettes';

describe('Palettes', () => {

  let wrapper, palettes;

  beforeEach(() => {
    palettes = [
      {
      hex_1: "#3192EC",
      hex_2: "#77B8AB",
      hex_3: "#910E31",
      hex_4: "#D8C86A",
      hex_5: "#6E16C2",
      id: 34,
      palette: "one",
      project_id: 1,
      project_name: "Blah blah"
      },
      {
      hex_1: "#3192EC",
      hex_2: "#77B8AB",
      hex_3: "#910E31",
      hex_4: "#D8C86A",
      hex_5: "#6E16C2",
      id: 34,
      palette: "two",
      project_id: 2,
      project_name: "Blib blob"
      }
    ];
    wrapper = shallow(
      <Palettes 
        palettes={palettes}
        editPalette={jest.fn()}
        trashPalette={jest.fn()}
        selectPalette={jest.fn()}
      />
      );
  }); 

  it('should match the snapshot with data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });  
});