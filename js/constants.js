export const UrlApi = {
  LOAD_URL: 'https://31.javascript.htmlacademy.pro/kekstagram/data',
  SEND_URL: 'https://31.javascript.htmlacademy.pro/kekstagram'
};

export const uploadForm = document.querySelector('.img-upload__form');
export const submitButton = uploadForm.querySelector('#upload-submit');
export const pageBody = document.querySelector('body');
export const uploadFileControl = uploadForm.querySelector('#upload-file');
export const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
export const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
export const hashtagInput = uploadForm.querySelector('.text__hashtags');
export const commentInput = uploadForm.querySelector('.text__description');
export const errorsByPristineContainer = document.querySelector('.img-upload__field-wrapper');
export const filters = document.querySelector('.img-filters');
export const userImage = document.querySelector('.img-upload__preview>img');
export const effectsPreviews = document.querySelectorAll('.effects__preview');
export const picturesContainer = document.querySelector('.pictures');
export const bigPictureContainer = document.querySelector('.big-picture');
export const bigPicture = document.querySelector('.big-picture__img img');
export const likesCounter = document.querySelector('.likes-count');
export const socialCommentTotalCounter = document.querySelector('.social__comment-total-count');
export const socialCommentShownCounter = document.querySelector('.social__comment-shown-count');
export const commentsContainer = document.querySelector('.social__comments');
export const bigPictureDescription = document.querySelector('.social__caption');
export const cancelButton = document.querySelector('#picture-cancel');
export const commentsLoaderButton = document.querySelector('.social__comments-loader.comments-loader');
export const smallerButton = document.querySelector('.scale__control--smaller');
export const biggerButton = document.querySelector('.scale__control--bigger');
export const scaleValueInput = document.querySelector('.scale__control--value');
export const previewImage = document.querySelector('.img-upload__preview img');
export const defaultActiveFilterButton = document.querySelector('#filter-default');

export const MAX_HASHTAG_LENGTH = 20;
export const MAX_HASHTAG_COUNT = 5;
export const MAX_COMMENT_LENGTH = 140;
export const TIME_OF_ERROR_MESSAGE_DELETE = 5000;

export const SCALE_STEP = 25;
export const MIN_SCALE = 25;
export const MAX_SCALE = 100;

export const MAX_COMMENTS_COUNT_TO_ADD = 5;

export const DEBOUNCE_TIME = 500;
