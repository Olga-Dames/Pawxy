import api from './service';
import insertVideoMarkup from './videoMarkup';

const searchBtn = document.querySelector('.google__button');
const query = document.querySelector('.query');
const movieContainer = document.querySelector('.movies__container');

searchBtn.addEventListener('click', searchOnClick);

async function searchOnClick(e) {
  e.preventDefault();
  try {
    const videos = await api.fetchGoogleSearch(query.textContent);
    movieContainer.innerHTML = ''
    insertVideoMarkup(videos, movieContainer)
  } catch (error) {
    console.log(error.message);
  }
}
