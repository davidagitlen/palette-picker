import React from 'react';
import { shallow } from 'enzyme';
import Project from './Project';

it('initial test to pass CI suite', () => {
  expect(true).toEqual(true);
});

describe('Project', () => {

  let wrapper, project, palettes, mockEditProject, mockEditPalette, mockTrashProject, mockTrashPalette, mockSelectPalette;

  beforeEach(() => {
    project = { id: 1, project: 'Project_One' };
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
    mockEditProject = jest.fn();
    mockEditPalette = jest.fn();
    mockTrashProject = jest.fn();
    mockTrashPalette = jest.fn();
    mockSelectPalette = jest.fn();
    wrapper = shallow(
      <Project 
        project={project}
        palettes={palettes}
        editProject={mockEditProject}
        editPalette={mockEditPalette}
        trashProject={mockTrashProject}
        trashPalette={mockTrashPalette}
        selectPalette={mockSelectPalette}
      />
    );
  });

  it('should match the snapshot with data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke trashProject with the project id passed through when a click is detected on the trash svg', () => {

    wrapper.find('#trash').simulate('click');

    expect(mockTrashProject).toHaveBeenCalledWith(project.id);
  });

  it('should invoke editProject with the current project and project id passed through when a click is detected on the update svg', () => {

    wrapper.instance().setState({project});

    wrapper.find('#update').simulate('click');

    expect(mockEditProject).toHaveBeenCalledWith(project, project.id);
  });

  describe('handleChange', () => {
    it('should update the project property in state with the event target value', () => {
      const mockEvent = {
        target: {
          value: 'Test_Project'
        }
      };
      const firstExpected = {
        project: ''
      }
      const expected = {
        project: 'Test_Project'
      }

      expect(wrapper.state()).toEqual(firstExpected);

      wrapper.find('.project-name-input').simulate('change', mockEvent);

      expect(wrapper.state()).toEqual(expected);
    });
  });


});