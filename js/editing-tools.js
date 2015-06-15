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
function insert (snippet, editor) {

	var editArea = editor.editArea;
	var selectStart = editArea.selectionStart;
	var selectEnd = editArea.selectionEnd;

	editArea.value = editArea.value.substring(0, selectStart) + snippet +
		editArea.value.substring(selectEnd);

	editArea.focus();
	editor.updatePreview();

}

// Inserts a heading of a given (number) size into the editor.
function insertHeading (heading, editor) {

	var snippet = HEADINGS[heading.name];

	insert(snippet, editor);

}

function setupToolbar (document, editor) {

	var headings = document.getElementsByClassName('heading_button');

	function addHeading () {
		insertHeading(this, editor);
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
