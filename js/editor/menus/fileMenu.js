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

	var openAnimation = {
		win: 'editor',
		menu: {
			label: 'Open Animation',
			key: 'o',
			modifiers: 'cmd-shift',
			click: clickEvent('openAnim')
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


	// ----- Return ----- //

	return [newFile, saveFile, { menu: { type: 'separator' } }, newAnimation,
		openAnimation, saveAnimation];

};
