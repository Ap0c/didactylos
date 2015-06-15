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
function insert (elements, snippet) {

	var editor = elements.editor;
	var selectStart = editor.selectionStart;
	var selectEnd = editor.selectionEnd;

	editor.value = editor.value.substring(0, selectStart) + snippet +
		editor.value.substring(selectEnd);

	editor.focus();

}


// Inserts a heading of a given (number) size into the editor.
function insertHeading (elements, heading) {

	var snippet = HEADINGS[heading.name];

	insert(elements, snippet);

}


// ----- Module Exports ----- //

module.exports = function () {
	return {
		insertHeading: insertHeading
	};
};
