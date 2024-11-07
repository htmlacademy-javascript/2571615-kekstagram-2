import renderPicturesFromTemplate from './renderPicturesFromTemplate ';
import { filterPictures } from './filterLoadedPhotos';
import {filters} from './constants';

export async function loadData() {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

  function debounce (callback, timeoutDelay = 500) {
    let timeoutId;
    return (...rest) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
  }

  const debouncedFilterPictures = debounce(filterPictures);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Сетевая ошибка при загрузке данных');
    }
    const data = await response.json();
    renderPicturesFromTemplate(data);

    filters.classList.remove('img-filters--inactive');

    const buttons = document.querySelectorAll('.img-filters__button');
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        ([...buttons]).forEach((item)=>item.classList.remove('img-filters__button--active'));
        this.classList.add('img-filters__button--active');

        const filterId = this.id;
        debouncedFilterPictures(data, filterId);
      });
    });

  } catch (error) {
    displayErrorMessage();
  }
}

function displayErrorMessage() {
  const template = document.getElementById('data-error').content.cloneNode(true);
  const errorMessage = template.querySelector('.data-error__title');
  errorMessage.textContent = 'Не удалось загрузить данные. Пожалуйста, попробуйте снова позже.';
  const errorSection = template.querySelector('.data-error');
  document.body.appendChild(template);
  // Удаляем сообщение об ошибке через 5 секунд
  setTimeout(() => {
    document.body.removeChild(errorSection);
  }, 5000);
}
