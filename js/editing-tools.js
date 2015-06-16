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

// Adds heading buttons.
function addHeadings (document, editor) {

	var headingButtons = document.getElementsByClassName('heading_button');

	function addHeading () {
		var snippet = HEADINGS[this.name];
		insert(snippet, editor);
	}

	for (var i = headingButtons.length - 1; i >= 0; i--) {
		headingButtons[i].addEventListener('click', addHeading);
	}

}

// Adds bullet point button.
function addBullets (document, editor) {

	var bulletButton = document.getElementById('bullet_insert');

	bulletButton.addEventListener('click', function () {
		insert('- ', editor);
	});

}

// Builds the insert toolbar.
function setupToolbar (document, editor) {

	addHeadings(document, editor);
	addBullets(document, editor);

}


// ----- Module Exports ----- //

module.exports = {

	insertHeading: insertHeading,
	setupToolbar: setupToolbar

};
