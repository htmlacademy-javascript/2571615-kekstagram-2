import { isEscapeKey } from './utils';
import { initSendDataForm } from './data-send';
import { uploadForm, pageBody, hashtagInput, commentInput, uploadFileControl, photoEditorForm, photoEditorResetBtn, userImage, effectsPreviews } from './constants';
import { escActionsController, openedWindowsController } from './esc-actions-controller';

export function resetImagePreview() {
  if (userImage) {
    userImage.style.filter = '';
  }
}

export const closePhotoEditor = () => {
  uploadFileControl.value = '';
  uploadForm.reset();
  resetImagePreview();
  photoEditorForm.classList.add('hidden');
  openedWindowsController.removeWindowFromState(photoEditorForm);
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
};

function onPhotoEditorResetBtnClick () {
  closePhotoEditor();
}

function onDocumentKeyDown (evt) {

  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if ([hashtagInput, commentInput].includes(document.activeElement)) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      escActionsController.closeWindow(closePhotoEditor, photoEditorForm);
    }
  }
}

export const initUploadModal = () => {

  initSendDataForm(uploadForm);

  uploadFileControl.addEventListener('change', function() {
    photoEditorForm.classList.remove('hidden');
    openedWindowsController.pushWindowToState(photoEditorForm);
    pageBody.classList.add('modal-open');

    const fileURL = URL.createObjectURL(this.files[0]);
    userImage.src = fileURL;
    effectsPreviews.forEach((effectsPreview)=>{
      effectsPreview.style.backgroundImage = `url(${fileURL})`;
    });
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  });
};
