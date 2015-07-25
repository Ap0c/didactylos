exports.items = function items (gui, file) {

	// ----- Menu Items ----- //

	var newFile = {
		label: 'New',
		key: 'n',
		modifiers: 'cmd',
		click: file.newFile
	};

	var saveFile = {
		label: 'Save',
		key: 's',
		modifiers: 'cmd',
		click: file.save
	};

	var newAnimation = {
		label: 'New Animation',
		key: 'd',
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
