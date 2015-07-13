module.exports = function Toolbar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var toolbar = document.getElementById('toolbar');
	var toolButtons = {};

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
		}
	};


	// ----- Functions ----- //

	// Listens for a click event on the button.
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

	// Closes the overlay, processes the data submitted and passes to callback.
	function setupOverlay (name, callback, cancel) {

		var overlay = overlays[name];
		overlay.form.addEventListener('submit', formHandler);
		overlay.cancel.addEventListener('click', cancelOverlay);

		function formHandler (submitEvent) {

			closeOverlay(overlay, submitEvent);
			var data = overlay.dataElement[overlay.dataAttribute];
			callback(data);

		}

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

	// Removes files from the file insert dialog if they no longer exist.
	function deleteFiles (fileSelect, projectFiles) {

		for (var file in fileSelect) {

			var optionId = file + '_option';

			if (projectFiles.indexOf(optionId) < 0) {
				fileSelect.remove(optionId);
			}

		}

	}

	// Updates the file list in the file insert dialog.
	function updateFiles (files) {

		var fileSelect = document.getElementById('file_select');
		deleteFiles(fileSelect, files);

		for (var i = files.length - 1; i >= 0; i--) {

			var file = files[i];

			if (!fileSelect[file]) {

				var option = document.createElement('option');
				option.value = option.text = file;
				option.id = file + '_option';
				fileSelect.add(option);

			}

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
		click: click,
		setupOverlay: setupOverlay,
		overlay: openOverlay,
		updateFiles: updateFiles
	};

};
