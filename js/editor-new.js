// ----- Requires ----- //

var marked = require('marked');


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


// ----- Export -----//

module.exports = function Editor (window) {

	// ----- Setup ----- //

	var document = window.document;


	// ----- Functions ----- //

	// Updates the preview area with rendered HTML.
	function updatePreview () {

		var content = this.editArea.value;
		this.preview.innerHTML = marked(content);

		var links = document.links;
		for (var i = links.length - 1; i >= 0; i--) {
			links[i].setAttribute('target', '_blank');
		}

	}

	// Sets up event listeners.
	function init () {

		editor.editArea.addEventListener('input', function () {
			editor.updatePreview();
		});

	}


	// ----- Constructor ----- //

	var editor = {

		doc: document,
		win: window,
		editArea: document.getElementById('editor_input'),
		preview: document.getElementById('preview'),
		updatePreview: updatePreview

	};

	init();


	// ----- Return ----- //

	return editor;

};
