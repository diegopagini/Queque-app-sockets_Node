/** @format */
import fs from 'fs';
import { readFile } from 'fs/promises';

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

	async saveDB() {
		fs.writeFileSync('db/data.json', JSON.stringify(this.toJson));
	}
}
