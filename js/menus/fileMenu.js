exports.items = function items (gui, file) {

	// ----- Internal Properties ----- //

	var editorWindow = gui.Window.get();


	// ----- Function ----- //

	// Prompts the user for an animation name, then opens the animator window.
	function animatorWindow () {

		file.newAnimation(function animationWindow (animationName) {

			var animWindow = gui.Window.open('animator.html', {
				"toolbar": true,
				"width": 1000,
				"height": 600
			});

			animWindow.on('focus', function updateCurrent () {
				var windowInfo = { win: animWindow, name: animationName };
				editorWindow.emit('animFocus', windowInfo);
			});

			animWindow.on('serialisedAnim', function (serialData) {
				file.saveAnimation(animationName, serialData);
			});

		});

	}


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
		click: animatorWindow
	};

	var saveAnimation = {
		label: 'Save Animation',
		key: 'Ctrl-Shift-D',
		click: function saveEvent () {
			editorWindow.emit('saveAnim');
		}
	};


	// ----- Return ----- //

	return [newFile, saveFile, { type: 'separator' }, newAnimation, saveAnimation];

};
