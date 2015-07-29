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

	// Retrieves the project path.
	function getPath () {
		return info.path;
	}

	// Retrieves the animation directory path.
	function animationPath () {
		return info.animPath;
	}

	// Retrieves the project markdown files.
	function getFiles () {
		return Object.keys(info.files);
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

	// Removes a file from the list of files.
	function deleteFile (name) {

		delete info.files[name];
		syncInfo();

	}

	// Returns true if a file already exists, false if not.
	function fileExists (name) {
		return info.files[name] ? true : false;
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

	// Retrieves the project animation files.
	function getAnimations () {
		return Object.keys(info.animations);
	}

	// Returns the filename of a animation.
	function getAnimation (name) {
		return info.animations[name].filename;
	}

	// Adds an animation to the list of animations.
	function addAnimation (name, filename) {

		info.animations[name] = {
			filename: filename
		};

		syncInfo();

	}

	// Removes an animation from the list of animations.
	function deleteAnimation (name) {

		delete info.animations[name];
		syncInfo();

	}

	// Returns true if an animation already exists, false if not.
	function animationExists (name) {
		return info.animations[name] ? true : false;
	}

	// Parses the project information into an object.
	function init () {

		info = JSON.parse(projectJson);
		infoFile = path.join(info.path, 'didactylos.json');

	}


	// ----- Constructor ----- //

	init();

	return {
		path: getPath,
		animationPath: animationPath,
		files: getFiles,
		file: getFile,
		addFile: addFile,
		deleteFile: deleteFile,
		fileExists: fileExists,
		updateStyle: updateStyle,
		styles: getStyles,
		animations: getAnimations,
		animation: getAnimation,
		addAnimation: addAnimation,
		deleteAnimation: deleteAnimation,
		animationExists: animationExists
	};

};
