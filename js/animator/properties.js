/* Object to handle the animator window's properties sidebar. */

// ----- Requires ----- //

var EventEmitter = require('events').EventEmitter;


// ----- Exports ----- //

module.exports = function Properties (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var properties = document.getElementById('properties');

	// Stores the fields in the sidebar that correspond to drawing attributes.
	var fields = [];
	var propertiesObject = new EventEmitter();


	// ----- Functions ----- //

	// Removes current fields from the properties sidebar.
	function removeFields () {

		while (properties.firstChild) {
			properties.removeChild(properties.firstChild);
		}

	}

	// Returns an HTML form input field type when given a data type.
	function inputType (type) {

		switch (type) {
			case 'number':
				return 'number';
			case 'string':
				return 'text';
			case 'colour':
				return 'color';
			case 'boolean':
				return 'checkbox';
			default:
				throw new Error(`Unrecognised data type: ${type}.`);
		}		

	}

	// Sets the initial value of an input field.
	function setValue (entry, type, value) {

		if (type === 'number' || type === 'string' || type === 'colour') {
			entry.value = value;
		} else if (type === 'boolean') {
			entry.checked = value;
		} else {
			entry.textContent = value;
		}

	}

	// Creates an input element for a drawing attribute.
	function createInput (type) {

		var entry = document.createElement('input');
		entry.type = inputType(type);

		return entry;

	}

	// Creates a select element for a drawing attribute.
	function createSelect (allowedValues) {

		var entry = document.createElement('select');

		for (var i = 0, noValues = allowedValues.length; i < noValues; i++) {

			var option = document.createElement('option');
			option.value = allowedValues[i];
			option.label = allowedValues[i];
			entry.add(option);

		}

		return entry;

	}

	// Creates a label for a drawing attribute.
	function newLabel (name, entryId) {

		var label = document.createElement('label');

		label.textContent = name;
		label.for = entryId;

		return label;

	}

	// Creates a new user input for an attribute, or a span to hold static text.
	function newEntry (type, allowedValues) {

		if (type === 'static') {
			return document.createElement('span');
		} else if (allowedValues) {
			return createSelect(allowedValues);
		} else {
			return createInput(type);
		}

	}

	// Adds a new field to the list of drawing attributes.
	function newField (name, type, value, allowedValues) {

		var field = document.createElement('div');
		var entryId = `property_${name}`;
		var label = newLabel(name, entryId);
		var entry = newEntry(type, allowedValues);

		entry.id = entryId;
		entry.name = name;
		setValue(entry, type, value);
		fields.push(entry);

		field.appendChild(label);
		field.appendChild(entry);

		return field;

	}

	// Adds the attributes for a drawing to the properties sidebar.
	function addFields (drawing) {

		var fieldSet = document.createDocumentFragment();

		for (var attr in drawing) {

			if (Object.getOwnPropertyDescriptor(drawing, attr).set) {

				var field = newField(attr, drawing.attrType(attr),
					drawing[attr], drawing.allowedValues(attr));
				fieldSet.appendChild(field);

			}

		}

		return fieldSet;

	}

	// Creates buttons to move drawings up and down in the drawing list.
	function depthButtons (drawing) {

		var container = document.createElement('div');
		var up = document.createElement('button');
		var down = document.createElement('button');

		up.textContent = 'Up';
		down.textContent = 'Down';

		up.addEventListener('click', function drawingUp () {
			propertiesObject.emit('moveDrawing', drawing, 'up');
		});

		down.addEventListener('click', function drawingDown () {
			propertiesObject.emit('moveDrawing', drawing, 'down');
		});

		container.appendChild(up);
		container.appendChild(down);

		return container;

	}

	// Creates a button to delete a drawing from the canvas.
	function createDelete (drawing) {

		var button = document.createElement('button');
		button.textContent = 'delete';

		button.addEventListener('click', function clickDelete () {
			propertiesObject.emit('deleteDrawing', drawing);
			removeFields();
		});

		return button;

	}

	// Creates a function that emits a change event on the properties object.
	function changeListener (field, drawing) {

		var fieldInfo = {
			name: field.name
		};

		return function fieldChange () {

			fieldInfo.value = field.type === 'checkbox' ?
				field.checked :
				field.value;
			propertiesObject.emit('fieldChange', fieldInfo, drawing);

		};

	}

	// Updates the properties sidebar to display the currently selected drawing.
	function update (drawing) {

		removeFields();

		var newFields = addFields(drawing);
		var deleteButton = createDelete(drawing);
		var depthControls = depthButtons(drawing);

		newFields.appendChild(depthControls);
		newFields.appendChild(deleteButton);
		properties.appendChild(newFields);

		for (var i = fields.length - 1; i >= 0; i--) {
			fields[i].addEventListener('change', changeListener(fields[i],
				drawing));
		}

	}


	// ----- Constructor ----- //

	propertiesObject.update = update;
	return propertiesObject;

};
