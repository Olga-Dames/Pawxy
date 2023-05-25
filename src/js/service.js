import axios from 'axios';
axios.defaults.baseURL = 'https://customsearch.googleapis.com/customsearch/v1';
const API_KEY = 'AIzaSyBmI379DxyafO6scD1rbOijRvr76EHe59s';
const CX = '45755fd31e7464b38';

const fetchMovies = async query => {
  const response = await axios.get(
    `?key=${API_KEY}&cx=${CX}&q=${query}&filter=1&siteSearch={youtube.com}`
  );
  return response.data.items;
};

const fetchGoogleSearch = async query => {
  const response = await axios.get(
    `?key=${API_KEY}&cx=${CX}&q=${query}&filter=1`
  );
  return response.data.items;
};


const api = {
  fetchMovies,
  fetchGoogleSearch
};

export default api;

