/** @format */

// HTML references.
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMsg = document.querySelector('#txtMsg');
const btnSend = document.querySelector('#btnSend');

const socket = io(); // To start connection with socket.

/**
 * connect event.
 */
socket.on('connect', () => {
	console.log('Connected');

	lblOffline.style.display = 'none';
	lblOnline.style.display = 'inline-block';
});

/**
 * disconnect event.
 */
socket.on('disconnect', () => {
	console.log('Disconnected');

	lblOffline.style.display = 'inline-block';
	lblOnline.style.display = 'none';
});

/**
 * To listen a custom event from the server with sockets.
 */
socket.on('send-new-msg', (payload) => {
	// 'send-new-msg' is the name of the event.
	console.log({ payload });
});

/**
 * Custom event.
 */
btnSend.addEventListener('click', () => {
	const msg = txtMsg.value;
	const payload = {
		msg,
		id: 'abc123',
		date: new Date().getTime(),
	};

	// "emit" is used to create a custom event. "on" is to listen that event.
	socket.emit(
		'send-msg', // "send-msg" is the name of the event.
		payload, // payload is the data to send.
		(id) => {
			// The third argument is a callback
			console.log(`From server: `, id);
		}
	);
});
