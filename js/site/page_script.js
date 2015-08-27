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

// Paints a shape onto the canvas.
function drawShape (ctx, drawing, colour) {

	var path = getPath(drawing);

	if (drawing.brush === 'fill') {

		ctx.fillStyle = colour ? colour : defaultColour;
		ctx.fill(path);

	} else {

		ctx.strokeStyle = colour ? colour : defaultColour;
		ctx.stroke(path);

	}

}

// Paints text onto the canvas.
function drawText (ctx, drawing, colour) {

	ctx.font = drawing.font + 'px sans-serif';

	if (drawing.brush === 'fill') {

		ctx.fillStyle = colour ? colour : defaultColour;
		ctx.fillText(drawing.desc, drawing.x, drawing.y);

	} else {

		ctx.strokeStyle = colour ? colour : defaultColour;
		ctx.strokeText(drawing.desc, drawing.x, drawing.y);

	}

}

// Applies the brush colour and draw style (fill or stroke).
function paintDrawing (ctx, drawing) {

	var colour = drawing.colour;

	if (drawing.type === 'textbox') {
		drawText(ctx, drawing, colour);
	} else {
		drawShape(ctx, drawing, colour);
	}

}

// Paints the drawings onto the canvas.
function paint (ctx, drawingData) {

	var drawings = drawingData.drawings;

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

// Renders the Katex maths on the page.
function renderMaths () {

	var content = document.getElementById('content');

	renderMathInElement(content, {
		delimiters: [
			{left: "$$", right: "$$", display: true},
			{left: "$", right: "$", display: false}
		]
	});

}

// Sets up the canvas objects.
function setup () {

	for (var canvas in canvases) {
		drawCanvas(canvas);
	}

	renderMaths();

}


// ----- DOM Loaded ----- //

window.addEventListener('DOMContentLoaded', setup);
