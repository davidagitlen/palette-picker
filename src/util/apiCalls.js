export const getProjects = async () => {
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/projects';
  const url = process.env.REACT_APP_BACKEND_URL + '/api/v1/projects';
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

export const getPalettes = async () => {
  // const url = 'https://palette-picker-api-williams.herokuapp.com/api/v1/projects';
  // const url = 'http://localhost:3001/api/v1/palettes';
  const url = process.env.REACT_APP_BACKEND_URL + '/api/v1/palettes';
  const response = await fetch(url);
  const body = await response.json();
  return body;
}