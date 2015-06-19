// ----- Requires ----- //

var fs = require('fs');
var Editor = require('../js/editor-new.js');
var tools = require('../js/editing-tools.js');


// ----- Functions ----- //

// Reads a file and puts its content into the editor area.
var openFile = function (fileOpen, editor) {

	var filepath = fileOpen.value;
	fileOpen.files.clear();

	fs.readFile(filepath, function (err, data) {
		editor.setContent(data);
		editor.updatePreview();
	});

};

// Saves the contents of the editor area to disk.
var saveFile = function (fileSave, editor) {

	var filepath = fileSave.value;
	var data = editor.getContent();
	fileSave.files.clear();

	fs.writeFile(filepath, data);

};


// Sets up various components of the editor (e.g. file handling).
var setup = function () {

	var editor = Editor(window);
	var fileOpen = document.getElementById('file_open');
	var fileSave = document.getElementById('file_save');

	fileOpen.addEventListener('change', function () {
		openFile(fileOpen, editor);
	});

	fileSave.addEventListener('change', function () {
		saveFile(fileSave, editor);
	});

	tools.setupToolbar(document, editor);
	editor.focus();

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
