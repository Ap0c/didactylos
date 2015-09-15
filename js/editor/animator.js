/* Handles the editor's interaction with the animator window. Includes methods
for opening the animator and keeping track of its open windows.
*/

module.exports = function Animator (gui, menus, file) {

	// ----- Internal Properties ----- //

	var openWindows = {};
	var currentWindow = null;


	// ----- Functions ----- //

	// Sets up listeners on a new animator window.
	function windowListeners (name, animWindow, onload) {

		// On the close of an animator window, removes it from the list.
		animWindow.on('close', function deleteWindow () {
			delete openWindows[name];
			animWindow.close(true);
		});

		// Receives a list of JSON serialised drawings and saves them to disk.
		animWindow.on('animationSerialised', function saveData (data) {
			file.saveAnimation(name, data);
		});

		// Sets up the animator window, and passes it the drawing data.
		animWindow.on('loaded', function whenLoaded () {
			animWindow.title = name;
			if (onload) {
				onload(animWindow);
			}
		});

		// Activates animator menus on animator window focus.
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

	// Creates a new animation, opens an animator window.
	function newAnimation (callback) {

		file.newAnimation(function openWindow (name) {

			newWindow(name);
			callback(name, openAnimation);

		});

	}

	// Sends a request to the animator window to begin the save procedure.
	function saveAnimation () {
		currentWindow.emit('saveRequest');
	}

	// Opens an animation from file in the animator window.
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
