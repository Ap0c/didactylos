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
		return info.files;
	}

	// Retrieves the project path.
	function getPath () {
		return info.path;
	}

	// Returns the filename of a file.
	function getFile (name) {
		return info.files[name];
	}

	// Adds a file to the list of files.
	function addFile (name, filename) {
		info.files[name] = filename;
		syncInfo();
	}

	// Removes a file from the list of files.
	function deleteFile (name) {
		delete info.files[name];
		syncInfo();
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
		deleteFile: deleteFile
	};

};
