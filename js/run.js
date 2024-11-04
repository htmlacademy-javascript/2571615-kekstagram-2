import openAndCloseBigPicture from './openAndCloseBigPicture.js';
import { initUploadModal } from './uploadPhotoForm.js';
import runCheckUpByPristine from './checkUpByPristine.js';
import makeImageScale from './imageScaleControllers.js';
import setupFilters from './setupFilters.js';
import {loadData} from './dataLoader.js';

export function run() {

  loadData();

  initUploadModal();

  openAndCloseBigPicture();

  runCheckUpByPristine();

  makeImageScale();

  setupFilters();

}


