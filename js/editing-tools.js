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

// Builds the insert toolbar.
function setupToolbar (document, editor) {

	var headingButtons = document.getElementsByClassName('heading_button');

	function addHeading () {
		insertHeading(this, editor);
	}

	for (var i = headingButtons.length - 1; i >= 0; i--) {
		headingButtons[i].addEventListener('click', addHeading);
	}

	var bulletButton = document.getElementById('bullet_insert');
	bulletButton.addEventListener('click', function () {
		insert('- ', editor);
	});

}


// ----- Module Exports ----- //

module.exports = {

	insertHeading: insertHeading,
	setupToolbar: setupToolbar

};
