// ----- Requires ----- //

var fs = require('fs');
var path = require('path');


// ----- Export ----- //

module.exports = function File (window, editor) {

	// ----- Internal Properties ----- //

	var filepath = null;


	// ----- Functions ----- //

	// Obtains an array of project files and passes it to the callback.
	function projectFiles (projectPath, callback) {

		fs.readdir(projectPath, onlyFiles);

		function onlyFiles (directoryContents) {

			var files = directoryContents.filter(function (file) {

				var fullPath = path.join(projectPath, file);
				var isFile = !fs.statSync(fullPath).isDirectory();
				var notDotfile = file[0] !== '.';
				return isFile && notDotfile;

			});

			callback(files);

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

		var data = editor.getContent();
		fs.writeFile(filepath, data);

	}

	// ----- Constructor ----- //

	var files = {
		open: open,
		save: save,
		projectFiles: projectFiles
	};

	return files;

};
