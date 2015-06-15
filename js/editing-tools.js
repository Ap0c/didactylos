// ----- Setup ----- //

var HEADINGS = {
	h1: '# ',
	h2: '## ',
	h3: '### ',
	h4: '#### ',
	h5: '##### ',
	h6: '###### '
};


// ----- Functions ----- //

// Inserts a snippet into the editor.
function insert (elements, snippet, updatePreview) {

	var editor = elements.editor;
	var selectStart = editor.selectionStart;
	var selectEnd = editor.selectionEnd;

	editor.value = editor.value.substring(0, selectStart) + snippet +
		editor.value.substring(selectEnd);

	editor.focus();
	updatePreview(elements.editor, elements.preview);

}

// Inserts a heading of a given (number) size into the editor.
function insertHeading (elements, heading, updatePreview) {

	var snippet = HEADINGS[heading.name];

	insert(elements, snippet, updatePreview);

}

function setupToolbar (document, elements, updatePreview) {

	var headings = document.getElementsByClassName('heading_button');

	function addHeading () {
		insertHeading(elements, this, updatePreview);
	}

	for (var i = headings.length - 1; i >= 0; i--) {
		headings[i].addEventListener('click', addHeading);
	}

}


// ----- Module Exports ----- //

module.exports = function () {

	return {
		insertHeading: insertHeading,
		setupToolbar: setupToolbar
	};

};
