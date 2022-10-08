/** @format */
import { TicketControl } from '../models/ticket-control.js';

const ticketControl = new TicketControl();

export const socketController = (socket) => {
	/**
	 * When the socket connects.
	 */
	socket.emit('last-ticket', ticketControl.last);
	socket.emit('current-state', ticketControl.lastFour);

	/**
	 * The first parameter is the name of the event,
	 * The second one is the payload.
	 * The third one is the callback with the response that is going to be sent to the frontend.
	 */
	socket.on('next-ticket', (payload, callback) => {
		const next = ticketControl.next();
		callback(next); // callback is the return to frontend.
	});

	socket.on('attend-ticket', ({ desk }, callback) => {
		if (!desk)
			return callback({
				ok: false,
				msg: 'Desk is required',
			});

		const ticket = ticketControl.attendTicket(desk);

		socket.broadcast.emit('current-state', ticketControl.lastFour);

		if (!ticket) {
			callback({
				ok: false,
				msg: 'There is no more tickets.',
			});
		} else
			callback({
				ok: true,
				ticket,
			});
	});
};
