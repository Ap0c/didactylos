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

	var currentContent = editor.getContent();
	var selection = editor.getSelection();

	var newContent = currentContent.substring(0, selection.start) + snippet +
		currentContent.substring(selection.end);

	editor.setContent(newContent);
	editor.focus();

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
			var selection = editor.getSelection();
			selection.start -= caretMove;
			selection.end -= caretMove;
			editor.setSelection(selection);
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
