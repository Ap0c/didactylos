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
		circle: drawCircle
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

	// Creates a 2D path containing a circle.
	function drawCircle () {

		var props = this.attrs;

		var circle = new window.Path2D();
		circle.arc(props.x, props.y, props.r, 0, Math.PI*2, false);

		this.path = circle;

	}

	// Adds a drawing to the drawings on the canvas.
	function addDrawing (type, attributes) {

		if (type in drawingTypes) {

			var drawFunction = drawingTypes[type];

			var drawing = {
				attrs: attributes,
				draw: drawFunction,
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

		ctx.fillStyle = properties.brush;

		for (var i = drawings.length - 1; i >= 0; i--) {

			var drawing = drawings[i];

			if (drawings[i].changed) {
				drawing.draw();
			}

			ctx.fill(drawing.path);

		}

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
		paint: paint
	};

};
