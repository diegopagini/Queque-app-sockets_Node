/** @format */
import fs from 'fs';
import { readFile } from 'fs/promises';

class Ticket {
	constructor(number, desk) {
		this.number = number;
		this.desk = desk;
	}
}

export class TicketControl {
	constructor() {
		this.last = 0;
		this.today = new Date().getDate();
		this.tickets = [];
		this.lastFour = [];

		this.init();
	}

	get toJson() {
		return {
			last: this.last,
			today: this.today,
			tickets: this.tickets,
			lastFour: this.lastFour,
		};
	}

	async init() {
		const { today, last, tickets, lastFour } = JSON.parse(
			await readFile(new URL('../db/data.json', import.meta.url))
		); // To read a json file in local.

		if (today === this.today) {
			this.tickets = tickets;
			this.lastFour = lastFour;
			this.last = last;
		} else this.saveDB();
	}

	saveDB() {
		fs.writeFileSync('db/data.json', JSON.stringify(this.toJson));
	}

	next() {
		this.last += 1;
		const ticket = new Ticket(this.last, null);
		this.tickets.push(ticket);

		this.saveDB();

		return `Ticket ${ticket.number}`;
	}

	attendTicket(desk) {
		// If no tickets.
		if (this.tickets.length === 0) return null;

		const ticket = this.tickets.shift(); // First ticket on the list.

		ticket.desk = desk;

		this.lastFour.unshift(ticket);

		if (this.lastFour.length > 4) this.lastFour.splice(-1, 1); // To remove the last one.

		this.saveDB();

		return ticket;
	}
}
