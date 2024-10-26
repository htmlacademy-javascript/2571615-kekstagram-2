import { generatePhotoObjects } from './photos.js';
import renderPicturesFromTemplate from './renderPicturesFromTemplate .js';
import openAndCloseBigPicture from './openAndCloseBigPicture.js';
import { initUploadModal } from './uploadPhotoForm.js';
import runCheckUpByPristine from './checkUpByPristine.js';

const photoData = generatePhotoObjects();

renderPicturesFromTemplate(photoData);

openAndCloseBigPicture();

initUploadModal();

runCheckUpByPristine();
