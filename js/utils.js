import { DEBOUNCE_TIME } from './constants';

export function isEscapeKey(event) {
  return event.key === 'Escape' || event.keyCode === 27;
}

export function debounce (callback, timeoutDelay = DEBOUNCE_TIME) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
