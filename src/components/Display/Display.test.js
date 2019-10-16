import React from 'react';
import { shallow } from 'enzyme';
import Display from './Display';

it('initial test to pass CI suite', () => {
  expect(true).toEqual(true);
});

describe('Display', () => {

  let wrapper, currentPaletteOne, currentPaletteTwo, mockToggleLock;

  beforeEach(() => {
    currentPaletteOne = {
      palette: "Mock_Palette",
        project_name: "Mock_Project",
          colors: [
            { hex_1: '#ABABAB', locked: false },
            { hex_2: '#CDCDCD', locked: false },
            { hex_3: '#EFEFEF', locked: false },
            { hex_4: '#121212', locked: false },
            { hex_5: '#343434', locked: false }
          ]
    };
    currentPaletteTwo = {
      palette: "Mock_Palette",
        project_name: "Mock_Project",
          colors: [
            { hex_1: '#565656', locked: true },
            { hex_2: '#787878', locked: false },
            { hex_3: '#909090', locked: true },
            { hex_4: '#ABABAB', locked: false },
            { hex_5: '#CDCDCD', locked: true }
          ]
    };
    mockToggleLock = jest.fn();
    global.Date = {
      now: jest.fn().mockImplementation(() => 12345)
    };
    wrapper = shallow(
      <Display
        currentPalette={currentPaletteOne}
        toggleLock={mockToggleLock}
      />);
  });

  it('should match the snapshot with data passed in', () => {
    const wrapper = shallow(
      <Display
        currentPalette={currentPaletteOne}
        toggleLock={mockToggleLock}
      />); 

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if a palette with locked hexes is passed in', () => {
    const wrapper = shallow(
      <Display
        currentPalette={currentPaletteTwo}
        toggleLock={mockToggleLock}
      />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('lock-image input', () => {
    it('should fire toggleLock on click with the index passed through as an argument', () =>{

      wrapper.find('.lock-image').first().simulate('click');

      expect(mockToggleLock).toHaveBeenCalledWith(0);
    });
  });
});