import renderPicturesFromTemplate from './renderPicturesFromTemplate ';

export function filterPictures(data, filterId) {

  let filteredData;
  const uniqueItems = [...data];

  switch (filterId) {

    case 'filter-default':
      filteredData = data;
      break;

    case 'filter-random':
      filteredData = [];
      while (filteredData.length < 10 && uniqueItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * uniqueItems.length);
        filteredData.push(uniqueItems[randomIndex]);
        uniqueItems.splice(randomIndex, 1); // Убираем выбраное значение из массива уникальных элементов
      }
      break;

    case 'filter-discussed':
      filteredData = data.slice().sort((a, b) =>
        b.comments.length - a.comments.length // Сравниваем количество комментариев
      );
      break;

    default:
      filteredData = data;
  }

  // Вызываем функцию рендеринга с отфильтрованным массивом
  renderPicturesFromTemplate(filteredData);
}

