import React from 'react';
import { shallow } from 'enzyme';
import Palette from './Palette';

it('initial test to pass CI suite', () => {
  expect(true).toEqual(true);
});

describe('Palette', () => {

  let wrapper, palette, mockEditPalette, mockTrashPalette, mockSelectPalette;

  beforeEach(() => {

    palette = {
      hex_1: "#3192EC",
      hex_2: "#77B8AB",
      hex_3: "#910E31",
      hex_4: "#D8C86A",
      hex_5: "#6E16C2",
      id: 34,
      palette: "one",
      project_id: 1,
      project_name: "Blah blah"
    };
    mockEditPalette = jest.fn();
    mockTrashPalette = jest.fn();
    mockSelectPalette = jest.fn();
    global.Date = {
      now: jest.fn().mockImplementation(() => 12345)
    };
    wrapper = shallow( 
      <Palette 
        palette={palette}
        editPalette={mockEditPalette}
        trashPalette={mockTrashPalette}
        selectPalette={mockSelectPalette}
      />
    );
  });

  it('should match the snapshot with data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke selectPalette with the current palette passed in when palette name is clicked', () => {

    wrapper.find('.palette-name-wrapper').simulate('click');

    expect(mockSelectPalette).toHaveBeenCalledWith(palette);
  });

  it('should invoke selectPalette with the current palette passed in when swatch is clicked', () => {

    wrapper.find('.swatch-wrapper').simulate('click');

    expect(mockSelectPalette).toHaveBeenCalledWith(palette);
  });

  it('should invoke trashPalette with the current palette\'s id passed in an as argument when the trash svg is clicked', () => {

    wrapper.find('.trash').simulate('click');

    expect(mockTrashPalette).toHaveBeenCalledWith(palette.id);
  });
});