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
	function entryType (type) {

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
	function entryValue (entry, type, value) {

		if (type === 'number' || type === 'string' || type === 'colour') {
			entry.value = value;
		} else if (type === 'boolean') {
			entry.checked = value;
		}

	}

	// Adds a field to the list of fields to be appended.
	function newField (name, type, value) {

		var field = document.createElement('div');
		var label = document.createElement('label');
		var entry = document.createElement('input');

		var entryId = `property_${name}`;

		label.textContent = name;
		label.for = entryId;
		entry.type = entryType(type);
		entry.id = entryId;
		entry.name = name;
		entryValue(entry, type, value);
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

				var field = newField(attr, drawing.type(attr), drawing[attr]);
				fieldSet.appendChild(field);

			}

		}

		return fieldSet;

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
