export default function openAndCloseBigPicture() {
  const elements = {
    picturesContainer: document.querySelector('.pictures'),
    bigPictureContainer: document.querySelector('.big-picture'),
    bigPicture: document.querySelector('.big-picture__img img'),
    likesCounter: document.querySelector('.likes-count'),
    socialCommentTotalCounter: document.querySelector('.social__comment-total-count'),
    socialCommentShownCounter: document.querySelector('.social__comment-shown-count'),
    commentsContainer: document.querySelector('.social__comments'),
    bigPictureDescription: document.querySelector('.social__caption'),
    cancelButton: document.querySelector('#picture-cancel'),
    commentsLoaderButton: document.querySelector('.social__comments-loader.comments-loader'),
  };

  let stateOfBigPicture = null;
  let commentsTotalCount = 0;
  let commentsShownCount = 0;

  const renderComments = (comments, count) =>
    comments.slice(0, count).map(({ avatar, message, name }) => `
      <li class="social__comment">
        <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
        <p class="social__text">${message}</p>
      </li>
    `).join('');

  const updateCommentsLoaderVisibility = () => {
    elements.commentsLoaderButton.classList.toggle('hidden', commentsShownCount === commentsTotalCount);
  };

  const updateAndOpenBigPicture = (pictureData) => {
    elements.bigPicture.src = pictureData.url;
    elements.likesCounter.textContent = pictureData.likes;
    commentsTotalCount = pictureData.comments.length;
    elements.socialCommentTotalCounter.textContent = commentsTotalCount;

    commentsShownCount = Math.min(commentsTotalCount, 5);
    elements.socialCommentShownCounter.textContent = commentsShownCount;
    elements.commentsContainer.innerHTML = renderComments(pictureData.comments, commentsShownCount);
    updateCommentsLoaderVisibility();

    elements.bigPictureDescription.textContent = pictureData.description;
    elements.bigPictureContainer.classList.remove('hidden');
    elements.bigPictureContainer.dataset.isOpen = 'true';
    document.body.classList.add('modal-open');
  };

  const closeBigPicture = () => {
    elements.bigPictureContainer.classList.add('hidden');
    elements.bigPictureContainer.dataset.isOpen = 'false';
    document.body.classList.remove('modal-open');
  };

  const onPictureClick = (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      stateOfBigPicture = JSON.parse(picture.dataset.state);
      updateAndOpenBigPicture(stateOfBigPicture);
    }
  };

  const onCancelButtonClick = (evt) => {
    evt.preventDefault();
    closeBigPicture();
  };

  const onKeyDown = (evt) => {
    if (elements.bigPictureContainer.dataset.isOpen === 'true' && evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  const onCommentsLoaderClick = () => {
    const remainingComments = commentsTotalCount - commentsShownCount;
    commentsShownCount += Math.min(remainingComments, 5);
    elements.commentsContainer.innerHTML = renderComments(stateOfBigPicture.comments, commentsShownCount);
    elements.socialCommentShownCounter.textContent = commentsShownCount;
    updateCommentsLoaderVisibility();
  };

  elements.picturesContainer.addEventListener('click', onPictureClick);
  elements.cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onKeyDown);
  elements.commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
}
