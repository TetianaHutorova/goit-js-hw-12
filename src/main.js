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
};

refs.form.addEventListener('submit', handlerSearch);

const URL = 'https://pixabay.com/api/';

const parametrs = {
  key: '47002801-76ba89481123b51ee1293cd3a',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

function handlerSearch(evt) {
  evt.preventDefault();
  const value = evt.target.elements.search.value;
  if (!value.trim()) {
    return iziToast.error({
      message: 'Please fill in the field!',
      position: 'topRight',
    });
  }
  refs.container.innerHTML = '';

  refs.loader.classList.add('displayOn');

  serviceHandlerSearch(URL, value, parametrs)
    .then(resolve => {
      if (resolve.hits.length === 0) {
        throw new Error();
      }

      refs.container.innerHTML = createMarkup(resolve.hits);
      lightbox.refresh();
    })
    .catch(_ =>
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      })
    )
    .finally(_ => refs.loader.classList.remove('displayOn'));

  evt.target.reset();
}
