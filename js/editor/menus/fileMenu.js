/* Creates a list of menu items for the File menu, including keyboard shortcuts.
Whenever a click is registered, a click event is created with the name of the
menu item.
*/

exports.items = function items (clickEvent) {

	// ----- Menu Items ----- //

	var newFile = {
		win: 'editor',
		menu: {
			label: 'New',
			key: 'n',
			modifiers: 'cmd',
			click: clickEvent('new')
		}
	};

	var saveFile = {
		win: 'editor',
		menu: {
			label: 'Save',
			key: 's',
			modifiers: 'cmd',
			click: clickEvent('save')
		}
	};

	var newAnimation = {
		win: 'editor',
		menu: {
			label: 'New Animation',
			key: 'a',
			modifiers: 'cmd-shift',
			click: clickEvent('newAnim')
		}
	};

	var saveAnimation = {
		win: 'animator',
		menu: {
			label: 'Save Animation',
			key: 's',
			modifiers: 'cmd-shift',
			click: clickEvent('saveAnim')
		}
	};

	var exportSite = {
		win: 'editor',
		menu: {
			label: 'Export Site',
			click: clickEvent('exportSite')
		}
	};


	// ----- Return ----- //

	return [newFile, saveFile, { menu: { type: 'separator' } }, newAnimation,
		saveAnimation, { menu: { type: 'separator' } }, exportSite];

};
