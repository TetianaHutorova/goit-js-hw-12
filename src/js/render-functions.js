export default function createMarkup(arr = []) {
  const defaultValues = {
    webformatURL:
      'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png',
    tags: '',
    largeImageURL:
      'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png',
    likes: 0,
    views: 0,
    comments: 0,
    downloads: 0,
  };
  return arr
    .map(
      ({
        webformatURL,
        tags,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      } = defaultValues) => `<li class="js-item item"><a  href='${largeImageURL}'>
  <img src="${webformatURL}" alt="${tags}" data-largeImageURL="${largeImageURL}" ></a>
  <ul class="descriptions">
    <li class="description" >Likes <span class="span">${likes}</span></li>
    <li class="description">Views <span class="span">${views}</span></li>
    <li class="description">Comments <span class="span">${comments}</span></li>
    <li class="description">Downloads <span class="span">${downloads}</span></li>
  </ul>
</li>`
    )
    .join('');
}
