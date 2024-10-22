import { generatePhotoObjects } from './photos.js';
import renderPicturesFromTemplate from './renderPicturesFromTemplate .js';
import openAndCloseBigPicture from './openAndCloseBigPicture.js';

const photoData = generatePhotoObjects();

renderPicturesFromTemplate(photoData);

openAndCloseBigPicture();
