const renderPicturesFromTemplate = (pictures) => {

  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.querySelectorAll('.picture').forEach(
    (picture) => {
      picture.remove();
    }
  );

  const fragment = document.createDocumentFragment();

  const template = document.getElementById('picture').content.querySelector('.picture');

  pictures.forEach((picture) => {

    const { url, description, likes, comments } = picture;

    const pictureElement = template.cloneNode(true);

    pictureElement.dataset.state = JSON.stringify(picture);

    const img = pictureElement.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    const commentsSpan = pictureElement.querySelector('.picture__comments');
    commentsSpan.textContent = comments.length;

    const likesSpan = pictureElement.querySelector('.picture__likes');
    likesSpan.textContent = likes;

    fragment.appendChild(pictureElement);
  });


  picturesContainer.appendChild(fragment);
};


export default renderPicturesFromTemplate;
