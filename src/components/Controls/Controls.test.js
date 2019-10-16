import React from 'react';
import { shallow } from 'enzyme';
import Controls from './Controls';

  describe('Controls', () => {
    let wrapper, testProjects, mockSaveCurrentPalette, mockGetRandomHexes, mockFindPalettes, mockClearSearch;

    beforeEach(() => {
      mockSaveCurrentPalette = jest.fn();
      mockGetRandomHexes = jest.fn();
      mockFindPalettes = jest.fn();
      mockClearSearch = jest.fn();
      testProjects = [
        { id: 1, project: 'Project_One' },
        { id: 2, project: 'Project_Two' },
        { id: 3, project: 'Project_Three' },
        { id: 4, project: 'Project_Four' },
        { id: 5, project: 'Project_Five' }
      ];
      wrapper = shallow(
        <Controls
          projects={testProjects}
          saveCurrentPalette={mockSaveCurrentPalette}
          getRandomHexes={mockGetRandomHexes}
          findPalettes={mockFindPalettes}
          clearSearch={mockClearSearch}
        />);
    });

    it('should match the snapshot with data passed through correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should invoke findPalettes with an event and the current hex passed in as arguments when a click is detected on the search button', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }

      wrapper.instance().setState({hex: '#121212'});

      wrapper.find('.search-button').simulate('click', mockEvent);

      expect(mockFindPalettes).toHaveBeenCalledWith(mockEvent, '#121212');

    });

    describe('handleChange', () => {
      it('should update the property in state of the event target name with the event target value', () => {
        const mockEvent = {
          target: {
            name: 'palette',
            value: 'Test_Palette'
          }
        };
        const firstExpected = {
          palette: '',
          project: '',
          hex: '',
          projects: testProjects
        };
        const expected = {
          palette: 'Test_Palette',
          project: '',
          hex: '',
          projects: testProjects
        }

        expect(wrapper.state()).toEqual(firstExpected);

        wrapper.find('.palette-name-input').simulate('change', mockEvent);

        expect(wrapper.state()).toEqual(expected)
      });
    });

    describe('handleRandomize', () => {
      it('should invoke getRandomHexes on click', () => {
        const mockEvent = {
          preventDefault: jest.fn()
        };

        wrapper.find('.random-hex-button').simulate('click', mockEvent);

        expect(mockGetRandomHexes).toHaveBeenCalled();
      });
    });

    describe('handleSave', () => {
      it('should invoke saveCurrentPalette with the current palette and project passed in', () => {
        const mockEvent = {
          preventDefault: jest.fn()
        };
        const { palette, project } = wrapper.state();
        wrapper.find('.save-button').simulate('click', mockEvent);

        expect(mockSaveCurrentPalette).toHaveBeenCalledWith(palette, project);
      });
    });

    describe('handleClearForm', () => {
      it('should invoke clearSearch', () => {
        const mockEvent = {
          preventDefault: jest.fn()
        };

        wrapper.find('.clear-button').simulate('click', mockEvent);

        expect(mockClearSearch).toHaveBeenCalled();
      });

      it('should reset state after calling clearSearch', () => {
        const mockEvent = {
          preventDefault: jest.fn()
        };

        wrapper.instance().setState({hex: '#121212'});

        expect(wrapper.state('hex')).toEqual('#121212');

        wrapper.find('.clear-button').simulate('click', mockEvent); 

        expect(wrapper.state('hex')).toEqual('');
      });
    });

  });
