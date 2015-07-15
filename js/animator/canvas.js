module.exports = function Canvas (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var drawings = [];
	var dragging = {
		current: false,
		moveFunction: null
	};

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

	// Retrieves the attributes of a drawing by id number.
	function getDrawing (number) {

		if (drawings[number]) {
			return drawings[number].attrs;
		} else {
			throw new Error(`No drawing with id: ${number}`);
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

	// Gets the canvas co-ordinates of a mouse click.
	function clickCoords (cursor) {

		var canvasPos = canvas.getBoundingClientRect();

		var x = (cursor.pageX - canvasPos.left) *
			(canvas.width / canvasPos.width);
		var y = (cursor.pageY - canvasPos.top) *
			(canvas.height / canvasPos.height);

		return { x: x, y: y };

	}

	// Returns function that updates the drawing position as it is dragged.
	function drag (drawing) {

		return function updateDrag (cursor) {

			var coords = clickCoords(cursor);
			drawing.attrs.x = coords.x;
			drawing.attrs.y = coords.y;
			drawing.changed = true;
			paint();

		};

	}

	// Checks if the user click was inside one of the drawings.
	function inDrawing (coords) {

		for (var i = drawings.length - 1; i >= 0; i--) {

			if (ctx.isPointInPath(drawings[i].path, coords.x, coords.y)) {

				dragging.current = true;
				dragging.moveFunction = drag(drawings[i]);
				canvas.addEventListener('mousemove', dragging.moveFunction);
				return;

			}

		}

	}

	// Sets up the user's ability to drag drawings.
	function setupDrag () {

		canvas.addEventListener('mousedown', function (downEvent) {

			console.log('mousedown');

			var coords = clickCoords(downEvent);
			inDrawing(coords);

		});

		canvas.addEventListener('mouseup', function cancelDrag (upEvent) {

			if (dragging.current) {
				dragging.current = false;
				canvas.removeEventListener('mousemove', dragging.moveFunction);
			}

		});

	}

	// Initialises the canvas object.
	function init () {

		properties.width = canvas.width;
		properties.height = canvas.height;

		setupDrag();

	}


	// ----- Constructor ----- //

	init();

	return {
		drawBackground: drawBackground,
		addDrawing: addDrawing,
		paint: paint
	};

};
