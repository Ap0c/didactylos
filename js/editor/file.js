// ----- Requires ----- //

var fs = require('fs');
var path = require('path');


// ----- Export ----- //

module.exports = function File (views, project) {

	// ----- Internal Properties ----- //

	var filepath = null;
	var editor = views.editor;
	var sidebar = views.sidebar;
	var stylebar = views.stylebar;


	// ----- Functions ----- //

	// Marks the file as markdown, saves it, and updates the sidebar.
	function createFile (name) {

		var filename = name + '.md';
		filepath = path.join(project.path(), filename);

		save();

		project.addFile(name, filename);
		sidebar.addFile(name, switchFile);

	}

	// Creates a new file.
	function newFile () {

		save();
		var file = sidebar.newFile('Name Of New File:');

		if (file !== null) {

			editor.setContent('');
			createFile(file);

		}

	}

	// Reads a file and puts its content into the editor area.
	function openFile (name) {

		var filename = project.file(name);
		filepath = path.join(project.path(), filename);

		fs.readFile(filepath, function (err, data) {

			var styles = project.styles(name);

			editor.setContent(data);
			stylebar.loadStyles(styles);
			editor.focus();

		});

	}

	// Saves the current file.
	function save () {

		if (filepath !== null) {

			var data = editor.getContent();
			fs.writeFile(filepath, data);

		} else {

			var file = sidebar.newFile('Name To Save Current File:');

			if (file !== null) {
				createFile(file);
			}

		}

	}

	// Switches to specified file, saving current in process.
	function switchFile (name) {

		save();
		openFile(name);

	}


	// ----- Constructor ----- //

	var files = {
		newFile: newFile,
		open: openFile,
		save: save,
		switch: switchFile
	};

	return files;

};
