import { picturesContainer, bigPictureContainer, bigPicture, likesCounter, socialCommentTotalCounter, socialCommentShownCounter, commentsContainer, bigPictureDescription, cancelButton, commentsLoaderButton, MAX_COMMENTS_COUNT_TO_ADD } from './constants';
import { isEscapeKey } from './utils';
import { escActionsController, openedWindowsController } from './esc-actions-controller';

export default function openAndCloseBigPicture() {

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
    commentsLoaderButton.classList.toggle('hidden', commentsShownCount === commentsTotalCount);
  };

  const updateAndOpenBigPicture = (pictureData) => {
    bigPicture.src = pictureData.url;
    likesCounter.textContent = pictureData.likes;
    commentsTotalCount = pictureData.comments.length;
    socialCommentTotalCounter.textContent = commentsTotalCount;

    commentsShownCount = Math.min(commentsTotalCount, MAX_COMMENTS_COUNT_TO_ADD);
    socialCommentShownCounter.textContent = commentsShownCount;
    commentsContainer.innerHTML = renderComments(pictureData.comments, commentsShownCount);
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
    commentsContainer.innerHTML = renderComments(stateOfBigPicture.comments, commentsShownCount);
    socialCommentShownCounter.textContent = commentsShownCount;
    updateCommentsLoaderVisibility();
  };

  picturesContainer.addEventListener('click', onPictureClick);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onKeyDown);
  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
}
