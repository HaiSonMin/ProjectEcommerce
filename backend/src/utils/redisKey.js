const redisKeyRoom = (roomId) => `room:id#${roomId}`;
const redisKeyUserInfoChat = (roomId) => `user:info#${roomId}`;
const redisKeyProductsCategoryId = (categoryId) =>
  `products:category#${categoryId}`;

module.exports = {
  redisKeyRoom,
  redisKeyUserInfoChat,
  redisKeyProductsCategoryId,
};
