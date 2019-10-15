import React from 'react';
import { shallow } from 'enzyme';
import Preview from './Preview';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
});