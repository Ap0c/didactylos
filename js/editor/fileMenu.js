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


	// ----- Return ----- //

	return [newFile, saveFile];

};
