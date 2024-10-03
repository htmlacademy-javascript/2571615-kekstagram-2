import { messages, names, minAvatarId, maxAvatarId, commentsID, minCommentId, maxCommentId, minCountOfMessage, maxCountOfMessage } from './constants.js';
import { getRandomInt, getRandomElement } from './utils.js';

export function generateComment() {
  let id;

  do {
    id = getRandomInt(minCommentId, maxCommentId);
  } while (commentsID.has(id));

  commentsID.add(id);

  const messageCount = getRandomInt(minCountOfMessage, maxCountOfMessage);
  let message = '';

  for (let j = 0; j < messageCount; j++) {
    message += `${getRandomElement(messages)} `;
  }

  const avatarId = getRandomInt(minAvatarId, maxAvatarId);
  return {
    id,
    avatar: `img/avatar-${avatarId}.svg`,
    message: message.trim(),
    name: names[avatarId - 1]
  };
}
