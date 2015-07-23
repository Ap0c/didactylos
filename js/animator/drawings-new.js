// ----- Exports ----- //

module.exports = function drawings (Path2D) {

	// ----- Internal Properties ----- //

	var ATTR_PROPS = {
		x: {type: 'number'},
		y: {type: 'number'},
		r: {type: 'number'},
		w: {type: 'number'},
		h: {type: 'number'},
		colour: {type: 'string'},
		name: {type: 'string'},
		visible: {type: 'boolean'},
		changed: {type: 'boolean'},
		brush: {
			type: 'string',
			allowedValues: ['fill', 'stroke']
		}
	};


	// ----- Objects ----- //

	// Creates and populates an attribute object.
	function Attribute (name, value) {

		return {
			value: value,
			type: ATTR_PROPS[name].type,
			allowedValues: ATTR_PROPS[name].allowedValues
		};

	}

	// Creates a drawing object with the default values.
	function defaultDrawing () {

		return {
			x: Attribute('x', 250),
			y: Attribute('y', 200),
			colour: Attribute('colour', '#005c8a'),
			name: Attribute('name', 'drawing'),
			visible: Attribute('visible', true),
			changed: Attribute('changed', true),
			brush: Attribute('brush', 'fill'),
			path: new Path2D()
		};

	}

	// Sets up an interface for external access to the drawing.
	function drawingInterface (drawing) {

		return {
			get x() { return drawing.x.value; },
			get y() { return drawing.y.value; },
			get colour() { return drawing.colour.value; },
			get name() { return drawing.name.value; },
			get visible() { return drawing.name.value; },
			get changed() { return drawing.changed.value; },
			get brush() { return drawing.brush.value; },
			get path() { return drawing.path; },
			set x(value) { drawing.x.value = value; },
			set y(value) { drawing.y.value = value; },
			set colour(value) { drawing.colour.value = value; },
			set name(value) { drawing.name.value = value; },
			set visible(value) { drawing.visible.value = value; },
			set brush(value) { drawing.brush.value = value; }
		};

	}

	// Creates a drawing object.
	function Drawing (attributes) {

		var drawing = defaultDrawing();

		if (attributes) {
			for (var attr in attributes) {
				drawing[attr] = Attribute(attr, attributes[attr]);
			}
		}

		drawing.interface = drawingInterface(drawing);
		return drawing;

	}

	// Adds a circle to a shape path.
	function drawCircle (shape, attribs) {
		shape.arc(attribs.x, attribs.visible, attribs.r, 0, Math.PI*2, false);
	}

	// Creates a circle drawing, using a default or specified radius.
	function Circle (attributes) {

		attributes.r = attributes.r ? attributes.r : '20';

		var circle = Drawing(attributes);

		circle.interface.draw = function drawCircle () {
			circle.arc(circle.x, circle.y, circle.r, 0, Math.PI*2, false);
			drawing.changed = true;
		};

		return circle.interface;

	}

	// Creates a rectangle drawing, using a default or specified w and h.
	function Rectangle () {

		attributes.w = attributes.w ? attributes.w : '50';
		attributes.h = attributes.h ? attributes.h : '40';
		attributes.x = attributes.x ? attributes.x : '225';
		attributes.y = attributes.y ? attributes.y : '180';

		var rectangle = Drawing(attributes);

		rectangle.interface.draw = function drawRectangle () {
			rectangle.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
			drawing.changed = true;
		};

		return rectangle.interface;

	}

	function Text () {

	}

	function Arrow () {

	}

	return {
		Drawing: Drawing,
		Circle: Circle,
		Rectangle: Rectangle
	};

};
