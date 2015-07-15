module.exports = function Canvas (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var drawings = [];
	
	var properties = {
		width: 500,
		height: 400,
		brush: '#bb3333',
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
		ctx.fillRect(0, 0, properties.width, properties.height);

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
	function addDrawing (type, attributes) {

		if (type in drawingTypes) {

			var drawing = {
				attrs: attributes,
				draw: drawShape(type),
				changed: false
			};

			drawing.draw();
			drawings.push(drawing);

		} else {
			throw new Error(`Unexpected drawing type: ${type}`);
		}
		

	}

	// Paints the drawings onto the canvas.
	function paint () {

		drawBackground();

		ctx.fillStyle = properties.brush;

		for (var i = drawings.length - 1; i >= 0; i--) {

			var drawing = drawings[i];

			if (drawings[i].changed) {
				drawing.draw();
			}

			ctx.fill(drawing.path);

		}

	}

	// Retrieves a list of the different types of drawing.
	function getTypes () {
		return Object.keys(drawingTypes);
	}

	// Initialises the canvas object.
	function init () {

		properties.width = canvas.width;
		properties.height = canvas.height;

	}


	// ----- Constructor ----- //

	init();

	return {
		drawBackground: drawBackground,
		addDrawing: addDrawing,
		paint: paint,
		drawingTypes: getTypes
	};

};
