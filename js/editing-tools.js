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
function insertHeading (elements, size) {

	var snippet = '';

	switch (size) {
		case 1:
			snippet = '# ';
			break;
		case 2:
			snippet = '## ';
			break;
		case 3:
			snippet = '### ';
			break;
		case 4:
			snippet = '#### ';
			break;
		case 5:
			snippet = '##### ';
			break;
		case 6:
			snippet = '###### ';
	}

	insert(elements, snippet);

}


// ----- Module Exports ----- //

module.exports = function () {
	return {
		insertHeading: insertHeading
	};
};
