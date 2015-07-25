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

	// Adds a field to the list of fields to be appended.
	function newField (name, type) {

		var field = document.createElement('div');
		var label = document.createElement('label');
		var entry = document.createElement('input');

		label.value = name;
		label.appendChild(entry);
		field.appendChild(label);

		return field;

	}

};
