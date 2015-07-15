var dragging = {
	current: false,
	moveFunction: null,
	dx: 0,
	dy: 0
};

// Gets the canvas co-ordinates of a mouse click.
function clickCoords (cursor) {

	var canvasPos = canvas.getBoundingClientRect();

	var x = (cursor.pageX - canvasPos.left) *
		(canvas.width / canvasPos.width);
	var y = (cursor.pageY - canvasPos.top) *
		(canvas.height / canvasPos.height);

	return { x: x, y: y };

}


// Checks if the user click was inside one of the drawings.
function inDrawing (coords) {

	for (var i = drawings.length - 1; i >= 0; i--) {

		if (ctx.isPointInPath(drawings[i].path, coords.x, coords.y)) {

			var drawing = drawings[i];

			dragging.dx = coords.x - drawing.attrs.x;
			dragging.dy = coords.y - drawing.attrs.y;
			dragging.current = true;
			dragging.moveFunction = drag(drawing);

			canvas.addEventListener('mousemove', dragging.moveFunction);
			return;

		}

	}

}

// Sets up the user's ability to drag drawings.
function setupDrag () {

	canvas.addEventListener('mousedown', function (downEvent) {

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

// Returns function that updates the drawing position as it is dragged.
function drag (drawing) {

	return function updateDrag (cursor) {

		var coords = clickCoords(cursor);

		drawing.attrs.x = coords.x - dragging.dx;
		drawing.attrs.y = coords.y - dragging.dy;
		drawing.changed = true;

		paint();

	};

}
