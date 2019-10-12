export const getProjects = async () => {
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/projects';
  const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/projects/";
  const response = await fetch(url);
    if (!response.ok) {
      throw new Error ('There was a problem getting the projects.')
    }
  const body = await response.json();
  return body;
};

export const getPalettes = async () => {
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There was a problem getting the palettes.");
  }
  const body = await response.json();
  return body;
};

export const getProject = async id => {
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There was a problem getting the project.");
  }
  const body = await response.json();
  return body;
};

export const getPalette = async id => {
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There was a problem getting the palette.");
  }
  const body = await response.json();
  return body;
};

export const postProject = async name => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ project: name}),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem posting the project.");
  }
  const body = await response.json();
  return body;
};

export const postPalette = async currentPalette => {
  const details = {
    project_name: currentPalette.project_name,
    palette: currentPalette.palette,
    hex_1: currentPalette.colors[0].hex_1,
    hex_2: currentPalette.colors[1].hex_2,
    hex_3: currentPalette.colors[2].hex_3,
    hex_4: currentPalette.colors[3].hex_4,
    hex_5: currentPalette.colors[4].hex_5
  };
  const options = {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "Application/JSON"
    }
  };
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem posting the palette.");
  }
  const body = await response.json();
  return body;
};

export const patchProject = async (name, id) => {
  const options = {
    method: "PATCH",
    body: name,
    headers: {
      "Content-Type": "Application/JSON"
    }
  };
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem patching the project.");
  }
  const body = await response.json();
  return body;
};

export const patchPalette = async (currentPalette, id) => {
  const details = {
    project_name: currentPalette.project_name,
    palette: currentPalette.palette,
    hex_1: currentPalette.colors[0].hex_1,
    hex_2: currentPalette.colors[1].hex_2,
    hex_3: currentPalette.colors[2].hex_3,
    hex_4: currentPalette.colors[3].hex_4,
    hex_5: currentPalette.colors[4].hex_5
  };

  const options = {
    method: "PATCH",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "Application/JSON"
    }
  };
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem patching the palette.");
  }
  const body = await response.json();
  return body;
};

export const deleteProject = async id => {
  const options = {
    method: "DELETE"
  };
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem deleting the project.");
  }
  const body = await response.json();
  return body;
};

export const deletePalette = async id => {
  const options = {
    method: "DELETE"
  };
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem deleting the palette.");
  }
  const body = await response.json();
  return body;
};

export const searchByHex = async hex => {
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes?hex=${hex}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There was a problem searching for palettes.");
  }
  const body = await response.json();
  return body;
};