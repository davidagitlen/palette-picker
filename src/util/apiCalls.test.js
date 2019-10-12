import {
  getProjects,
  getPalettes,
  getProject,
  getPalette,
  postProject,
  postPalette,
  patchProject,
  patchPalette,
  deleteProject,
  deletePalette,
  searchByHex
} from './apiCalls';

describe('apiCalls', () => {

  describe('getProjects', () => {

    it('should call fetch with a correct URL', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      getProjects();
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/projects/"
      );
    });

    it('should return an array of project objects', () => {
      const mockResponse = [
        {
          id: 1,
          project: "Project_One"
        },
        {
          id: 2,
          project: "Project_Two"
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(getProjects()).resolves.toEqual(mockResponse);
    });

    it('should return an error if the fetch is not successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(
          Error('Error fetching Projects'));
      });
      expect(getProjects()).rejects.toEqual(Error("Error fetching Projects"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(getProjects()).rejects.toEqual(Error("There was a problem getting the projects."));
    });

  });
})