import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from '/js/render-functions';
import serviceHandlerSearch from './js/pixabay-api';

const refs = {
  form: document.querySelector('.js-form'),
  input: document.querySelector('.js-input'),
  container: document.querySelector('.js-list'),
  loader: document.querySelector('.loader'),
  btnSearch: document.querySelector('.js-btnSearch'),
  btnLoad: document.querySelector('.js-btnLoad'),
};
let page;
let value;
const perPage = 15;

refs.form.addEventListener('submit', handlerSearch);
refs.btnLoad.addEventListener('click', handlerBtnLoad);

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

async function handlerSearch(evt) {
  evt.preventDefault();
  page = 1;
  value = evt.target.elements.search.value;

  if (!value.trim()) {
    return iziToast.error({
      message: 'Please fill in the field!',
      position: 'topRight',
    });
  }
  refs.loader.classList.add('displayOn');

  displayOffAdd();

  refs.container.innerHTML = '';

  try {
    const response = await serviceHandlerSearch(value, page, perPage);

    if (response.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    refs.container.innerHTML = createMarkup(response.hits);

    lightbox.refresh();
    displayOffDelete();
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.remove('displayOn');
  }

  evt.target.reset();
}

async function handlerBtnLoad() {
  page += 1;

  try {
    const response = await serviceHandlerSearch(value, page, perPage);

    refs.container.insertAdjacentHTML('beforeend', createMarkup(response.hits));

    handlerScroll();

    lightbox.refresh();

    if (page * perPage >= response.totalHits) {
      displayOffAdd();
      console.log(5);

      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.remove('displayOn');
  }
}

function displayOffAdd() {
  refs.btnLoad.classList.add('displayOff');
}

function displayOffDelete() {
  refs.btnLoad.classList.remove('displayOff');
}

function handlerScroll() {
  const domRect = refs.container.getBoundingClientRect();
  window.scrollBy({
    top: domRect.height * 2,
    left: domRect.left,
    behavior: 'smooth',
  });
}
