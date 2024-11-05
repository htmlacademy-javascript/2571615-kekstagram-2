import { closePhotoEditor } from './uploadPhotoForm';
import { resetImagePreview } from './uploadPhotoForm';
import { uploadForm } from './constants';
import { pristine } from './checkUpByPristine';

export function makeSubmitButtonDisabled () {
  const submitButton = uploadForm.querySelector('#upload-submit');
  submitButton.disabled = true;
}

function cancelSubmitButtonDisabled () {
  const submitButton = uploadForm.querySelector('#upload-submit');
  submitButton.disabled = false;
}

export async function initSendDataForm(form) {

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const isValid = pristine.validate();
    if(!isValid) {
      return;
    }

    makeSubmitButtonDisabled();

    const formData = new FormData(form);

    try {
      await sendData(formData);
      handleSuccess(form);
    } catch (error) {
      handleError();
    } finally {
      cancelSubmitButtonDisabled();
    }
  });
}

async function sendData(data) {
  const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }
}

function handleSuccess(form) {
  form.reset();
  resetImagePreview();
  closePhotoEditor();
  showMessage('success');
}

function handleError() {
  showMessage('error');
}

function showMessage(type) {
  const template = document.getElementById(type).content.querySelector(`.${type}`);
  const messageElement = template.cloneNode(true);

  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector(`.${type}__button`);
  closeButton.addEventListener('click', () => removeMessage(messageElement), { once: true });

  addEventListeners(messageElement, type);
}

function addEventListeners(messageElement, type) {
  function onEsc (event) {
    if (event.key === 'Escape') {
      removeMessage(messageElement);
      document.removeEventListener('keydown', onEsc);
      document.removeEventListener('click', onOutsideClick);
    }
  }

  function onOutsideClick (event) {
    if (!event.target.closest(`.${type}__inner`)) {
      removeMessage(messageElement);
      document.removeEventListener('click', onOutsideClick);
      document.removeEventListener('keydown', onEsc);
    }
  }

  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onOutsideClick);
}

function removeMessage(messageElement) {
  document.body.removeChild(messageElement);
}
