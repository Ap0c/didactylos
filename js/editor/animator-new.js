module.exports = function Animator (gui, file) {

	// ----- Internal Properties ----- //

	var openWindows = {};
	var currentWindow = null;


	// ----- Functions ----- //

	// Sets up the required listeners on a new animator window.
	function windowListeners (name, animWindow) {

		animWindow.on('close', function deleteWindow () {
			delete openWindows[name];
			animWindow.close(true);
		});

		animWindow.on('animationSerialised', function saveData (data) {
			file.saveAnimation(name, data);
		});

		animWindow.on('loaded', function whenLoaded () {
			animWindow.title = name;
		});

	}

	// Opens a new animator window.
	function newWindow (name) {

		var animWindow = gui.Window.open('animator.html', {
			"toolbar": true,
			"width": 1000,
			"height": 600
		});

		openWindows[name] = animWindow;
		currentWindow = animWindow;

		windowListeners(name, animWindow);

	}

	// Creates a new animation.
	function newAnimation () {
		file.newAnimation(newWindow);
	}

	// Sends a request to the animation window to begin the save procedure.
	function saveAnimation () {
		currentWindow.emit('saveRequest');
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
		saveAnimation: saveAnimation,
		closeWindows: closeWindows
	};

};
