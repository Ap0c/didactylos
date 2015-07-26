// ----- Requires ----- //

var EventEmitter = require('events').EventEmitter;


// ----- Exports ----- //

module.exports = function drawings (Path2D) {

	// ----- Internal Properties ----- //

	var ATTR_PROPS = {
		x: {type: 'number'},
		y: {type: 'number'},
		r: {type: 'number'},
		w: {type: 'number'},
		h: {type: 'number'},
		colour: {type: 'colour'},
		name: {type: 'string'},
		visible: {type: 'boolean'},
		changed: {type: 'boolean'},
		brush: {
			type: 'string',
			allowedValues: ['fill', 'stroke']
		}
	};

	var drawingTypes = ['circle', 'rectangle'];


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
			brush: Attribute('brush', 'fill')
		};

	}

	// Updates an attribute of the drawing.
	function setAttr (drawing, attr, value) {

		drawing[attr].value = value;
		drawing.changed.value = true;

	}

	// Sets up an interface for external access to the drawing.
	function drawingInterface (drawing) {

		return {
			get x() { return drawing.x.value; },
			get y() { return drawing.y.value; },
			get colour() { return drawing.colour.value; },
			get name() { return drawing.name.value; },
			get visible() { return drawing.visible.value; },
			get changed() { return drawing.changed.value; },
			get brush() { return drawing.brush.value; },
			get path() { return drawing.path; },
			set x(value) { setAttr(drawing, 'x', value); },
			set y(value) { setAttr(drawing, 'y', value); },
			set colour(value) { setAttr(drawing, 'colour', value); },
			set name(value) { setAttr(drawing, 'name', value); },
			set visible(value) { setAttr(drawing, 'visible', value); },
			set brush(value) { setAttr(drawing, 'brush', value); },
			type (attr) { return drawing[attr].type; },
			allowedValues(attr) { return drawing[attr].allowedValues || null; }
		};

	}

	// Adds additional getters and setters for specific types of drawing.
	function updateInterface (drawing, attr) {

		if (!drawing.interface.hasOwnProperty(attr)) {

			Object.defineProperty(drawing.interface, attr, {
				get: function () { return drawing[attr].value; },
				set: function (value) { setAttr(drawing, attr, value); },
				enumerable: true
			});

		}

	}

	// Creates a drawing object, complete with interface for external access.
	function Drawing (attributes) {

		var drawing = defaultDrawing();
		drawing.interface = drawingInterface(drawing);

		if (attributes) {
			for (var attr in attributes) {
				drawing[attr] = Attribute(attr, attributes[attr]);
				updateInterface(drawing, attr);
			}
		}

		return drawing;

	}

	// Creates a function used to draw the drawing.
	function drawFunc (drawing, drawPath) {

		return function drawDrawing () {
			drawing.path = new Path2D();
			drawPath();
			drawing.changed.value = false;
		};

	}

	// Creates a circle drawing, using a default or specified radius.
	function Circle (attributes) {

		attributes = attributes ? attributes : {};
		attributes.r = attributes.r ? attributes.r : 20;

		var circle = Drawing(attributes);

		circle.interface.draw = drawFunc(circle, function drawCircle () {
			circle.path.arc(circle.x.value, circle.y.value, circle.r.value, 0,
				Math.PI*2, false);
		});

		return circle.interface;

	}

	// Creates a rectangle drawing, using a default or specified w and h.
	function Rectangle (attributes) {

		attributes = attributes ? attributes : {};
		attributes.w = attributes.w ? attributes.w : 50;
		attributes.h = attributes.h ? attributes.h : 40;
		attributes.x = attributes.x ? attributes.x : 225;
		attributes.y = attributes.y ? attributes.y : 180;

		var rectangle = Drawing(attributes);

		rectangle.interface.draw = drawFunc(rectangle, function drawRect () {
			rectangle.path.rect(rectangle.x.value, rectangle.y.value,
				rectangle.w.value, rectangle.h.value);
		});

		return rectangle.interface;

	}

	// Returns a function that retrieves a drawing from the list.
	function getDrawing (drawingList) {

		return function getFunction (id) {
			return drawingList[id] || null;
		};

	}

	// Returns a function that adds a drawing to the list.
	function addDrawing (drawings, drawingList) {

		return function addFunction (drawing) {

			drawingList.push(drawing);
			drawings.emit('newDrawing', drawing);
			drawings.emit('change');

		};

	}

	// Returns a function that deletes a drawing from the list.
	function deleteDrawing (drawings, drawingList) {

		return function deleteFunction (drawing) {

			drawingList.splice(drawingList.indexOf(drawing), 1);
			drawings.emit('change');

		};

	}

	// Object to store a list of drawings, and expose corresponding methods.
	function Drawings () {

		var drawingList = [];
		var drawings = new EventEmitter();

		drawings.get = getDrawing(drawingList);
		drawings.add = addDrawing(drawings, drawingList);
		drawings.del = deleteDrawing(drawings, drawingList);

		Object.defineProperty(drawings, 'number', {
			get: function () { return drawingList.length; },
			enumerable: true
		});

		return drawings;

	}

	function Text () {

	}

	function Arrow () {

	}

	return {
		Drawings: Drawings,
		Circle: Circle,
		Rectangle: Rectangle,
		get types() { return drawingTypes.slice(0); }
	};

};
