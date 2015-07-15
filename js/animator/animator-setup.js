// ----- Requires ----- //

var gui = require('nw.gui');

var Menus = require('../js/menus.js');
var Canvas = require('../js/animator/canvas.js');
var Assets = require('../js/animator/assets.js');
// var Drawings = require('../js/animator/drawings.js');


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
	var canvas = Canvas(window);

	canvas.drawBackground();
	assets.build(canvas.drawingTypes());

	assets.click('circle', function () {
		canvas.addDrawing('circle', {x: 250, y: 200, r: 20});
		canvas.paint();
	});

	assets.click('rectangle', function () {
		canvas.addDrawing('rectangle', {x: 225, y: 180, w: 50, h: 40});
		canvas.paint();
	});

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
