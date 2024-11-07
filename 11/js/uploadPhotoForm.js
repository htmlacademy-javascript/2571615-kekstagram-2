import { isEscapeKey } from './utils';
import { initSendDataForm } from './dataSend';
import { uploadForm, pageBody, hashtagInput, commentInput, uploadFileControl, photoEditorForm, photoEditorResetBtn } from './constants';

export function resetImagePreview() {
  const imagePreview = document.querySelector('.img-upload__preview img');
  if (imagePreview) {
    imagePreview.style.filter = '';
  }
}

export const closePhotoEditor = () => {
  uploadFileControl.value = '';
  uploadForm.reset();
  resetImagePreview();
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
};

function onPhotoEditorResetBtnClick () {
  closePhotoEditor();
}

function onDocumentKeyDown (evt) {
  if(document.querySelector('.error')) {
    return;
  } // если в документе присутствует окно об ошибке отправки фотографии - не реагировать на Esc
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if ([hashtagInput, commentInput].includes(document.activeElement)) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
}

export const initUploadModal = () => {

  initSendDataForm(uploadForm);

  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
};
