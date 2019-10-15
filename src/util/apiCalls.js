import { constructDetails, cleanResults } from './dataHandlers';

export const getProjects = async () => {
  const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/projects/";
  const response = await fetch(url);
    if (!response.ok) {
      throw new Error ('There was a problem getting the projects.')
    }
  const body = await response.json();
  const cleanBody = cleanResults(body);
  return cleanBody;
};

export const getPalettes = async () => {
  const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There was a problem getting the palettes.");
  }
  const body = await response.json();
  const cleanBody = cleanResults(body);
  return cleanBody;
};

export const getProject = async id => {
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There was a problem getting the project.");
  }
  const body = await response.json();
  return body;
};

export const getPalette = async id => {
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
    body: JSON.stringify({project: name}),
    headers: {
      'Content-Type': 'Application/json'
    }
  };
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem posting the project.");
  }
  const body = await response.json();
  return body;
};

export const postPalette = async currentPalette => {
  const details = constructDetails(currentPalette);
  const options = {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "Application/json"
    }
  };
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
    body: JSON.stringify({project: name}),
    headers: {
      "Content-Type": "Application/JSON"
    }
  };
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem patching the project.");
  }
  const body = await response.json();
  return body;
};

export const patchPalette = async (currentPalette, id) => {
  const details = constructDetails(currentPalette);
  const options = {
    method: "PATCH",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "Application/JSON"
    }
  };
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
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/projects/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem deleting the project.");
  }
};

export const deletePalette = async id => {
  const options = {
    method: "DELETE"
  };
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/${id}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("There was a problem deleting the palette.");
  }
};

export const searchByHex = async hex => {
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes?hex=${hex}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("There was a problem searching for palettes.");
  }
  const body = await response.json();
  const cleanBody = cleanResults(body)
  return cleanBody;
};