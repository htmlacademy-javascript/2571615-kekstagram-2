import {DEFAULT_NO_UI_SLIDER_SETTINGS, effectLevelSlider, imgPreview, effectLevelValue, effectLevelSliderContainer, effectsList} from './constants';

noUiSlider.create(effectLevelSlider, DEFAULT_NO_UI_SLIDER_SETTINGS);
export const slider = effectLevelSlider.noUiSlider;

export const setupFilters = () => {

  let currentEffectValue = 'none';
  let currentSliderValue = 0;

  const updateEffect = () => {

    const effectMap = {
      chrome: `grayscale(${currentSliderValue})`,
      sepia: `sepia(${currentSliderValue})`,
      marvin: `invert(${currentSliderValue}%)`,
      phobos: `blur(${currentSliderValue}px)`,
      heat: `brightness(${currentSliderValue})`,
      none: ''
    };

    imgPreview.style.filter = effectMap[currentEffectValue];
  };

  const updateSlider = () => {
    if (currentEffectValue !== 'none') {
      effectLevelSliderContainer.style.display = 'block';

      const sliderOptions = {
        chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
        sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
        marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
        phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
        heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 }
      };

      slider.updateOptions(sliderOptions[currentEffectValue]);
      currentSliderValue = slider.options.range.max;
    } else {
      effectLevelSliderContainer.style.display = 'none';
      currentSliderValue = 0;
    }
  };

  const initializeSlider = () => {
    slider.on('update', (value) => {
      currentSliderValue = +value;
      effectLevelValue.value = +(currentSliderValue.toFixed(1));
      updateEffect();
    });
  };

  const hideSliderInitially = () => {
    effectLevelSliderContainer.style.display = 'none';
  };

  const setupEffectChangeHandlers = () => {
    effectsList.forEach((effect) => {
      effect.addEventListener('change', () => {
        if (effect.checked) {
          currentEffectValue = effect.value;
          updateSlider();
          effectLevelValue.value = +(currentSliderValue.toFixed(1));
          updateEffect();
        }
      });
    });
  };

  initializeSlider();
  hideSliderInitially();
  setupEffectChangeHandlers();
};
