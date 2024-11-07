const renderPicturesFromTemplate = (pictures) => {
  // Получаем контейнер, в который будем добавлять миниатюры
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.querySelectorAll('.picture').forEach(
    (picture) => {
      picture.remove();
    }
  );

  const fragment = document.createDocumentFragment();

  // Получаем шаблон
  const template = document.getElementById('picture').content.querySelector('.picture');

  pictures.forEach((picture) => {

    //Деструктурируем моковый объект
    const { url, description, likes, comments } = picture;

    // Клонируем содержимое шаблона
    const pictureElement = template.cloneNode(true);

    // Сериализуем стейт и прокидываем в миниатюру
    pictureElement.dataset.state = JSON.stringify(picture);

    // Заполняем данными миниатюру
    const img = pictureElement.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    const commentsSpan = pictureElement.querySelector('.picture__comments');
    commentsSpan.textContent = comments.length;

    const likesSpan = pictureElement.querySelector('.picture__likes');
    likesSpan.textContent = likes;

    // Добавляем элемент в фрагмент
    fragment.appendChild(pictureElement);
  });

  // Вставляем все элементы в контейнер
  picturesContainer.appendChild(fragment);
};


export default renderPicturesFromTemplate;
