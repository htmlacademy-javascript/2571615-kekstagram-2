import { isEscapeKey } from './utils';
import { initSendDataForm } from './data-send';
import { uploadForm, pageBody, hashtagInput, commentInput, uploadFileControl, photoEditorForm, photoEditorResetBtn, userImage, effectsPreviews, effectLevelSliderContainer, previewImage, DEFAULT_NO_UI_SLIDER_SETTINGS } from './constants';
import { slider } from './setup-filters';
import { escActionsController, openedWindowsController } from './esc-actions-controller';

export const resetImagePreview = () => {
  if (userImage) {
    slider.updateOptions(DEFAULT_NO_UI_SLIDER_SETTINGS);
    userImage.style.filter = '';
    previewImage.style.transform = `scale(${1})`;
    effectLevelSliderContainer.style.display = 'none';
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

function onPhotoEditorResetBtnClick () { //здесь function, потому что нужно всплытие, если сделать стрелкой и переместить вверх, то потребуется всплытие closePhotoEditor
  closePhotoEditor();
}

function onDocumentKeyDown (evt) { // то же самое - если сделать стрелку и перенести вверх, то будет нужно всплытие closePhotoEditor

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

  uploadFileControl.addEventListener('change', function() {// Здесь работаем с this, поэтому function
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
