// ----- Exports ----- //

module.exports = function Properties (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var properties = document.getElementById('properties');
	var update = new Event('update');

	var fieldTypes = {
		number: {
			element: 'input',
			attributes: {
				min: 0,
				type: 'number'
			}
		},
		colour: {
			element: 'input',
			attributes: {
				type: 'color'
			}
		}
	};


	// ----- Functions ----- //

	// Creates a label for a field.
	function addLabel (id, name) {

		var label = document.createElement('label');
		label.for = id;
		label.value = name;

		return label;

	}

	// Creates a field for a property.
	function addField (info, number) {

		if (fieldTypes.hasOwnProperty(info.type)) {

			var field = fieldTypes[info.type];
			var newElement = document.createElement(field.element);
			var label = addLabel(`property${number}`, info.name);

			for (var attr in field.attributes) {
				newElement[attr] = field.attributes[attr];
			}

			return [label, field];

		} else {
			throw new Error(`Unexpected field type: ${info.type}.`);
		}

	}

	// Adds fields to the properties sidebar.
	function addFields (fieldList) {

		var noFields = fieldList.length;

		for (var i = 0; i < noFields; i++) {
			addField(fieldList[i], i);
		}

	}

	function onUpdate (callback) {

		properties.addEventListener('update', handleUpdate);

		function handleUpdate () {

		}

	}

};
