// ----- Requires ----- //

var gui = require('nw.gui');

var Menus = require('../js/menus.js');
var drawings = require('../js/animator/drawings.js')(window.Path2D);
var Canvas = require('../js/animator/canvas.js');
var Assets = require('../js/animator/assets.js');

var dragging = require('../js/animator/dragging.js');


// ----- Setup ----- //

var drawingTypes = {
	circle: drawings.Circle,
	rectangle: drawings.Rectangle
};

var drawingCounter = 0;


// ----- Functions ----- //

// Builds the animator menubar.
function buildMenubar () {

	var menus = Menus(gui);
	menus.macMenu();

}

function insert (draw, drawingList, canvas) {

	return function insertDrawing () {

		var name = `drawing${drawingCounter}`;
		drawingCounter++;

		var drawing = draw({name: name});
		drawingList.add(drawing);

		canvas.paint();

	};

}

// Sets up the insertion of assets into the canvas.
function assetInsertion (drawingList, canvas, assets) {

	for (var asset in drawingTypes) {

		var insertFunction = insert(drawingTypes[asset], drawingList, canvas);
		assets.click(asset, insertFunction);

	}

}

// Sets up various components of the animator.
function setup () {

	window.focus();
	// buildMenubar();

	var assets = Assets(window);
	var drawingList = drawings.Drawings();
	var canvas = Canvas(window, drawingList);

	canvas.drawBackground();
	assets.build(drawings.types);
	assetInsertion(drawingList, canvas, assets);
	dragging.setup(canvas, drawingList);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
