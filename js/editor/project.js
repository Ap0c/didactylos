// ----- Requires ----- //

var fs = require('fs');
var path = require('path');


// ----- Export ----- //

module.exports = function Project (projectJson) {

	// ----- Internal Properties ----- //

	var info = null;
	var infoFile = null;


	// ----- Functions ----- //

	// Updates the project info json file on disk.
	function syncInfo () {
		projectJson = JSON.stringify(info, null, 4);
		fs.writeFile(infoFile, projectJson);
	}

	// Retrieves the project markdown files.
	function getFiles () {
		return Object.keys(info.files);
	}

	// Retrieves the project path.
	function getPath () {
		return info.path;
	}

	// Returns the filename of a file.
	function getFile (name) {
		return info.files[name].filename;
	}

	// Adds a file to the list of files.
	function addFile (name, filename) {

		info.files[name] = {
			filename: filename,
			styles: {}
		};

		syncInfo();

	}

	// Assigns a style to a file.
	function updateStyle (filename, style, value) {

		var file = info.files[filename];
		file.styles[style] = value;
		syncInfo();

	}

	// Retrieves the saved styles for a file.
	function getStyles (filename) {
		return info.files[filename].styles;
	}

	// Removes a file from the list of files.
	function deleteFile (name) {

		delete info.files[name];
		syncInfo();

	}

	// Returns true if a file already exists, false if not.
	function fileExists (name) {
		return info.files[name] ? true : false;
	}

	// Parses the project information into an object.
	function init () {

		info = JSON.parse(projectJson);
		infoFile = path.join(info.path, 'didactylos.json');

	}


	// ----- Constructor ----- //

	init();

	return {
		files: getFiles,
		path: getPath,
		file: getFile,
		addFile: addFile,
		updateStyle: updateStyle,
		styles: getStyles,
		deleteFile: deleteFile,
		fileExists: fileExists
	};

};
