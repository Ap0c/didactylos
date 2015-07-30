// ----- Requires ----- //

var EventEmitter = require('events').EventEmitter;


// ----- Exports ----- //

module.exports = function Properties (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var properties = document.getElementById('properties');
	var fields = [];
	var propertiesObject = new EventEmitter();


	// ----- Functions ----- //

	// Removes current fields from the properties sidebar.
	function removeFields () {

		while (properties.firstChild) {
			properties.removeChild(properties.firstChild);
		}

	}

	// Returns an input field type when given a data type.
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

	// Sets the initial value of the field.
	function setValue (entry, type, value) {

		if (type === 'number' || type === 'string' || type === 'colour') {
			entry.value = value;
		} else if (type === 'boolean') {
			entry.checked = value;
		} else {
			entry.textContent = value;
		}

	}

	// Creates an input element for a property field.
	function createInput (type) {

		var entry = document.createElement('input');
		entry.type = inputType(type);

		return entry;

	}

	// Creates a select element for a property field.
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

	// Creates a label for a property field.
	function newLabel (name, entryId) {

		var label = document.createElement('label');

		label.textContent = name;
		label.for = entryId;

		return label;

	}

	// Creates a new field entry element.
	function newEntry (type, allowedValues) {

		if (type === 'static') {
			return document.createElement('span');
		} else if (allowedValues) {
			return createSelect(allowedValues);
		} else {
			return createInput(type);
		}

	}

	// Adds a field to the list of fields to be appended.
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

	// Adds the fields for a drawing to the properties sidebar.
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

	// Creates a delete button.
	function createDelete (drawing) {

		var button = document.createElement('button');
		button.textContent = 'delete';

		button.addEventListener('click', function () {
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
