# Sockets

import { Server as Socket } from 'socket.io';

export class Server {
	constructor() {
		this.io = new Socket(this.server); // Socket.io - Sockets Server
    }
}


/**
  * Sockets configuration.
  */
sockets() {
  this.io.on('connection', (socket) => {
    console.log('Client connected', socket.id);

    // Listen a custom event:
    socket.on(
      'send-msg', // needs to be the same name that is used to emit.
      (payload) => {
        // "payload" is the data sent from the frontend
        console.log(payload);
      }
    );

    socket.on('disconnect', () => console.log('Client disconnected', socket.id));
  });
}

/**
  * To start de server.
  */
listen() {
  // Socket server.
  this.server.listen(this.port, () => {
    console.log(`server running in port: ${this.port}`);
  });
}