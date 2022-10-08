/** @format */

// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', () => {
	lblOffline.style.display = 'none';
	lblOnline.style.display = '';
});

socket.on('disconnect', () => {
	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
});
