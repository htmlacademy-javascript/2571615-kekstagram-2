import { isEscapeKey } from './utils';

export const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
export const hashtagInput = uploadForm.querySelector('.text__hashtags');
export const commentInput = uploadForm.querySelector('.text__description');

const closePhotoEditor = () => {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);

  uploadFileControl.value = '';
};

function onPhotoEditorResetBtnClick () {
  closePhotoEditor();
};

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if ([hashtagInput, commentInput].includes(document.activeElement)) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

// Initialize the upload modal
export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    // Attach event listeners for reset button and keydown
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
};
