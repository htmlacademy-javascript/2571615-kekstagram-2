import renderPicturesFromTemplate from './renderPicturesFromTemplate ';

export async function loadData() {
  const url = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Сетевая ошибка при загрузке данных');
    }
    const data = await response.json();
    renderPicturesFromTemplate(data);
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
