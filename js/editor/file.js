// ----- Requires ----- //

var fs = require('fs');
var path = require('path');


// ----- Export ----- //

module.exports = function File (editor, sidebar) {

	// ----- Internal Properties ----- //

	var filepath = null;


	// ----- Functions ----- //

	// Obtains an array of project files and passes it to the callback.
	function projectFiles (projectPath, callback) {

		fs.readdir(projectPath, onlyFiles);

		function onlyFiles (err, directoryContents) {

			var files = directoryContents.filter(function (file) {

				var fullPath = path.join(projectPath, file);
				var isFile = !fs.statSync(fullPath).isDirectory();
				var notDotfile = file[0] !== '.';
				return isFile && notDotfile;

			});

			callback(files);

		}

	}

	// Creates a new file.
	function newFile () {

		var file = sidebar.newFile('Name Of New File:');

		if (file !== null) {

			save();
			var filename = file.name + '.md';
			filepath = path.join(file.path, filename);
			editor.setContent('');
			save();
			sidebar.addFile(filename);

		}

	}

	// Reads a file and puts its content into the editor area.
	function open (projectPath, filename) {

		filepath = path.join(projectPath, filename);

		fs.readFile(filepath, function (err, data) {
			editor.setContent(data);
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
				var filename = file.name + '.md';
				filepath = path.join(file.path, filename);
				save();
				sidebar.addFile(filename);
			}

		}

	}


	// ----- Constructor ----- //

	var files = {
		newFile: newFile,
		open: open,
		save: save,
		projectFiles: projectFiles
	};

	return files;

};
