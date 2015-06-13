// ----- Requires ----- //

var marked = require('marked');


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


var addListeners = function () {

	var editorInput = document.getElementById('editor_input');

	editorInput.addEventListener('input', function () {
		updatePreview(editorInput);
	});


};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', addListeners);
