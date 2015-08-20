module.exports = function Animator (gui, menus, file) {

	// ----- Internal Properties ----- //

	var openWindows = {};
	var currentWindow = null;


	// ----- Functions ----- //

	// Sets up the required listeners on a new animator window.
	function windowListeners (name, animWindow, onload) {

		animWindow.on('close', function deleteWindow () {
			delete openWindows[name];
			animWindow.close(true);
		});

		animWindow.on('animationSerialised', function saveData (data) {
			file.saveAnimation(name, data);
		});

		animWindow.on('loaded', function whenLoaded () {
			animWindow.title = name;
			if (onload) {
				onload(animWindow);
			}
		});

		animWindow.on('focus', function focusWindow () {
			currentWindow = animWindow;
			menus.activateAnimator();
		});

	}

	// Opens a new animator window.
	function newWindow (name, onload) {

		var animWindow = gui.Window.open('animator.html', {
			"toolbar": false,
			"width": 1000,
			"height": 600
		});

		openWindows[name] = animWindow;
		currentWindow = animWindow;

		windowListeners(name, animWindow, onload);

	}

	// Creates a new animation.
	function newAnimation (callback) {

		file.newAnimation(function openWindow (name) {

			newWindow(name);
			callback(name, openAnimation);

		});

	}

	// Sends a request to the animation window to begin the save procedure.
	function saveAnimation () {
		currentWindow.emit('saveRequest');
	}

	// Opens an animation from file.
	function openAnimation (name) {

		if (name in openWindows) {
			openWindows[name].show();
		} else {

			file.openAnimation(name, function (err, data) {

				newWindow(name, function onload (animWindow) {
					animWindow.emit('loadRequest', data);
				});

			});

		}

	}

	// Closes all open animation windows.
	function closeWindows () {

		for (var animWindow in openWindows) {
			openWindows[animWindow].close();
		}

	}


	// ----- Constructor ----- //

	return {
		newAnimation: newAnimation,
		openAnimation: openAnimation,
		saveAnimation: saveAnimation,
		closeWindows: closeWindows
	};

};
