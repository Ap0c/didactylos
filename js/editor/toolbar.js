module.exports = function Toolbar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var toolbar = document.getElementById('toolbar');
	var toolButtons = {};


	// ----- Functions ----- //

	// Listens for a specified event on the button.
	function action (buttonName, callback) {

		var toolButton = toolButtons[buttonName];
		toolButton.addEventListener('click', callback);

	}

	// Simulates a click on a toolbar button.
	function click (buttonName) {

		if (toolButtons[buttonName]) {
			toolButtons[buttonName].click();
		} else {
			throw new Error('Button ' + buttonName + ' not found.');
		}

	}

	// Sets up the toolbar.
	function init () {

		var buttons = toolbar.getElementsByClassName('tool_button');

		for (var i = buttons.length - 1; i >= 0; i--) {

			var button = buttons[i];
			toolButtons[button.name] = button;

		}

	}


	// ----- Constructor ----- //

	init();

	return {
		action: action,
		click: click
	};

};
