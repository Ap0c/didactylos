exports.items = function items (gui, file) {

	// ----- Internal Properties ----- //

	var currentAnimation = null;


	// ----- Function ----- //

	// Prompts the user for an animation name, then opens the animator window.
	function animatorWindow () {

		file.newAnimation(function animationWindow (name, path) {

			var animWindow = gui.Window.open('animator.html', {
				"toolbar": true,
				"width": 1000,
				"height": 600
			});

			animWindow.on('loaded', function passData () {
				animWindow.title = name;
				animWindow.window.sessionStorage.setItem('animPath', path);
			});

			animWindow.on('focus', function updateCurrent () {
				currentAnimation = animWindow;
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
			currentAnimation.emit('saveAnimation');
		}
	};


	// ----- Return ----- //

	return [newFile, saveFile, { type: 'separator' }, newAnimation, saveAnimation];

};
