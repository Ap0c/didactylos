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
var updatePreview = function (editor, preview) {

	var content = editor.value;
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

	var ELEMENTS = {
		editor: document.getElementById('editor_input'),
		preview: document.getElementById('preview'),
		fileOpen: document.getElementById('file_open'),
		fileSave: document.getElementById('file_save')
	};

	ELEMENTS.editor.addEventListener('input', function () {
		updatePreview(ELEMENTS.editor, ELEMENTS.preview);
	});

	ELEMENTS.fileOpen.addEventListener('change', function () {
		openFile(ELEMENTS.fileOpen, ELEMENTS.editor);
	});

	ELEMENTS.fileSave.addEventListener('change', function () {
		saveFile(ELEMENTS.fileSave, ELEMENTS.editor);
	});

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', editorSetup);
