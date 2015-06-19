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

	// ----- Internal Properties ----- //

	var document = window.document;
	var editArea = document.getElementById('editor_input');
	var preview = document.getElementById('preview');


	// ----- Functions ----- //

	// Updates the preview area with rendered HTML.
	function updatePreview () {

		var content = editArea.value;
		preview.innerHTML = marked(content);

		var links = document.links;
		for (var i = links.length - 1; i >= 0; i--) {
			links[i].setAttribute('target', '_blank');
		}

	}

	// Sets the contents of the editor pane.
	function setContent (newContent) {
		editArea.value = newContent;
	}

	// Gets the contents of the editor pane.
	function getContent () {
		return editArea.value;
	}

	// Gets the currently selected content.
	function getSelection () {

		var selection = {
			start: editArea.selectionStart,
			end: editArea.selectionEnd
		};

		return selection;
	}

	// Sets the selection in the textarea.
	function setSelection (selection) {
		editArea.selectionStart = selection.start;
		editArea.selectionEnd = selection.end;
	}

	// Sets the focus on the editing textarea.
	function focus () {
		editArea.focus();
	}

	// Sets up event listeners.
	function init () {

		editArea.addEventListener('input', function () {
			updatePreview();
		});

	}


	// ----- Constructor ----- //

	var editor = {

		setContent: setContent,
		getContent: getContent,
		getSelection: getSelection,
		setSelection: setSelection,
		focus: focus,
		updatePreview: updatePreview

	};

	init();

	return editor;

};
