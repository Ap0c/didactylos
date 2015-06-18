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

// Adds headings to content.
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

// Adds bullet points to content.
function addBullets (document, editor) {

	var bulletButton = document.getElementById('bullet_insert');

	bulletButton.addEventListener('click', function () {
		insert('- ', editor);
	});

}

// Adds italics to content.
function addItalics (document, editor) {

	var bulletButton = document.getElementById('italics_insert');

	bulletButton.addEventListener('click', function () {
		insert('**', editor);
		editor.editArea.selectionStart--;
		editor.editArea.selectionEnd--;
	});

}

// Adds bold to content.
function addBold (document, editor) {

	var bulletButton = document.getElementById('bold_insert');

	bulletButton.addEventListener('click', function () {
		insert('****', editor);
		editor.editArea.selectionStart -= 2;
		editor.editArea.selectionEnd -= 2;
	});

}

// Adds link to content.
function addLink (document, editor) {

	var linkButton = document.getElementById('link_insert');

	linkButton.addEventListener('click', function () {
		insert('[text](https://)', editor);
		editor.editArea.selectionStart -= 1;
		editor.editArea.selectionEnd -= 1;
	});

}

// Adds code block to content.
function addCode (document, editor) {

	var linkButton = document.getElementById('code_insert');

	linkButton.addEventListener('click', function () {
		insert('```\n\n```', editor);
		editor.editArea.selectionStart -= 4;
		editor.editArea.selectionEnd -= 4;
	});

}

// Builds the insert toolbar.
function setupToolbar (document, editor) {

	addHeadings(document, editor);
	addBullets(document, editor);
	addItalics(document, editor);
	addBold(document, editor);
	addLink(document, editor);
	addCode(document, editor);

}


// ----- Module Exports ----- //

module.exports = {

	setupToolbar: setupToolbar

};
