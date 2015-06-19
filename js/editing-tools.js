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

	bullet: { symbol: '- ', caretMove: null },
	italics: { symbol: '**', caretMove: 1 },
	bold: { symbol: '****', caretMove: 2 },
	link: { symbol: '[text](https://)', caretMove: 1 },
	code: { symbol: '```\n\n```', caretMove: 4 }

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
function setupHeadings (toolbar, editor) {

	function addHeading () {
		var snippet = HEADINGS[this.name];
		insert(snippet, editor);
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
		insert(syntax.symbol, editor);
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
