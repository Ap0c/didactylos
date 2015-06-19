module.exports = function Toolbar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var toolbar = document.getElementById('toolbar');
	var toolButtons = {};


	// ----- Functions ----- //

	// Listens for a specified event on the button.
	function listen (buttonName, event, callback) {

		var toolButton = getButton(buttonName);
		toolButton.button.addEventListener(event, callback);

	}

	// Retrieves a button from the toolbar.
	function getButton (name) {

		if (toolButtons[name]) {
			return toolButtons[name];
		} else {
			throw new Error('Button ' + name + ' not found.');
		}

	}

	// Sets up the toolbar.
	function init () {

		var buttons = toolbar.getElementsByClassName('tool_button');

		for (var i = buttons.length - 1; i >= 0; i--) {

			var button = buttons[i];

			toolButtons[button.name] = {
				button: button,
				listen: listen
			};

		}

	}


	// ----- Constructor ----- //

	init();

	return {
		listen: listen
	};

};
