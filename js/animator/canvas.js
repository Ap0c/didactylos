/* Object to handle the animator window's central canvas area. */

// ----- Exports ----- //

module.exports = function Canvas (window, drawings) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	// Sets default properties for the canvas.
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

	// Paints text onto the canvas.
	function paintText (drawing, colour) {

		ctx.font = `${drawing.font}px sans-serif`;

		if (drawing.brush === 'fill') {

			ctx.fillStyle = colour ? colour : properties.brush;
			ctx.fillText(drawing.desc, drawing.x, drawing.y);

		} else {

			ctx.strokeStyle = colour ? colour : properties.brush;
			ctx.strokeText(drawing.desc, drawing.x, drawing.y);

		}

	}

	// Applies the brush colour and draw style (fill or stroke) to a drawing.
	function draw (drawing) {

		var colour = drawing.colour;

		if (drawing.type === 'textbox') {

			paintText(drawing, colour);

		} else if (drawing.brush === 'fill') {

			ctx.fillStyle = colour ? colour : properties.brush;
			ctx.fill(drawing.path);

		} else {

			ctx.strokeStyle = colour ? colour : properties.brush;
			ctx.stroke(drawing.path);

		}

	}

	// Adds a drawing to the canvas.
	function paintDrawing (drawing) {

		if (drawing.changed) {

			if (drawing.type === 'textbox') {
				drawing.draw(ctx.measureText(drawing.desc));
			} else {
				drawing.draw();
			}

		}

		if (drawing.visible) {
			draw(drawing);
		}

	}

	// Paints the drawings onto the canvas.
	function paint () {

		drawBackground();

		for (var i = 0, noDrawings = drawings.number; i < noDrawings; i++) {

			var drawing = drawings.get(i);
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

	// Checks if a point on the canvas is within a drawing.
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
