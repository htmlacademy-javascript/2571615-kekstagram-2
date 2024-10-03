const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

const names = ['Артём', 'Иван', 'Сергей', 'Дмитрий', 'Екатерина', 'Анна'];

const photoDescriptions = [
  'Друзья на пикнике',
  'Завтрак с любимыми блюдами',
  'Смешная кошка на диване',
  'Горы во время заката',
  'Морской берег с ракушками',
  'Счастливая семья в парке',
  'Первый снег зимой',
  'Кофе и книга в кафе',
  'Солнце светит на деревья',
  'Улыбающееся лицо ребенка',
  'Летний день в саду',
  'Поездка на велосипеде',
  'Природа и красивые цветы',
  'Бег по утреннему парку',
  'Собаки играют на поляне',
  'Город в вечерних огнях',
  'Рыбалка на спокойном озере',
  'Красивая архитектура старого города',
  'Уютный вечер у камина',
  'Путешествие по горным тропам',
  'Мимолетный момент радости',
  'Спокойствие в лесу',
  'Шумный городской рынок',
  'Смешные моменты с друзьями',
  'Яркий закат на пляже',
  'Праздничные огни на улице'
];

const minCommentId = 0;
const maxCommentId = 500;

const minCountOfMessage = 1;
const maxCountOfMessage = 2;

const minAvatarId = 1;
const maxAvatarId = 6;

const countOfPhotoObjects = 25;

const minCountOfLikes = 15;
const maxCountOfLikes = 200;

const minCountOfComments = 0;
const maxCountOfComments = 30;

const commentsID = new Set(); // Используем Set для контроля уникальности id комментариев

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

function generateComment() {
  let id;
  do {
    id = getRandomInt(minCommentId, maxCommentId); // Случайный id для комментария
  } while (commentsID.has(id));
  commentsID.add(id);

  const messageCount = getRandomInt(minCountOfMessage, maxCountOfMessage);
  let message = '';
  for (let j = 0; j < messageCount; j++) {
    message += `${getRandomElement(messages) } `;
  }

  const avatarId = getRandomInt(minAvatarId, maxAvatarId);
  const comment = {
    id,
    avatar: `img/avatar-${avatarId}.svg`,
    message: message.trim(),
    name: names[avatarId - 1]
  };
  return comment;
}


function generatePhotoObjects() {
  const photoArray = [];
  for (let i = 1; i <= countOfPhotoObjects; i++) {
    const photoObject = {
      id: i,
      url: `photos/${i}.jpg`,
      description: photoDescriptions[i - 1],
      likes: getRandomInt(minCountOfLikes, maxCountOfLikes),
      comments: Array.from({ length: getRandomInt(minCountOfComments, maxCountOfComments) }, generateComment)
    };
    photoArray.push(photoObject);
  }

  return photoArray;
}

const photoData = generatePhotoObjects();
console.log(photoData);
