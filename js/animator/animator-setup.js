// ----- Requires ----- //

var gui = require('nw.gui');

var Menus = require('../js/menus.js');


// ----- Functions ----- //

// Builds the animator menubar.
function buildMenubar () {

	var menus = Menus(gui);
	menus.macMenu();

}

// Sets up various components of the animator.
function setup () {

	window.focus();
	buildMenubar();

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, 500, 400);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
