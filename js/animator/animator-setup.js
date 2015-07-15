// ----- Requires ----- //

var gui = require('nw.gui');

var Menus = require('../js/menus.js');
var Canvas = require('../js/animator/canvas.js');
var Assets = require('../js/animator/assets.js');


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

	var assets = Assets(window);
	assets.add('circle', 'circle.svg');
	assets.click('circle', function () { alert('Clicked'); });

	var canvas = Canvas(window);
	canvas.drawBackground();

	canvas.addDrawing('circle', {x: 50, y: 50, r: 20});
	canvas.addDrawing('rectangle', {x: 250, y: 250, w: 80, h: 40});
	canvas.paint();

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
