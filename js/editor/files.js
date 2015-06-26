// ----- Requires ----- //

var fs = require('fs');


// ----- Export ----- //

module.exports = function File (window, editor) {

	// ----- Internal Properties ----- //

	var filepath = null;


	// ----- Functions ----- //

	// Reads a file and puts its content into the editor area.
	function open (openPath) {

		

	}

	// Saves the current file.
	function save (savePath) {

		var data = editor.getContent();
		fs.writeFile(filepath, data);

	}

};
