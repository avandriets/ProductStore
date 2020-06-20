const sio = require('socket.io');

let io;

module.exports = {
  init: http => {
    io = sio(http);

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialize.');
    }
    return io;
  }
};
