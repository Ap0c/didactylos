// ----- Requires ----- //

var gui = require('nw.gui');

var Menus = require('../js/menus.js');
var Canvas = require('../js/animator/canvas.js');
var Assets = require('../js/animator/assets.js');

var dragging = require('../js/animator/dragging.js');


// ----- Setup ----- //

var assetDefaults = {
	circle: {x: 250, y: 200, r: 20},
	rectangle: {x: 225, y: 180, w: 50, h: 40}
};


// ----- Functions ----- //

// Builds the animator menubar.
function buildMenubar () {

	var menus = Menus(gui);
	menus.macMenu();

}

// Returns a function that inserts a specified asset into the canvas.
function insertAsset (canvas, asset, attrs) {

	return function insert () {
		canvas.addDrawing(asset, attrs);
		canvas.paint();
	};

}

// Sets up the insertion of assets into the canvas.
function assertInsertion (canvas, assets) {

	for (var asset in assetDefaults) {
		assets.click(asset, insertAsset(canvas, asset, assetDefaults[asset]));
	}

}

// Sets up various components of the animator.
function setup () {

	window.focus();
	// buildMenubar();

	var assets = Assets(window);
	var canvas = Canvas(window);

	canvas.drawBackground();
	assets.build(canvas.drawingTypes());
	assertInsertion(canvas, assets);
	dragging.setup(canvas);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
