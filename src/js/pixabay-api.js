import axios from 'axios';

const URL = 'https://pixabay.com/api/';

const parametrs = {
  key: '47002801-76ba89481123b51ee1293cd3a',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
 };

export default async function serviceHandlerSearch(value, page, perPage) {
  try {
    const params = new URLSearchParams({
      ...parametrs,
      q: value,
      page,
      per_page: perPage,
    });

    const response = await axios(`${URL}?${params}`);

    return response.data;
  } catch (error) {
    return error;
  }
}
