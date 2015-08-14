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

	// Custom renderer for links, including local links and animations.
	function linkRenderer (href, title, text) {

		if (href.substring(0, 5) === 'file:') {

			return `${text}(link: ${href.substring(5)})`;

		} else if (href.substring(0, 10) === 'animation:') {

			return `<div class="anim">Animation: ${href.substring(10)}</div>`;

		}

		return `<a href="${href}" target="_blank">${text}</a>`;

	}

	// Updates the preview area with rendered HTML.
	function updatePreview () {

		var content = editArea.value;
		var renderer = new marked.Renderer();

		renderer.link = linkRenderer;
		preview.innerHTML = marked(content, { renderer: renderer });

	}

	// Sets the contents of the editor pane.
	function setContent (newContent) {
		editArea.value = newContent;
		updatePreview();
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

	// Listens for a keydown event.
	function keyDown (callback) {
		editArea.addEventListener('keydown', function (keyEvent) {
			callback(keyEvent);
		});
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
		keyDown: keyDown,
		focus: focus,
		updatePreview: updatePreview

	};

	init();
	return editor;

};
