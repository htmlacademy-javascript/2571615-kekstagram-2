import { picturesContainer, bigPictureContainer, bigPicture, likesCounter, socialCommentTotalCounter, socialCommentShownCounter, commentsContainer, bigPictureDescription, cancelButton, commentsLoaderButton, MAX_COMMENTS_COUNT_TO_ADD } from './constants';
import { isEscapeKey } from './utils';
import { escActionsController, openedWindowsController } from './esc-actions-controller';

export const openAndCloseBigPicture = () => {

  let stateOfBigPicture = null;
  let commentsTotalCount = 0;
  let commentsShownCount = 0;

  const renderComments = (comments, count) => {

    const fragment = document.createDocumentFragment();

    comments.slice(0, count).forEach(({ avatar, message, name }) => {
      const listItem = document.createElement('li');
      listItem.classList.add('social__comment');
      const img = document.createElement('img');
      img.classList.add('social__picture');
      img.src = avatar;
      img.alt = name;
      img.width = 35;
      img.height = 35;
      const paragraph = document.createElement('p');
      paragraph.classList.add('social__text');
      paragraph.textContent = message;
      listItem.appendChild(img);
      listItem.appendChild(paragraph);
      fragment.appendChild(listItem);
    });

    return fragment;
  };


  const updateCommentsLoaderVisibility = () => {
    commentsLoaderButton.classList.toggle('hidden', commentsShownCount === commentsTotalCount);
  };

  const updateAndOpenBigPicture = (pictureData) => {
    bigPicture.src = pictureData.url;
    likesCounter.textContent = pictureData.likes;
    commentsTotalCount = pictureData.comments.length;
    socialCommentTotalCounter.textContent = commentsTotalCount;

    commentsShownCount = Math.min(commentsTotalCount, MAX_COMMENTS_COUNT_TO_ADD);
    socialCommentShownCounter.textContent = commentsShownCount;
    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(renderComments(pictureData.comments, commentsShownCount));
    updateCommentsLoaderVisibility();
    bigPictureDescription.textContent = pictureData.description;
    bigPictureContainer.classList.remove('hidden');
    openedWindowsController.pushWindowToState(bigPictureContainer);
    document.body.classList.add('modal-open');
  };

  const closeBigPicture = () => {
    bigPictureContainer.classList.add('hidden');
    openedWindowsController.removeWindowFromState(bigPictureContainer);
    bigPictureContainer.dataset.isOpen = 'false';
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
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      escActionsController.closeWindow(closeBigPicture, bigPictureContainer);
    }
  };

  const onCommentsLoaderClick = () => {
    const remainingComments = commentsTotalCount - commentsShownCount;
    commentsShownCount += Math.min(remainingComments, MAX_COMMENTS_COUNT_TO_ADD);
    commentsContainer.innerHTML = '';
    commentsContainer.appendChild(renderComments(stateOfBigPicture.comments, commentsShownCount));
    socialCommentShownCounter.textContent = commentsShownCount;
    updateCommentsLoaderVisibility();
  };

  picturesContainer.addEventListener('click', onPictureClick);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onKeyDown);
  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
};
