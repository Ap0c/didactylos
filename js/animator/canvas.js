// ----- Exports ----- //

module.exports = function Canvas (window) {

	// ----- Requires ----- //

	var Drawing = require('./drawings.js')(window.Path2D);


	// ----- Internal Properties ----- //

	var document = window.document;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var drawings = [];
	
	var properties = {
		brush: '#005c8a',
		background: '#ffffff'
	};


	// ----- Functions ----- //

	// Paints the canvas background, erasing current content.
	function drawBackground (colour) {

		if (colour) {
			properties.background = colour;
		}

		ctx.fillStyle = properties.background;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

	}

	// Adds a drawing to the drawings on the canvas.
	function addDrawing (type, attributes, brushType) {

		var newDrawing = Drawing.Drawing(type, attributes, brushType);
		newDrawing.pointInside = inDrawing;
		drawings.push(newDrawing);

	}

	// Applies the brush colour and draw style (fill or stroke);
	function paintDrawing (drawing) {

		var colour = drawing.attributes.colour;

		ctx.fillStyle = colour ? colour : properties.brush;

		if (drawing.brush === 'fill') {
			ctx.fill(drawing.path);
		} else {
			ctx.stroke(drawing.path);
		}

	}

	// Paints the drawings onto the canvas.
	function paint () {

		drawBackground();

		for (var i = drawings.length - 1; i >= 0; i--) {

			var drawing = drawings[i];

			if (drawing.changed) {
				drawing.draw();
			}

			paintDrawing(drawing);

		}

	}

	// Sets a callback for a specific canvas event.
	function listen (canvasEvent, callback) {
		canvas.addEventListener(canvasEvent, callback);
	}

	// Removes a callback from a specific canvas event.
	function ignore (canvasEvent, callback) {
		canvas.removeEventListener(canvasEvent, callback);
	}

	// Returns information about the position of the canvas on the page.
	function getPosition () {
		return canvas.getBoundingClientRect();
	}

	// Returns the dimensions of the canvas context.
	function getDimensions () {
		return { width: canvas.width, height: canvas.height };
	}

	// Checks if a point is within a drawing.
	function inDrawing (x, y) {
		return ctx.isPointInPath(this.path, x, y);
	}

	// Returns the drawings interface.
	function getDrawings (number) {

		if (number !== undefined) {
			return drawings[number];
		} else {
			return drawingsMethods;
		}

	}


	// ----- Drawing Object ----- //

	drawingsMethods = {
		get number () { return drawings.length; },
		get types () { return Drawing.types(); }
	};


	// ----- Constructor ----- //

	return {
		drawBackground: drawBackground,
		addDrawing: addDrawing,
		paint: paint,
		listen: listen,
		ignore: ignore,
		position: getPosition,
		dimensions: getDimensions,
		drawings: getDrawings
	};

};
