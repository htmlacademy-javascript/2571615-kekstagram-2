import { photoDescriptions, countOfPhotoObjects, minCountOfLikes, maxCountOfLikes, minCountOfComments, maxCountOfComments } from './constants.js';
import { generateComment } from './comments.js';
import { getRandomInt } from './utils.js';

export function generatePhotoObjects() {
  const photoArray = [];

  for (let i = 1; i <= countOfPhotoObjects; i++) {
    const photoObject = {
      id: i,
      url: `photos/${i}.jpg`,
      description: photoDescriptions[i - 1],
      likes: getRandomInt(minCountOfLikes, maxCountOfLikes),
      comments: Array.from({ length: getRandomInt(minCountOfComments, maxCountOfComments) }, generateComment),
    };

    photoArray.push(photoObject);
  }

  return photoArray;
}
