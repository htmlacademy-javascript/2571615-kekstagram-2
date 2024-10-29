export default function setupFilters() {
  const imgPreview = document.querySelector('.img-upload__preview img');
  const effectLevelValue = document.querySelector('.effect-level__value');
  const effectLevelSlider = document.querySelector('.img-upload__effect-level');
  const effectsList = document.querySelectorAll('.effects__radio');

  let currentEffectValue;
  let currentSliderValue;

  function initializeSlider() {
    noUiSlider.create(effectLevelSlider, {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
      connect: 'lower'
    });

    effectLevelSlider.noUiSlider.on('update', (value) => {
      currentSliderValue = value;
      effectLevelValue.value = currentSliderValue;
      updateEffect();
    });
  }

  function hideSliderInitially() {
    effectLevelSlider.style.display = 'none';
  }

  function setupEffectChangeHandlers() {
    effectsList.forEach((effect) => {
      effect.addEventListener('change', () => {
        if (effect.checked) {
          currentEffectValue = effect.value;
          updateSlider();
          effectLevelValue.value = currentSliderValue;
          updateEffect();
        }
      });
    });
  }

  initializeSlider();
  hideSliderInitially();
  setupEffectChangeHandlers();

  function updateEffect() {

    const effectMap = {
      chrome: `grayscale(${currentSliderValue})`,
      sepia: `sepia(${currentSliderValue})`,
      marvin: `invert(${currentSliderValue}%)`,
      phobos: `blur(${currentSliderValue}px)`,
      heat: `brightness(${currentSliderValue})`,
      none: ''
    };

    imgPreview.style.filter = effectMap[currentEffectValue];
  }

  function updateSlider() {
    if (currentEffectValue !== 'none') {
      effectLevelSlider.style.display = 'block';

      const sliderOptions = {
        chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
        sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
        marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
        phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
        heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 }
      };

      effectLevelSlider.noUiSlider.updateOptions(sliderOptions[currentEffectValue]);
      currentSliderValue = effectLevelSlider.noUiSlider.options.range.max;
    } else {
      effectLevelSlider.style.display = 'none';
      currentSliderValue = undefined;
    }
  }
}
