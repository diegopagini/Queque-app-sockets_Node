/** @format */
import { TicketControl } from '../models/ticket-control.js';


const ticketControl = new TicketControl();

export const socketController = (socket) => {
	socket.on('send-msg', (payload, callback) => {
		console.log(`from the browser: ${payload.msg}`);

		const id = 123456;
		callback(id);
	});
};
