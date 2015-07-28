// ----- Exports ----- //

module.exports = function Canvas (window, drawings) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
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

	// Applies the brush colour and draw style (fill or stroke);
	function paintDrawing (drawing) {

		var colour = drawing.colour;

		if (drawing.brush === 'fill') {
			ctx.fillStyle = colour ? colour : properties.brush;
			ctx.fill(drawing.path);
		} else {
			ctx.strokeStyle = colour ? colour : properties.brush;
			ctx.stroke(drawing.path);
		}

	}

	// Paints the drawings onto the canvas.
	function paint () {

		drawBackground();

		for (var i = 0, noDrawings = drawings.number; i < noDrawings; i++) {

			var drawing = drawings.get(i);

			if (drawing.changed) {
				drawing.draw();
			}

			if (drawing.visible) {
				paintDrawing(drawing);
			}

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
	function pointInside (drawing, x, y) {
		return ctx.isPointInPath(drawing.path, x, y);
	}


	// ----- Constructor ----- //

	return {
		drawBackground: drawBackground,
		paint: paint,
		listen: listen,
		ignore: ignore,
		position: getPosition,
		dimensions: getDimensions,
		pointInside: pointInside
	};

};
