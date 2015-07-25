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
function inDrawing (canvas, drawings, coords) {

	for (var i = drawings.number - 1; i >= 0; i--) {

		var drawing = drawings.get(i);

		if (canvas.pointInside(drawing, coords.x, coords.y)) {

			DRAGGING = true;

			var cursorDx = coords.x - drawing.x;
			var cursorDy = coords.y - drawing.y;
			var dragFunction = drag(canvas, drawing, cursorDx, cursorDy);

			canvas.listen('mousemove', dragFunction);
			return dragFunction;

		}

	}

	return null;

}

// Returns function that updates the drawing position as it is dragged.
function drag (canvas, drawing, cursorDx, cursorDy) {

	return function updateDrag (cursor) {

		var coords = clickCoords(canvas, cursor);

		drawing.x = coords.x - cursorDx;
		drawing.y = coords.y - cursorDy;

		canvas.paint();

	};

}

// Sets up the user's ability to drag drawings.
function setupDrag (canvas, drawings) {

	var dragFunction = function () { return; };

	canvas.listen('mousedown', function (downEvent) {

		var coords = clickCoords(canvas, downEvent);
		var moveFunction = inDrawing(canvas, drawings, coords);
		dragFunction = moveFunction ? moveFunction : dragFunction;

	});

	canvas.listen('mouseup', function cancelDrag (upEvent) {

		if (DRAGGING) {
			DRAGGING = false;
			canvas.ignore('mousemove', dragFunction);
		}

	});

}


// ----- Module Exports ----- //

module.exports = {
	setup: setupDrag
};
