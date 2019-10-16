import React from 'react';
import { shallow } from 'enzyme';
import Preview from './Preview';

describe('Preview', () => {
  it('should match the snapshot with all data passed in correctly', () => {
    const wrapper = shallow(
    <Preview 
      paletteName='TestPalette'
      projectName='TestProject'
      colors={{ colors: [
        { hex_1: '#ABABAB' },
        { hex_2: '#ABABAB' },
        { hex_3: '#ABABAB' },
        { hex_4: '#ABABAB' },
        { hex_5: '#ABABAB' }
      ]
      }}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if there are no default project or palette names passed in', () => {
    const wrapper = shallow(
      <Preview
        paletteName=''
        projectName=''
        colors={{
          colors: [
            { hex_1: '#ABABAB' },
            { hex_2: '#ABABAB' },
            { hex_3: '#ABABAB' },
            { hex_4: '#ABABAB' },
            { hex_5: '#ABABAB' }
          ]
        }}
      />);
    expect(wrapper).toMatchSnapshot();
  })
});