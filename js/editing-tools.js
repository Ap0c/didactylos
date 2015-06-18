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

// Adds headings to content, H1 through H6.
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

// Sets up a toolbar button, inserts corresponding snippet into the content.
// E.g. the bullet button will insert '- ', a bullet point.
function setupButton (document, editor, buttonName, snippet, caretMove) {

	var button = document.getElementById(buttonName + '_insert');

	button.addEventListener('click', function () {

		insert(snippet, editor);

		if (caretMove) {
			editor.editArea.selectionStart -= caretMove;
			editor.editArea.selectionEnd -= caretMove;
		}

	});

}

// Builds the insert toolbar.
function setupToolbar (document, editor) {

	addHeadings(document, editor);

	setupButton(document, editor, 'bullet', '- ');
	setupButton(document, editor, 'italics', '**', 1);
	setupButton(document, editor, 'bold', '****', 2);
	setupButton(document, editor, 'link', '[text](https://)', 1);
	setupButton(document, editor, 'code', '```\n\n```', 4);

}


// ----- Module Exports ----- //

module.exports = {

	setupToolbar: setupToolbar

};