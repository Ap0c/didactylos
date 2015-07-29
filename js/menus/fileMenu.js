exports.items = function items (gui, file) {

	// ----- Function ----- //

	// Prompts the user for an animation name, then opens the animator window.
	function animatorWindow () {

		file.newAnimation(function animationWindow (animationName) {

			var animWindow = gui.Window.open('animator.html', {
				"toolbar": true,
				"width": 1000,
				"height": 600
			});

			animWindow.on('saveAnimation', function (animationData) {
				file.saveAnimation(animationName, animationData);
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


	// ----- Return ----- //

	return [newFile, saveFile, { type: 'separator' }, newAnimation];

};
