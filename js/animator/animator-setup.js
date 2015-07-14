// ----- Requires ----- //

var gui = require('nw.gui');

var Menus = require('../js/menus.js');
var Canvas = require('../js/animator/canvas.js');


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

	var canvas = Canvas(window);
	canvas.drawBackground();

	canvas.addDrawing('circle', {x: 50, y: 50, r: 20});
	canvas.paint();

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
