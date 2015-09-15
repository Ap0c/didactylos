/* The main setup file for the animator, runs in the Webkit context of the
animator window, loaded by 'animator.html'. Loads in the rest of the animator
modules using Node require function and sets them up.
*/

// ----- Requires ----- //

// Node and Node-Webkit modules.
var fs = require('fs');
var gui = require('nw.gui');

// Animator modules.
var Properties = require('../js/animator/properties.js');
var Canvas = require('../js/animator/canvas.js');
var Assets = require('../js/animator/assets.js');
var drawings = require('../js/animator/drawings.js')(window.Path2D);
var selection = require('../js/animator/selection.js');


// ----- Setup ----- //

// Types of drawing in the canvas.
var drawingTypes = {
	circle: drawings.Circle,
	rectangle: drawings.Rectangle,
	textbox: drawings.Textbox
};

// Number of drawings on the canvas, and the Window object.
var drawingCounter = 0;
var animationWindow = gui.Window.get();


// ----- Functions ----- //

// Returns a function that adds a drawing to the list.
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

// Sets up listeners for events on the drawing list and properties sidebar.
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

	properties.on('moveDrawing', function moveDrawing (drawing, direction) {
		drawingList.move(drawing, direction);
	});

}

// Serialises all the drawings in the drawings list to JSON.
function serialise (drawings) {

	var drawingList = [];

	for (i = 0, len = drawings.number; i < len; i++) {

		var drawing = drawings.get(i).serialAttrs();
		drawingList.push(drawing);

	}

	var output = {
		counter: drawingCounter,
		drawings: drawingList
	};

	return JSON.stringify(output);

}

// Sets up the procedure for saving an animation to file.
function saveLoad (drawingList) {

	// Sends the drawing information via an event on the animator Window.
	animationWindow.on('saveRequest', function saveAnimation () {

		var drawingData = serialise(drawingList);
		animationWindow.emit('animationSerialised', drawingData);

	});

	// Receives drawing data via an event, loads the drawings onto the canvas.
	animationWindow.on('loadRequest', function loadAnimation (data) {

		var drawingData = JSON.parse(data);
		var drawings = drawingData.drawings;
		drawingCounter = drawingData.counter;

		for (var i = 0, noDrawings = drawings.length; i < noDrawings; i++) {
			var drawing = drawingTypes[drawings[i].type](drawings[i]);
			drawingList.add(drawing);
		}

	});

}

// Sets up the animator modules, and prepares the animator window.
function setup () {

	var drawingList = drawings.Drawings();

	// Creates sections of the window.
	var assets = Assets(window);
	var canvas = Canvas(window, drawingList);
	var properties = Properties(window);

	assets.build(drawings.types);
	assetInsertion(drawingList, assets);
	selection.setup(canvas, drawingList, properties);
	setupListeners(canvas, drawingList, properties);
	saveLoad(drawingList);

	canvas.drawBackground();
	window.focus();

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
