/** @format */

// HTML References
const lblDesk = document.querySelector('#desk');
const btn = document.querySelector('button');
const currentTicket = document.querySelector('small');
const alert = document.querySelector('.alert');
const pendingTickets = document.querySelector('#lblPendientes');

// Params
const searchParams = new URLSearchParams(window.location.search);

// Sockets
const socket = io();

if (!searchParams.has('escritorio')) {
	window.location = 'index.html';
	throw new Error('Desk is mandatory');
}

const desk = searchParams.get('escritorio');
lblDesk.innerText = desk;
alert.style.display = 'none';

socket.on('connect', () => {
	btn.disabled = false;
});

socket.on('pending-tickets', (pending) => {
	if (pending === 0) pendingTickets.style.display = 'none';
	else {
		pendingTickets.style.display = '';
		pendingTickets.innerText = pending;
	}
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
	socket.emit('attend-ticket', { desk }, ({ ok, ticket }) => {
		if (!ok) {
			currentTicket.innerText = `Nadie`;
			alert.style.display = 'block';
			return null;
		}

		currentTicket.innerText = `Ticket ${ticket.number}`;
	});
});
