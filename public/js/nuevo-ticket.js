/** @format */

// HTML References
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btn = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
	btn.disabled = false;
});

socket.on('disconnect', () => {
	btn.disabled = true;
});

btn.addEventListener('click', () => {
	/**
	 * The first parameter is the name of the event,
	 * The second one is the payload.
	 * The third one is the callback with the response from the server.
	 */
	socket.emit('next-ticket', null, (ticket) => {
		lblNuevoTicket.innerText = ticket;
	});
});
