import { smallerButton, biggerButton, scaleValueInput, previewImage, SCALE_STEP, MIN_SCALE, MAX_SCALE } from './constants';

export const makeImageScale = () => {

  let currentScale = MAX_SCALE;

  scaleValueInput.setAttribute('readonly', true);

  const updateScaleDisplay = () => {
    scaleValueInput.value = `${currentScale}%`;
    previewImage.style.transform = `scale(${currentScale / 100})`;
  };

  const setScale = (value) => {
    if (value < MIN_SCALE) {
      currentScale = MIN_SCALE;
    } else if (value > MAX_SCALE) {
      currentScale = MAX_SCALE;
    } else {
      currentScale = value;
    }
    updateScaleDisplay();
  };

  smallerButton.addEventListener('click', () => {
    setScale(currentScale - SCALE_STEP);
  });

  biggerButton.addEventListener('click', () => {
    setScale(currentScale + SCALE_STEP);
  });

  updateScaleDisplay();
};
