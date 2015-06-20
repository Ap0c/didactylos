exports.items = function items (gui, file) {

	var newFile = {

		label: 'New',
		key: 'n',
		modifiers: 'cmd',
		click: function () {
			gui.Window.open('editor.html', { "toolbar": false });
		}

	};

	var openFile = {
		label: 'Open...',
		key: 'o',
		modifiers: 'cmd',
		click: file.open
	};

	var saveFile = {
		label: 'Save',
		key: 's',
		modifiers: 'cmd',
		click: file.save
	};

	var saveFileAs = {
		label: 'Save As...',
		click: file.saveAs
	};

	return [newFile, openFile, saveFile, saveFileAs];

};
