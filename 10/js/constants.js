export const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'
];

export const names = ['Артём', 'Иван', 'Сергей', 'Дмитрий', 'Екатерина', 'Анна'];

export const photoDescriptions = [
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

export const minCommentId = 0;
export const maxCommentId = 500;

export const minCountOfMessage = 1;
export const maxCountOfMessage = 2;

export const minAvatarId = 1;
export const maxAvatarId = 6;

export const countOfPhotoObjects = 25;

export const minCountOfLikes = 15;
export const maxCountOfLikes = 200;

export const minCountOfComments = 0;
export const maxCountOfComments = 30;

export const commentsID = new Set();

export const uploadForm = document.querySelector('.img-upload__form');
export const pageBody = document.querySelector('body');
export const uploadFileControl = uploadForm.querySelector('#upload-file');
export const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
export const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
export const hashtagInput = uploadForm.querySelector('.text__hashtags');
export const commentInput = uploadForm.querySelector('.text__description');
export const errorsByPristineContainer = document.querySelector('.img-upload__field-wrapper');
