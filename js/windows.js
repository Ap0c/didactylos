// ----- Export ----- //

module.exports = function windows (gui, file, toolbar, Menus) {

	// ----- Internal Properties ----- //

	var editorWindow = gui.Window.get();
	var currentWindow = editorWindow;
	var animatorWindows = {};


	// ----- Functions ----- //

	// Opens the animator window.
	function openAnimator (name) {

		var animWindow = gui.Window.open('animator.html', {
			"toolbar": true,
			"width": 1000,
			"height": 600
		});

		animatorWindows[name] = animWindow;

		animWindow.on('focus', function updateCurrent () {
			currentWindow = animWindow;
			Menus.activateAnimator();
		});

		animWindow.on('close', function deleteWindow () {
			delete animatorWindows[name];
			animWindow.close(true);
		});

		animWindow.on('saveAnim', function saveAnim (data) {
			file.saveAnimation(name, data);
		});

		return animWindow;

	}

	function openAnimation (name) {

		file.openAnimation(function animationData (err, data) {

			var animWindow = openAnimator(name);

			animWindow.on('loaded', function passData () {
				animWindow.title = name;
				animWindow.window.sessionStorage.setItem('animPath', path);
				animWindow.emit('openAnimation', data);
			});

		});

	}

	// Creates a new animation and opens the animator window.
	function newAnimation () {

		file.newAnimation(function animationWindow (name, path) {

			var animWindow = openAnimator(name);

			animWindow.on('loaded', function passData () {
				animWindow.title = name;
				animWindow.window.sessionStorage.setItem('animPath', path);
			});

		});

	}

	// Fires the event to save an animation on the animator window.
	function saveAnimation () {
		currentWindow.emit('saveAnimation');
	}

	// Sets up the insert menu.
	function setupInsert () {

		Menus.on('insert', function insertEvent (item) {
			toolbar.click(item);
		});

	}

	// Sets up the file menu.
	function setupFile () {

		Menus.on('file', function fileEvent (item) {

			switch (item) {
				case 'new':
					file.newFile();
					break;
				case 'save':
					file.save();
					break;
				case 'newAnim':
					newAnimation();
					break;
				case 'saveAnim':
					saveAnimation();
			}

		});

	}

	// Sets up the menus and window handling.
	function setup () {

		editorWindow.on('focus', function editorMenus () {
			Menus.activateEditor();
		});

		editorWindow.on('close', function () {
			file.save();
			for (var win in animatorWindows) {
				animatorWindows[win].close();
			}
			editorWindow.close(true);
		});

		setupFile();
		setupInsert();

		editorWindow.emit('focus');

	}


	// ----- Setup ----- //

	setup();

};
