// ----- Requires ----- //

var gui = require('nw.gui');

var Menus = require('../js/menus.js');
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

	var drawingList = drawings.Drawings();

	var assets = Assets(window);
	var canvas = Canvas(window, drawingList);
	var properties = Properties(window);

	canvas.drawBackground();
	assets.build(drawings.types);
	assetInsertion(drawingList, canvas, assets);
	selection.setup(canvas, drawingList, properties);

	drawingList.on('newDrawing', function updateProperties (drawing) {
		properties.update(drawing);
	});

	properties.on('fieldChange', function updateDrawing (field, drawing) {
		drawing[field.name] = field.value;
		canvas.paint();
	});

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
