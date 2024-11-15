import renderPicturesFromTemplate from './render-pictures-from-template ';
import { initFilters } from './init-loaded-photos-filters';
import { UrlApi, TIME_OF_ERROR_MESSAGE_DELETE } from './constants';


const displayErrorMessage = () => {
  const template = document.getElementById('data-error').content.cloneNode(true);
  const errorMessage = template.querySelector('.data-error__title');
  errorMessage.textContent = 'Не удалось загрузить данные. Пожалуйста, попробуйте снова позже.';
  const errorSection = template.querySelector('.data-error');
  document.body.appendChild(template);
  setTimeout(() => {
    document.body.removeChild(errorSection);
  }, TIME_OF_ERROR_MESSAGE_DELETE);
};


export const loadData = async () => {
  const url = UrlApi.LOAD_URL;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Сетевая ошибка при загрузке данных');
    }
    const data = await response.json();
    renderPicturesFromTemplate(data);

    initFilters(data);

  } catch (error) {
    displayErrorMessage();
  }
};


