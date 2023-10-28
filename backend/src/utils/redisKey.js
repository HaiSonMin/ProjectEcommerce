const redisKeyRoom = (roomId) => `room:id#${roomId}`;
const redisKeyUserInfoChat = (roomId) => `user:info#${roomId}`;

module.exports = {
  redisKeyRoom,
  redisKeyUserInfoChat,
};
