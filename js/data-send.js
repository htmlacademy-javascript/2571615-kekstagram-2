import { closePhotoEditor, resetImagePreview } from './upload-photo-form';
import { UrlApi, submitButton } from './constants';
import { openedWindowsController, escActionsController } from './esc-actions-controller';
import { pristine } from './check-up-by-pristine';
import { isEscapeKey } from './utils';

export const toggleSubmitButtonDisabled = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const removeMessage = (messageElement) => {
  openedWindowsController.removeWindowFromState(messageElement);
  document.body.removeChild(messageElement);
};

const addEventListeners = (messageElement, type) => {
  const closeButton = messageElement.querySelector(`.${type}__button`);

  const onEsc = (evt) => {
    if (isEscapeKey(evt)) {
      escActionsController.closeWindow(closeMessageWindow, messageElement);
    }
  };

  const onOutsideClick = (event) => {
    if (!event.target.closest(`.${type}__inner`)) {
      closeMessageWindow();
    }
  };

  const removeEventListeners = () => {
    closeButton.removeEventListener('click', closeMessageWindow);
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onOutsideClick);
  };

  function closeMessageWindow () { // Здесь function, а не стрелка, потому что без всплытия линтер выбивает ошибку, это никак не обойти  - если перенести вверх, то нужно будет всплытие  removeEventListeners() и т.д.
    removeEventListeners();
    removeMessage(messageElement);
  }

  closeButton.addEventListener('click', closeMessageWindow);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onOutsideClick);
};

const showMessage = (type) => {
  const template = document.getElementById(type).content.querySelector(`.${type}`);
  const messageElement = template.cloneNode(true);

  document.body.appendChild(messageElement);
  openedWindowsController.pushWindowToState(messageElement);
  addEventListeners(messageElement, type);
};

const handleSuccess = (form) => {
  form.reset();
  resetImagePreview();
  closePhotoEditor();
  showMessage('success');
};

const handleError = () => {
  showMessage('error');
};
const sendData = async (data) => {
  const response = await fetch(UrlApi.SEND_URL, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${ response.statusText}`);
  }
};

export const initSendDataForm = async (form) => {
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
};
