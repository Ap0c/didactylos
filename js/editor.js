// ----- Requires ----- //

var marked = require('marked');
var fs = require('fs');
var tools = require('../js/editing-tools');


// ----- Setup ----- //

// Sets up the Marked markdown renderer.
marked.setOptions({
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
});


// ----- Functions ----- //

// Updates the preview area with rendered HTML.
var updatePreview = function (input) {

	var content = input.value;
	var preview = document.getElementById('preview');

	preview.innerHTML = marked(content);

};

// Reads a file and puts its content into the editor area.
var openFile = function (fileOpen, editorContent) {

	var filepath = fileOpen.value;
	fileOpen.files.clear();

	fs.readFile(filepath, function (err, data) {
		editorContent.value = data;
		updatePreview(editorContent);
	});

};

// Saves the contents of the editor area to disk.
var saveFile = function (fileSave, editorContent) {

	var filepath = fileSave.value;
	var data = editorContent.value;
	fileSave.files.clear();

	fs.writeFile(filepath, data);

};

// Sets up various components of the editor (e.g. file handling).
var editorSetup = function () {

	var editorInput = document.getElementById('editor_input');
	var fileOpen = document.getElementById('file_open');
	var fileSave = document.getElementById('file_save');

	editorInput.addEventListener('input', function () {
		updatePreview(editorInput);
	});

	fileOpen.addEventListener('change', function () {
		openFile(fileOpen, editorInput);
	});

	fileSave.addEventListener('change', function () {
		saveFile(fileSave, editorInput);
	});

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', editorSetup);
