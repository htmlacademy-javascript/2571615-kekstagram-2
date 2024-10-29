export default function makeImageScale() {
  // Константы
  const SCALE_STEP = 25;
  const MIN_SCALE = 25;
  const MAX_SCALE = 100;

  // Элементы DOM
  const smallerButton = document.querySelector('.scale__control--smaller');
  const biggerButton = document.querySelector('.scale__control--bigger');
  const scaleValueInput = document.querySelector('.scale__control--value');
  const previewImage = document.querySelector('.img-upload__preview img'); // Элемент img внутри контейнера

  // Переменные состояния
  let currentScale = MAX_SCALE;

  // Установка поля ввода как только для чтения
  scaleValueInput.setAttribute('readonly', true);

  // Функция для обновления масштаба изображения и поля ввода
  function updateScaleDisplay() {
    scaleValueInput.value = `${currentScale}%`;
    previewImage.style.transform = `scale(${currentScale / 100})`;
  }

  // Функция для установки масштаба с проверками
  function setScale(value) {
    if (value < MIN_SCALE) {
      currentScale = MIN_SCALE;
    } else if (value > MAX_SCALE) {
      currentScale = MAX_SCALE;
    } else {
      currentScale = value;
    }
    updateScaleDisplay();
  }

  // Обработчик для уменьшения масштаба
  smallerButton.addEventListener('click', () => {
    setScale(currentScale - SCALE_STEP);
  });

  // Обработчик для увеличения масштаба
  biggerButton.addEventListener('click', () => {
    setScale(currentScale + SCALE_STEP);
  });

  // Инициализация начального состояния
  updateScaleDisplay();
}
