const app = require('./app');

const port = process.env.PORT || 9000;
// Socket
const { SocketConnect } = require('./src/helpers');
const { Server } = require('socket.io');

const server = app.listen(port, () => {
  console.log(`App Ecommerce CellphoneS listening on port ${port}`);
});

// When we click ctrl+C
process.on('SIGINT', () => {
  server.close(() => console.log('Exit Server Express'));
});

// Socket
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.LOCAL_HOST_SERVER,
    credentials: true,
  },
});
global._socketIO = io;
global._socketIO.on('connection', SocketConnect.connection);
