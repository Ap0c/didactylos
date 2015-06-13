// ----- Requires ----- //

var marked = require('marked');
var fs = require('fs');


// ----- Setup ----- //

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

var updatePreview = function (input) {

	var content = input.value;
	var preview = document.getElementById('preview');

	preview.innerHTML = marked(content);

};

var openFile = function (fileInput, editorContent) {

	var filepath = fileInput.value;
	fileInput.value = '';

	fs.readFile(filepath, function (err, data) {
		editorContent.value = data;
		updatePreview(editorContent);
	});

};

var editorSetup = function () {

	var editorInput = document.getElementById('editor_input');
	var fileInput = document.getElementById('file_open');

	editorInput.addEventListener('input', function () {
		updatePreview(editorInput);
	});

	fileInput.addEventListener('change', function () {
		openFile(fileInput, editorInput);
	});

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', editorSetup);
