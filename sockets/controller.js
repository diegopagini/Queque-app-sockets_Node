/** @format */

export const socketController = (socket) => {
	console.log('Client connected', socket.id);

	// Listen a custom event:
	socket.on(
		'send-msg', // needs to be the same name that is used to emit.
		(payload, callback) => {
			// "payload" is the data sent from the frontend.
			// the callback is received from the client.
			console.log(`from the browser: ${payload.msg}`);

			// socket.broadcast.emit to send to all clients:
			// socket.broadcast.emit('send-new-msg', `From server: ${payload.msg}`);

			const id = 123456;
			callback(id); // This callback is going to send info only to that client. Not all.
		}
	);

	socket.on('disconnect', () => console.log('Client disconnected', socket.id));
};
