/** @format */
import { TicketControl } from '../models/ticket-control.js';

const ticketControl = new TicketControl();

export const socketController = (socket) => {
	/**
	 * When the socket connects.
	 */
	socket.emit('last-ticket', ticketControl.last);

	/**
	 * The first parameter is the name of the event,
	 * The second one is the payload.
	 * The third one is the callback with the response that is going to be sent to the frontend.
	 */
	socket.on('next-ticket', (payload, callback) => {
		const next = ticketControl.next();
		callback(next); // callback is the return to frontend.
	});
};
