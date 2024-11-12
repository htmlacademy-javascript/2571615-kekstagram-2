import { closePhotoEditor, resetImagePreview } from './upload-photo-form';
import { UrlApi, submitButton } from './constants';
import { openedWindowsController, escActionsController } from './esc-actions-controller';
import { pristine } from './check-up-by-pristine';
import { isEscapeKey } from './utils';

export const toggleSubmitButtonDisabled = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

export async function initSendDataForm(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    toggleSubmitButtonDisabled(true);

    const formData = new FormData(form);

    try {
      await sendData(formData);
      handleSuccess(form);
    } catch (error) {
      handleError(error);
    } finally {
      toggleSubmitButtonDisabled(false);
    }
  });
}

async function sendData (data) {
  const response = await fetch(UrlApi.SEND_URL, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${ response.statusText}`);
  }
}

function handleSuccess (form) {
  form.reset();
  resetImagePreview();
  closePhotoEditor();
  showMessage('success');
}

function handleError () {
  showMessage('error');
}

function showMessage (type) {
  const template = document.getElementById(type).content.querySelector(`.${type}`);
  const messageElement = template.cloneNode(true);

  document.body.appendChild(messageElement);
  openedWindowsController.pushWindowToState(messageElement);
  addEventListeners(messageElement, type);
}

function addEventListeners (messageElement, type) {
  const closeButton = messageElement.querySelector(`.${type}__button`);

  const closeMessageWindow = () => {
    removeEventListeners();
    removeMessage(messageElement);
  };

  function removeEventListeners () {
    closeButton.removeEventListener('click', closeMessageWindow);
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onOutsideClick);
  }

  function onEsc (evt) {
    if (isEscapeKey(evt)) {
      escActionsController.closeWindow(closeMessageWindow, messageElement);
    }
  }

  function onOutsideClick (event) {
    if (!event.target.closest(`.${type}__inner`)) {
      closeMessageWindow();
    }
  }

  closeButton.addEventListener('click', closeMessageWindow);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onOutsideClick);
}

function removeMessage (messageElement) {
  openedWindowsController.removeWindowFromState(messageElement);
  document.body.removeChild(messageElement);
}
