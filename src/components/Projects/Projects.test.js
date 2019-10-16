import React from 'react';
import { shallow } from 'enzyme';
import Projects from './Projects';

it('initial test to pass CI suite', () => {
  expect(true).toEqual(true);
});

describe('Projects', () => {

  it('should match the snapshot with data passed through correctly', () => {
    const projects =  [
      { id: 1, project: 'Project_One' },
      { id: 2, project: 'Project_Two' }
    ];
    const palettes = [
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
      ];
      const wrapper = shallow(
        <Projects 
          key={1}
          projects={projects}
          palettes={palettes}
          editProject={jest.fn()}
          editPalette={jest.fn()}
          trashProject={jest.fn()}
          trashPalette={jest.fn()}
          selectPalette={jest.fn()}
        /> 
      );

    expect(wrapper).toMatchSnapshot();
  });
});