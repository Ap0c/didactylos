// ----- Setup ----- //

DRAGGING = false;


// ----- Functions ----- //

// Gets the canvas co-ordinates of a mouse click.
function clickCoords (canvas, cursor) {

	var canvasPos = canvas.position();
	var canvasDim = canvas.dimensions();

	var x = (cursor.pageX - canvasPos.left) *
		(canvasDim.width / canvasPos.width);
	var y = (cursor.pageY - canvasPos.top) *
		(canvasDim.height / canvasPos.height);

	return { x: x, y: y };

}

// Checks if the user click was inside one of the drawings.
function inDrawing (canvas, drawings, coords, callback) {

	for (var i = drawings.number - 1; i >= 0; i--) {

		var drawing = drawings.get(i);

		if (canvas.pointInside(drawing, coords.x, coords.y)) {
			return callback(drawing, canvas, coords);
		}

	}

	return null;

}

// Returns function that updates the drawing position as it is dragged.
function drag (drawing, canvas, coords) {

	DRAGGING = true;
	var cursorDx = coords.x - drawing.x;
	var cursorDy = coords.y - drawing.y;

	canvas.listen('mousemove', updateDrag);

	function updateDrag (cursor) {

		var coords = clickCoords(canvas, cursor);
		drawing.x = coords.x - cursorDx;
		drawing.y = coords.y - cursorDy;
		canvas.paint();

	}

	return updateDrag;

}

// Sets up the selection of drawings on the canvas.
function setupSelection (canvas, drawings, properties) {

	canvas.listen('click', function (clickEvent) {

		var coords = clickCoords(canvas, clickEvent);

		inDrawing(canvas, drawings, coords, updateProperties);

		function updateProperties (drawing) {

			properties.update(drawing);
			return null;

		}

	});

}

// Sets up the user's ability to drag drawings.
function setupDrag (canvas, drawings) {

	var dragFunction = function () { return; };

	canvas.listen('mousedown', function (downEvent) {

		var coords = clickCoords(canvas, downEvent);
		var moveFunction = inDrawing(canvas, drawings, coords, drag);
		dragFunction = moveFunction ? moveFunction : dragFunction;

	});

	canvas.listen('mouseup', function cancelDrag (upEvent) {

		if (DRAGGING) {
			DRAGGING = false;
			canvas.ignore('mousemove', dragFunction);
		}

	});

}

// Sets up drawing selection and dragging.
function setup (canvas, drawings, properties) {

	setupSelection(canvas, drawings, properties);
	setupDrag(canvas, drawings);

}


// ----- Module Exports ----- //

module.exports = {
	setup: setup
};
