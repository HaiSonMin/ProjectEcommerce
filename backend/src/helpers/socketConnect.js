const redis = require('../databases/init.redisDB');
const { redisKeyRoom } = require('../utils/redisKey');

class SocketConnect {
  // When connect server and client have on room
  connection(socket) {
    socket.on('disconnect', () => {
      console.log(`User disconnect id is ${socket.id}`);
    });

    // User create room to chat with SwitchBoard
    socket.on('user_join_room', async (data) => {
      // socket.join(data.roomId); // id of room
      // global._socketIO
      //   .to(data.roomId)
      //   .emit('user_join_room', { ...data, chat_roomId: socket.id });
      socket.join('room_common'); // id of room
      global._socketIO
        .to('room_common')
        .emit('user_join_room', { ...data, chat_roomId: socket.id });
    });

    // User create room to chat with SwitchBoard
    socket.on('admin_join_room', async (data) => {
      socket.join(data.roomId); // id of room
      global._socketIO.broadcast
        .to(data.roomId)
        .emit('admin_join_room', 'Admin just joined in room');
    });

    socket.on('chatting', (msg) => {
      console.log('chatting::::', msg);
      global._socketIO.to('room_common').emit('chatting', msg);
    });

    socket.on('send_message', async (data) => {
      const dataStoreRedis = JSON.stringify({
        chat_userMessage: data.chat_userMessage,
        chat_userEmail: data.chat_userEmail,
      });
      console.log('send message data:::', data);
      // await redis.rpush(redisKeyRoom(data.chat_roomId), dataStoreRedis);
      // const dataMessage = await redis.lrange(redisKeyRoom(data.chat_roomId), 0, -1);
      // global._socketIO.to(data.chat_roomId).emit('receive_message', dataMessage); // id of room
      await redis.rpush('room_common', dataStoreRedis);
      const dataMessage = await redis.lrange('room_common', 0, -1);
      global._socketIO.to('room_common').emit('receive_message', dataMessage); // id of room
    });
  }
}

module.exports = new SocketConnect();
