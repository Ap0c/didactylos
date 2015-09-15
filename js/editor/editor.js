/* Object to handle the editor part of the editor window, which is comprised of
the Markdown editing area on the left and the HTML preview on the right.
*/

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
	var renderer = new marked.Renderer();


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

	// Updates the preview area with rendered HTML and equations.
	function updatePreview () {

		var content = editArea.value;
		preview.innerHTML = marked(content, { renderer: renderer });

		window.renderMathInElement(preview, {
			delimiters: [
				{left: "$$", right: "$$", display: true},
				{left: "$", right: "$", display: false}
			]
		});

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

		renderer.link = linkRenderer;

		editArea.addEventListener('input', updatePreview);

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
