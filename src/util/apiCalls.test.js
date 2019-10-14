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
} from "./apiCalls";

describe("apiCalls", () => {
  describe("getProjects", () => {
    it("should call fetch with a correct URL", () => {
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

    it("should return an array of project objects", () => {
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

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error fetching Projects"));
      });
      expect(getProjects()).rejects.toEqual(Error("Error fetching Projects"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(getProjects()).rejects.toEqual(
        Error("There was a problem getting the projects.")
      );
    });
  });

  describe("getPalettes", () => {
    it("should call fetch with a correct URL", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      getPalettes();
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/"
      );
    });

    it("should return an array of palette objects", () => {
      const mockResponse = [
        {
          id: 1,
          palette: "Palette",
          hex_1: "#efefef",
          hex_2: "#efefef",
          hex_3: "#efefef",
          hex_4: "#efefef",
          hex_5: "#efefef",
          project_name: "Project_One"
        },
        {
          id: 2,
          palette: "Palette",
          hex_1: "#efefef",
          hex_2: "#efefef",
          hex_3: "#efefef",
          hex_4: "#efefef",
          hex_5: "#efefef",
          project_name: "Project_Two"
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(getPalettes()).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error fetching Palettes"));
      });
      expect(getPalettes()).rejects.toEqual(Error("Error fetching Palettes"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(getPalettes()).rejects.toEqual(
        Error("There was a problem getting the palettes.")
      );
    });
  });

  describe("getProjects/:id", () => {
    it("should call fetch with a correct URL", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      getProject(1);
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/projects/1"
      );
    });

    it("should return a project object", () => {
      const mockResponse = [
        {
          id: 1,
          project: "Project_One"
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(getProject()).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error fetching Project"));
      });
      expect(getProject()).rejects.toEqual(Error("Error fetching Project"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(getProject()).rejects.toEqual(
        Error("There was a problem getting the project.")
      );
    });
  });

  describe("getPalette/:id", () => {
    it("should call fetch with a correct URL", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      getPalette(1);
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/1"
      );
    });

    it("should return a palette object", () => {
      const mockResponse = [
        {
          id: 1,
          palette: "Palette",
          hex_1: "#efefef",
          hex_2: "#efefef",
          hex_3: "#efefef",
          hex_4: "#efefef",
          hex_5: "#efefef",
          project_name: "Project_One"
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(getPalette()).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error fetching Palette"));
      });
      expect(getPalette()).rejects.toEqual(Error("Error fetching Palette"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(getPalette()).rejects.toEqual(
        Error("There was a problem getting the palette.")
      );
    });
  });

  describe("postProject", () => {
    it("should call fetch with a correct URL", () => {
      const mockProject = {
        project: "Project"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      postProject(mockProject);
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/projects/",
        {
          body: '{"project":{"project":"Project"}}',
          headers: { "Content-Type": "Application/json" },
          method: "POST"
        }
      );
    });

    it("should return a project id", () => {
      const mockProject = {
        project: "Project"
      };
      const mockResponse = [
        {
          id: 1
        }
      ];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(postProject(mockProject)).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error posting Project"));
      });
      expect(postProject()).rejects.toEqual(Error("Error posting Project"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(postProject()).rejects.toEqual(
        Error("There was a problem posting the project.")
      );
    });
  });

  describe("postPalette", () => {
    it("should call fetch with a correct URL", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      postPalette(mockPalette);
      const result =
        '{"project_name":"Project_One","palette":"Palette","hex_1":"#efefef","hex_2":"#efefef","hex_3":"#efefef","hex_4":"#efefef","hex_5":"#efefef"}'
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/",
        {
          body: result,
          headers: { "Content-Type": "Application/json" },
          method: "POST"
        }
      );
    });

    it("should return a palette id", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      const mockResponse = { id: 1 };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(postPalette(mockPalette)).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error posting Palette"));
      });
      expect(postPalette(mockPalette)).rejects.toEqual(Error("Error posting Palette"));
    });

    it("should return an error if the response is not ok", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(postPalette(mockPalette)).rejects.toEqual(
        Error("There was a problem posting the palette.")
      );
    });
  });

  describe("patchProject", () => {
    it("should call fetch with a correct URL", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      patchProject("Project", 1);
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/projects/1",
        {
          body: "{\"project\":\"Project\"}",
          headers: { "Content-Type": "Application/JSON" },
          method: "PATCH"
        }
      );
    });

    it("should return a project id", () => {
      const mockResponse = "Project with id 1 has been successfully updated";

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(patchProject("Project", 1)).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error patching Project"));
      });
      expect(patchProject()).rejects.toEqual(Error("Error patching Project"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(patchProject()).rejects.toEqual(
        Error("There was a problem patching the project.")
      );
    });
  });

  describe("patchPalette", () => {
    it("should call fetch with a correct URL", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      patchPalette(mockPalette, 1);
      const result =
        '{"project_name":"Project_One","palette":"Palette","hex_1":"#efefef","hex_2":"#efefef","hex_3":"#efefef","hex_4":"#efefef","hex_5":"#efefef"}';
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/1",
        {
          body: result,
          headers: { "Content-Type": "Application/JSON" },
          method: "PATCH"
        }
      );
    });

    it("should return a palette id", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      const mockResponse = "Palette with id 1 has been successfully updated";

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(patchPalette(mockPalette, 1)).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error patching Palette"));
      });
      expect(patchPalette(mockPalette)).rejects.toEqual(Error("Error patching Palette"));
    });

    it("should return an error if the response is not ok", () => {
      const mockPalette = {
        id: 1,
        palette: "Palette",
        colors: [
          { hex_1: "#efefef" },
          { hex_2: "#efefef" },
          { hex_3: "#efefef" },
          { hex_4: "#efefef" },
          { hex_5: "#efefef" }
        ],
        project_name: "Project_One"
      };
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(patchPalette(mockPalette)).rejects.toEqual(
        Error("There was a problem patching the palette.")
      );
    });
  });

  describe("deleteProject", () => {
    it("should call fetch with a correct URL", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      deleteProject(1);
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/projects/1",
        {
          method: "DELETE"
        }
      );
    });

    it("should return a 204 status code when successful", () => {
      const mockResponse = 
        {
          status: 204
        }

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(deleteProject(1)).resolves.toEqual({status: 204});
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error deleting Project"));
      });
      expect(deleteProject(1)).rejects.toEqual(Error("Error deleting Project"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(deleteProject(1)).rejects.toEqual(
        Error("There was a problem deleting the project.")
      );
    });
  });

  describe("deletePalette", () => {
    it("should call fetch with a correct URL", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      deletePalette(1);
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/1",
        {
          method: "DELETE"
        }
      );
    });

    it("should return a 204 status code when successful", () => {
      const mockResponse = {
        status: 204
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(deletePalette(1)).resolves.toEqual({ status: 204 });
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("Error deleting Palette"));
      });
      expect(deletePalette(1)).rejects.toEqual(Error("Error deleting Palette"));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(deletePalette(1)).rejects.toEqual(
        Error("There was a problem deleting the palette.")
      );
    });
  });

  describe("searchByHex", () => {
    it("should call fetch with a correct URL", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      searchByHex("efefef");
      expect(window.fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes?hex=efefef"
      );
    });

    it("should return an array of matching palette objects", () => {
      const mockResponse = [{
        id: 1,
        palette: "Palette",
        hex_1: "#efefef",
        hex_2: "#efefef",
        hex_3: "#efefef",
        hex_4: "#efefef",
        hex_5: "#efefef", 
        project_name: "Project_One"
      }];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
      expect(searchByHex("efefef")).resolves.toEqual(mockResponse);
    });

    it("should return an error if the fetch is not successful", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("There was a problem searching for palettes."));
      });
      expect(searchByHex("efefef")).rejects.toEqual(Error("There was a problem searching for palettes."));
    });

    it("should return an error if the response is not ok", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      expect(searchByHex("efefef")).rejects.toEqual(
        Error("There was a problem searching for palettes.")
      );
    });
  });
});
