import { generatePhotoObjects } from './photos.js';
import renderPicturesFromTemplate from './renderPicturesFromTemplate .js';

const photoData = generatePhotoObjects();

renderPicturesFromTemplate(photoData);
