var defaultColour = '#005c8a';


// ----- Functions ----- //

// Creates a path for the drawing.
function getPath (drawing) {

	var path = new Path2D();

	if (drawing.type === 'circle') {
		path.arc(drawing.x, drawing.y, drawing.r, 0, Math.PI*2, false);
	} else if (drawing.type === 'rectangle') {
		path.rect(drawing.x, drawing.y, drawing.w, drawing.h);
	}

	return path;

}

// Applies the brush colour and draw style (fill or stroke).
function paintDrawing (ctx, drawing) {

	var colour = drawing.colour;
	var path = getPath(drawing);

	if (drawing.brush === 'fill') {
		ctx.fillStyle = colour ? colour : defaultColour;
		ctx.fill(path);
	} else {
		ctx.strokeStyle = colour ? colour : defaultColour;
		ctx.stroke(path);
	}

}

// Paints the drawings onto the canvas.
function paint (ctx, drawings) {

	for (var i = 0, noDrawings = drawings.length; i < noDrawings; i++) {

		var drawing = drawings[i];

		if (drawing.visible) {
			paintDrawing(ctx, drawing);
		}

	}

}

// Retrieves a canvas and sets up the javascript context.
function drawCanvas (id) {

	var canvas = document.getElementById(id);
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, 500, 400);

	paint(ctx, canvases[id]);

}

// Sets up the canvas objects.
function setup () {

	for (var canvas in canvases) {
		drawCanvas(canvas);
	}

}


// ----- DOM Loaded ----- //

window.addEventListener('DOMContentLoaded', setup);
