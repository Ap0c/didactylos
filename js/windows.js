// ----- Export ----- //

module.exports = function windows (gui, file, toolbar, Menus) {

	// ----- Internal Properties ----- //

	var editorWindow = gui.Window.get();
	var currentWindow = editorWindow;


	// ----- Functions ----- //

	// Opens the animator window.
	function openAnimator () {

		return gui.Window.open('animator.html', {
			"toolbar": true,
			"width": 1000,
			"height": 600
		});

	}

	// Creates a new animation and opens the animator window.
	function newAnimation () {

		file.newAnimation(function animationWindow (name, path) {

			var animWindow = openAnimator();

			animWindow.on('loaded', function passData () {
				animWindow.title = name;
				animWindow.window.sessionStorage.setItem('animPath', path);
			});

			animWindow.on('focus', function updateCurrent () {
				currentWindow = animWindow;
				Menus.activateAnimator();
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
			editorWindow.close('force');
		});

		setupFile();
		setupInsert();

	}


	// ----- Setup ----- //

	setup();

};
