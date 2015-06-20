// ----- Requires ----- //

var fs = require('fs');


// ----- Export ----- //

module.exports = function File (window, editor) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var fileOpen = document.getElementById('file_open');
	var fileSave = document.getElementById('file_save');
	var filepath = null;


	// ----- Functions ----- //

	// Reads a file and puts its content into the editor area.
	function open () {

		var openPath = fileOpen.value;
		filepath = openPath;

		fileOpen.files.clear();

		fs.readFile(openPath, function (err, data) {
			editor.setContent(data);
		});

	}

	// Saves the contents of the editor area to user-specified location.
	function saveAs () {

		filepath = fileSave.value;
		fileSave.files.clear();

		save();

	}

	// Saves editor contents to disk.
	function save () {

		if (filepath) {
			var data = editor.getContent();
			fs.writeFile(filepath, data);
		} else {
			fileSave.click();
		}

	}

	// Displays the file open dialog.
	function openDialog () {
		fileOpen.click();
	}

	// Displays the file save dialog.
	function saveDialog () {
		fileSave.click();
	}

	// Sets up event listeners.
	function init () {

		fileOpen.addEventListener('change', open);
		fileSave.addEventListener('change', saveAs);

	}

	// ----- Constructor ----- //

	var file = {

		open: openDialog,
		saveAs: saveDialog,
		save: save

	};

	init();
	return file;

};
