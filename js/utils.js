import { DEBOUNCE_TIME } from './constants';

export const isEscapeKey = (event) => event.key === 'Escape' || event.keyCode === 27;

export const debounce = (callback, timeoutDelay = DEBOUNCE_TIME) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


