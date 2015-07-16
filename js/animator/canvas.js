module.exports = function Canvas (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var drawings = [];
	
	var properties = {
		brush: '#005c8a',
		background: '#ffffff'
	};
	var drawingTypes = {
		circle: drawCircle,
		rectangle: drawRect
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

	// Adds a circle to a shape path.
	function drawCircle (shape, props) {
		shape.arc(props.x, props.y, props.r, 0, Math.PI*2, false);
	}

	// Adds a rectangle to a shape path.
	function drawRect (shape, props) {
		shape.rect(props.x, props.y, props.w, props.h);
	}

	// Returns a function that generates a path for the specified shape.
	function drawShape (type) {

		return function draw () {

			var props = this.attrs;

			var shape = new window.Path2D();
			drawingTypes[type](shape, props);

			this.path = shape;

		};

	}

	// Adds a drawing to the drawings on the canvas.
	function addDrawing (type, attributes, method) {

		if (type in drawingTypes) {

			var drawing = {
				attrs: attributes,
				draw: drawShape(type),
				changed: false,
				method: method ? method : 'fill'
			};

			drawing.draw();
			drawings.push(drawing);

		} else {
			throw new Error(`Unexpected drawing type: ${type}`);
		}
		

	}

	// Applies the brush colour and draw style (fill or stroke);
	function paintDrawing (drawing) {

		var colour = drawing.attrs.colour;

		ctx.fillStyle = colour ? colour : properties.brush;

		if (drawing.method === 'fill') {
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

			if (drawings[i].changed) {
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

	// Retrieves a list of the different types of drawing.
	function getTypes () {
		return Object.keys(drawingTypes);
	}

	// Returns information about the position of the canvas on the page.
	function getPosition () {
		return canvas.getBoundingClientRect();
	}

	// Returns the dimensions of the canvas context.
	function getDimensions () {
		return { width: canvas.width, height: canvas.height };
	}

	// Returns the attributes of a drawing.
	function getDrawing (number) {
		return drawings[number].attrs;
	}

	// Sets the attributes of a drawing.
	function setDrawing (number, attributes) {

		for (var attr in attributes) {
			drawings[number].attrs[attr] = attributes[attr];
		}

		drawings[number].changed = true;

	}

	// Checks if a point is within a drawing.
	function inDrawing (number, x, y) {
		return ctx.isPointInPath(drawings[number].path, x, y);
	}

	// Returns the number of drawings on the canvas.
	function noDrawings () {
		return drawings.length;
	}


	// ----- Constructor ----- //

	return {
		drawBackground: drawBackground,
		addDrawing: addDrawing,
		paint: paint,
		listen: listen,
		ignore: ignore,
		drawingTypes: getTypes,
		position: getPosition,
		dimensions: getDimensions,
		getDrawing: getDrawing,
		setDrawing: setDrawing,
		inDrawing: inDrawing,
		drawings: noDrawings
	};

};
