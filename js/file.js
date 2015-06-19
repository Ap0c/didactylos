// ----- Requires ----- //

var fs = require('fs');


// ----- Export ----- //

module.exports = function File (window, editor) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var fileOpen = document.getElementById('file_open');
	var fileSave = document.getElementById('file_save');


	// ----- Functions ----- //

	// Reads a file and puts its content into the editor area.
	var openFile = function () {

		var filepath = fileOpen.value;
		fileOpen.files.clear();

		fs.readFile(filepath, function (err, data) {
			editor.setContent(data);
		});

	};

	// Saves the contents of the editor area to disk.
	var saveFile = function () {

		var filepath = fileSave.value;
		var data = editor.getContent();
		fileSave.files.clear();

		fs.writeFile(filepath, data);

	};

	// Sets up event listeners.
	function init () {

		fileOpen.addEventListener('change', openFile);
		fileSave.addEventListener('change', saveFile);

	}

	// ----- Constructor ----- //

	var file = {

		openFile: openFile,
		saveFile: saveFile

	};

	init();
	return file;

};
