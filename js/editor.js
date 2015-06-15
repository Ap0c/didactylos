// ----- Requires ----- //

var marked = require('marked');
var fs = require('fs');
var tools = require('../js/editing-tools.js');

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


// ----- The Editor ----- //

// Editor object to hold commonly needed methods and properties.
function Editor () {

	return {
		editArea: document.getElementById('editor_input'),
		preview: document.getElementById('preview'),
		updatePreview: updatePreview
	};

	// Updates the preview area with rendered HTML.
	function updatePreview () {
		var content = this.editArea.value;
		this.preview.innerHTML = marked(content);
	}

}


// ----- Functions ----- //

// Reads a file and puts its content into the editor area.
var openFile = function (fileOpen, editor) {

	var filepath = fileOpen.value;
	fileOpen.files.clear();

	fs.readFile(filepath, function (err, data) {
		editor.editArea.value = data;
		editor.updatePreview();
	});

};

// Saves the contents of the editor area to disk.
var saveFile = function (fileSave, editor) {

	var filepath = fileSave.value;
	var data = editor.editArea.value;
	fileSave.files.clear();

	fs.writeFile(filepath, data);

};


// Sets up various components of the editor (e.g. file handling).
var setup = function () {

	var editor = Editor();
	var fileOpen = document.getElementById('file_open');
	var fileSave = document.getElementById('file_save');

	editor.editArea.addEventListener('input', function () {
		editor.updatePreview();
	});

	fileOpen.addEventListener('change', function () {
		openFile(fileOpen, editor);
	});

	fileSave.addEventListener('change', function () {
		saveFile(fileSave, editor);
	});

	tools.setupToolbar(document, editor);

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
