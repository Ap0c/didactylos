/* Object to handle the animator window's insertion toolbar, located at the top
of the editing area.
*/

module.exports = function Toolbar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var toolbar = document.getElementById('toolbar');

	// Buttons in the toolbar.
	var toolButtons = {};

	// Stores information about the modal dialogs opened by the toolbar.
	var overlays = {
		link_type: {
			dialog: document.getElementById('link_type_overlay'),
			form: document.getElementById('link_type'),
			cancel: document.getElementById('cancel_link_choice'),
			dataElement: document.getElementById('link_type_web'),
			dataAttribute: 'checked'
		},
		web_link: {
			dialog: document.getElementById('web_link_overlay'),
			form: document.getElementById('web_link'),
			cancel: document.getElementById('cancel_web_link'),
			dataElement: document.getElementById('link_text'),
			dataAttribute: 'value'
		},
		file_link: {
			dialog: document.getElementById('file_link_overlay'),
			form: document.getElementById('file_link'),
			cancel: document.getElementById('cancel_file_link'),
			dataElement: document.getElementById('file_select'),
			dataAttribute: 'value'
		},
		animation_insert: {
			dialog: document.getElementById('animation_insert_overlay'),
			form: document.getElementById('animation_insert_form'),
			cancel: document.getElementById('cancel_animation_insert'),
			dataElement: document.getElementById('animation_select'),
			dataAttribute: 'value'
		}
	};


	// ----- Functions ----- //

	// Listens for a click event on a toolbar button.
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

	// Closes a dialog overlay, processes the data and passes to callback.
	function setupOverlay (name, callback, cancel) {

		var overlay = overlays[name];
		overlay.form.addEventListener('submit', formHandler);
		overlay.cancel.addEventListener('click', cancelOverlay);

		// Handles the data received from the overlay.
		function formHandler (submitEvent) {

			closeOverlay(overlay, submitEvent);
			var data = overlay.dataElement[overlay.dataAttribute];
			callback(data);

		}

		// Closes the overlay.
		function cancelOverlay (clickEvent) {

			closeOverlay(overlay, clickEvent);
			cancel();

		}

	}

	// Opens a modal dialog, calls function based upon user input.
	function openOverlay (name) {

		var overlay = overlays[name];
		overlay.dialog.showModal();

	}

	// Closes a modal dialog.
	function closeOverlay (overlay, closeEvent) {

		closeEvent.preventDefault();
		overlay.dialog.close();

	}

	// Removes items from a dialog select box if they no longer exist.
	function deleteOptions (selectBox, items) {

		for (var option in selectBox) {

			var optionId = option + '_option';

			if (items.indexOf(optionId) < 0) {
				selectBox.remove(optionId);
			}

		}

	}

	// Adds options to a select box in a dialog.
	function addOptions (selectBox, items) {

		for (var i = items.length - 1; i >= 0; i--) {

			var item = items[i];

			if (!selectBox[item]) {

				var option = document.createElement('option');
				option.value = option.text = item;
				option.id = item + '_option';
				selectBox.add(option);

			}

		}

	}

	// Updates the file list in the file insert dialog.
	function updateFiles (files) {

		var fileSelect = document.getElementById('file_select');

		deleteOptions(fileSelect, files);
		addOptions(fileSelect, files);

	}

	// Updates the animation list in the animation insert dialog.
	function updateAnimations (animations) {

		var animationSelect = document.getElementById('animation_select');

		deleteOptions(animationSelect, animations);
		addOptions(animationSelect, animations);

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
		click: click,
		setupOverlay: setupOverlay,
		overlay: openOverlay,
		updateFiles: updateFiles,
		updateAnimations: updateAnimations
	};

};
