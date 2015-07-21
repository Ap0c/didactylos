// ----- Exports ----- //

module.exports = function drawings (Path2D) {

	// ----- Internal Properties ----- //

	var drawingTypes = {
		circle: {
			drawFunc: drawCircle,
			attribs: ['x', 'y', 'r']
		},
		rectangle: {
			drawFunc: drawRect,
			attribs: ['x', 'y', 'w', 'h']
		}
	};


	// ----- Functions ----- //

	// Returns the types of drawing.
	function getTypes () {
		return Object.keys(drawingTypes);
	}

	// Adds a circle to a shape path.
	function drawCircle (shape, attribs) {
		shape.arc(attribs.x, attribs.y, attribs.r, 0, Math.PI*2, false);
	}

	// Adds a rectangle to a shape path.
	function drawRect (shape, attribs) {
		shape.rect(attribs.x, attribs.y, attribs.w, attribs.h);
	}

	// Draws an asset according to its type.
	function draw (type, attributes) {

		var shape = new Path2D();
		drawingTypes[type].drawFunc(shape, attributes);

		return shape;

	}

	// Sets any or all of the attributes of an object.
	function setAttrs (type, currentAttrs, newAttrs) {

		var expectedAttribs = drawingTypes[type].attribs;

		for (var attr in newAttrs) {

			if (expectedAttribs.indexOf(attr) > -1) {
				currentAttrs[attr] = newAttrs[attr];
			} else {
				throw new Error(`Unexpected attribute: ${currentAttrs[i]}`);
			}

		}

	}

	// Returns an object containing the drawing's attributes.
	function getAttrs (attributes) {

		var returnAttrs = {};

		for (var attr in attributes) {
			returnAttrs[attr] = attributes[attr];
		}

		return returnAttrs;

	}

	// Checks and sets the brush type (fill or stroke);
	function setBrush (brush) {

		if (brush === 'fill' || brush === 'stroke') {
			return brush;
		} else {
			throw new Error(`Unexpected brush type: ${brush}`);
		}

	}

	// Creates a new drawing object.
	function newDrawing (type, drawingAttrs, brushType) {

		var attributes = {};
		setAttrs(type, attributes, drawingAttrs);
		var brush = brushType ? setBrush(brushType) : 'fill';
		var changed = false;
		var path = draw(type, attributes);

		return {

			get changed () { return changed; },
			get brush () { return brush; },
			get path () { return path; },
			get attributes () { return getAttrs(attributes); },
			set brush (brushType) { brush = setBrush(brushType); },

			updateAttrs (newAttrs) {
				setAttrs(type, attributes, newAttrs);
				changed = true;
			},

			draw () {
				path = draw(type, attributes);
				changed = false;
			}

		};

	}


	// ----- Drawing Object ----- //

	function Drawing (type, drawingAttrs, brushType) {

		if (type in drawingTypes) {
			return newDrawing(type, drawingAttrs, brushType);
		} else {
			throw new Error(`Unexpected drawing type: ${type}`);
		}

	}


	// ----- Constructor ----- //

	return {
		Drawing: Drawing,
		types: getTypes
	};

};
