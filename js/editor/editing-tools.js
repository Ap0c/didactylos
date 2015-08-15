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
		toolbar.action(heading, addHeading);
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
		toolbar.action(item, insertSyntax(syntaxPiece, editor));
	}

}

// Sets up handling of tab key.
function setupTab (editor) {

	editor.keyDown(onTab);

	function onTab (keyEvent) {

		if (keyEvent.keyCode === 9) {

			var selection = editor.getSelection();

			insert('    ', '', editor);
			editor.setSelection(selection);
			moveCaret(-4, editor);

			keyEvent.preventDefault();

		}

	}

}

// Formats a link to make sure that it is web compatible.
function formatLink (link) {

	if (link.substr(0, 4) !== 'http') {
		link = 'https://' + link;
	}

	return link;

}

// Inserts a link into the editor.
function insertLink (editor, linkText) {

	var linkSyntax = {
		before: '[label',
		after: `](${linkText})`,
		caretMove: null
	};

	insertSyntax(linkSyntax, editor)();

}

// Sets up the overlays that handle link insertion.
function linkOverlays (toolbar, editor, project) {

	toolbar.setupOverlay('link_type', linkChoice, editor.focus);
	toolbar.setupOverlay('file_link', insertFile, editor.focus);
	toolbar.setupOverlay('web_link', insertWeb, editor.focus);

	function linkChoice (isWebLink) {

		if (isWebLink) {
			toolbar.overlay('web_link');
		} else {
			toolbar.updateFiles(project.files());
			toolbar.overlay('file_link');
		}

	}

	function insertFile (filename) {
		insertLink(editor, `file:${filename}`);
	}

	function insertWeb (link) {
		insertLink(editor, formatLink(link));
	}

}

function setupAnimation (toolbar, editor, project) {

	toolbar.setupOverlay('animation_insert', insertAnimation, editor.focus);

	function insertAnimation (animName) {
		insertLink(editor, `animation:${animName}`);
	}

	toolbar.action('animation', function insertAnim () {
		toolbar.updateAnimations(project.animations());
		toolbar.overlay('animation_insert');
	});

}

// Sets up handling of link insertion.
function setupLink (toolbar, editor, project) {

	linkOverlays(toolbar, editor, project);

	toolbar.action('link', function insertLink () {
		toolbar.overlay('link_type');
	});

}

// Builds the insert toolbar.
function setup (toolbar, editor, project) {

	setupHeadings(toolbar, editor);
	setupSyntax(toolbar, editor);
	setupTab(editor);
	setupLink(toolbar, editor, project);
	setupAnimation(toolbar, editor, project);

}


// ----- Module Exports ----- //

module.exports = {
	setup: setup
};
