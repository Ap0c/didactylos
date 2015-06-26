// ----- Setup ----- //

var HEADINGS = {
	h1: '# ',
	h2: '## ',
	h3: '### ',
	h4: '#### ',
	h5: '##### ',
	h6: '###### '
};

var SYNTAX = {

	bullet: { before: '- ', after: '', caretMove: null },
	italics: { before: '*', after: '*', caretMove: 1 },
	bold: { before: '**', after: '**', caretMove: 2 },
	link: { before: '[text](https://', after: ')', caretMove: 1 },
	code: { before: '```\n', after: '\n```', caretMove: 4 }

};


// ----- Functions ----- //

// Inserts a snippet into the editor.
function insert (symbolBefore, symbolAfter, editor) {

	var currentContent = editor.getContent();
	var selection = editor.getSelection();

	var contentBefore = currentContent.substring(0, selection.start);
	var contentSelected = currentContent.substring(
		selection.start, selection.end);
	var contentAfter = currentContent.substring(selection.end);

	var newContent = contentBefore + symbolBefore + contentSelected +
		symbolAfter + contentAfter;

	editor.setContent(newContent);
	editor.focus();

}

// Adds headings to content, H1 through H6.
function setupHeadings (toolbar, editor) {

	function addHeading () {
		var snippet = HEADINGS[this.name];
		insert(snippet, '', editor);
	}

	for (var heading in HEADINGS) {
		toolbar.listen(heading, 'click', addHeading);
	}

}

// Moves the editor caret position.
function moveCaret (caretMove, editor) {

	if (caretMove) {

		var selection = editor.getSelection();
		selection.start -= caretMove;
		selection.end -= caretMove;
		editor.setSelection(selection);

	}

}

// Inserts a piece of syntax and moves the caret.
function insertSyntax (syntax, editor) {

	return function () {
		insert(syntax.before, syntax.after, editor);
		moveCaret(syntax.caretMove, editor);
	};

}

// Sets up markdown syntax insertion.
function setupSyntax (toolbar, editor) {

	for (var item in SYNTAX) {
		var syntaxPiece = SYNTAX[item];
		toolbar.listen(item, 'click', insertSyntax(syntaxPiece, editor));
	}

}

// Builds the insert toolbar.
function setup (toolbar, editor) {

	setupHeadings(toolbar, editor);
	setupSyntax(toolbar, editor);

}


// ----- Module Exports ----- //

module.exports = {
	setup: setup
};