exports.items = function items (gui, file) {

	// ----- Menu Items ----- //

	var newFile = {
		label: 'New',
		key: 'n',
		modifiers: 'cmd',
		click: function () {
			file.newFile();
			gui.Window.get().focus();
		}
	};

	var saveFile = {
		label: 'Save',
		key: 's',
		modifiers: 'cmd',
		click: file.save
	};

	var newAnimation = {
		label: 'New Animation',
		key: 'Shift+a',
		modifiers: 'cmd',
		click: function () {

			gui.Window.open('animator.html', {
				"toolbar": true,
				"width": 1000,
				"height": 600
			});

		}
	};


	// ----- Return ----- //

	return [newFile, saveFile, { type: 'separator' }, newAnimation];

};
