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

	// Adds a file to the list of files.
	function addFile (name) {
		info.files[name] = name;
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
		getFiles: getFiles,
		addFile: addFile,
		deleteFile: deleteFile
	};

};
