import openAndCloseBigPicture from './open-and-close-big-picture.js';
import { initUploadModal } from './upload-photo-form.js';
import runCheckUpByPristine from './check-up-by-pristine.js';
import makeImageScale from './image-scale-controllers.js';
import setupFilters from './setup-filters.js';
import {loadData} from './data-loader.js';

export function run() {

  loadData();

  initUploadModal();

  openAndCloseBigPicture();

  runCheckUpByPristine();

  makeImageScale();

  setupFilters();

}


