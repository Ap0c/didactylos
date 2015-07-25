// ----- Exports ----- //

module.exports = function Properties (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var properties = document.getElementById('properties');


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
		entryValue(entry, type, value);

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

	// Updates the properties sidebar to display the currently selected drawing.
	function update (drawing) {

		removeFields();

		var newFields = addFields(drawing);
		properties.appendChild(newFields);

	}


	// ----- Constructor ----- //

	return {
		update: update
	};

};
