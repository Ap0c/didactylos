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

// Creates a new copy of the asset attributes.
function cloneAttributes (attributes) {

	var newAttrs = {};

	for (var attr in attributes) {
		newAttrs[attr] = attributes[attr];
	}

	return newAttrs;

}

// Returns a function that inserts a specified asset into the canvas.
function insertAsset (canvas, asset, attrs) {

	return function insert () {
		canvas.addDrawing(asset, cloneAttributes(attrs));
		canvas.paint();
	};

}

// Sets up the insertion of assets into the canvas.
function assetInsertion (canvas, assets) {

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
	assetInsertion(canvas, assets);
	dragging.setup(canvas);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
