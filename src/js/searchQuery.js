import api from './service';
import insertVideoMarkup from './videoMarkup';
import { Notify } from 'notiflix';
import { capitalizeWords } from './capitalize';

const movieContainer = document.querySelector('.movies__container');
const form = document.querySelector('.searchForm');
const searchBtn = document.querySelector('.query')

form.addEventListener(`submit`, onSearch);

function onSearch(e) {
  e.preventDefault();
  query = e.currentTarget.elements[0].value.trim();
  const capitalizedQuery = capitalizeWords(query)
  
  if (query === '') {
    return Notify.info(`The input field cannot be empty!`);
  }
  fetch(query);
  searchBtn.textContent = ` ${capitalizedQuery}`
}
async function fetch(query) {
  try {
    const videos = await api.fetchMovies(query);
    insertVideoMarkup(videos, movieContainer);
    // form.reset();
  } catch (error) {
    console.log(error.message);
  }
}
