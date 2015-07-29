// ----- Requires ----- //

var gui = require('nw.gui');

var Properties = require('../js/animator/properties.js');
var Canvas = require('../js/animator/canvas.js');
var Assets = require('../js/animator/assets.js');
var drawings = require('../js/animator/drawings.js')(window.Path2D);
var selection = require('../js/animator/selection.js');


// ----- Setup ----- //

var drawingTypes = {
	circle: drawings.Circle,
	rectangle: drawings.Rectangle
};

var drawingCounter = 0;


// ----- Functions ----- //

function insert (draw, drawingList) {

	return function insertDrawing () {

		var name = `drawing${drawingCounter}`;
		drawingCounter++;

		var drawing = draw({name: name});
		drawingList.add(drawing);

	};

}

// Sets up the insertion of assets into the canvas.
function assetInsertion (drawingList, assets) {

	for (var asset in drawingTypes) {

		var insertFunction = insert(drawingTypes[asset], drawingList);
		assets.click(asset, insertFunction);

	}

}

// Sets up event listeners on various components.
function setupListeners (canvas, drawingList, properties) {

	drawingList.on('change', function paintCanvas () {
		canvas.paint();
	});

	drawingList.on('newDrawing', function updateProperties (drawing) {
		properties.update(drawing);
	});

	properties.on('fieldChange', function updateDrawing (field, drawing) {
		drawing[field.name] = field.value;
		canvas.paint();
	});

	properties.on('deleteDrawing', function deleteDrawing (drawing) {
		drawingList.del(drawing);
	});

}

// Sets up various components of the animator.
function setup () {

	window.focus();

	var drawingList = drawings.Drawings();

	var assets = Assets(window);
	var canvas = Canvas(window, drawingList);
	var properties = Properties(window);

	assets.build(drawings.types);
	assetInsertion(drawingList, assets);
	selection.setup(canvas, drawingList, properties);

	setupListeners(canvas, drawingList, properties);
	canvas.drawBackground();

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
