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
	function overlayData (overlay, callback) {

		overlay.form.addEventListener('submit', formHandler);

		function formHandler (submitEvent) {

			submitEvent.preventDefault();
			overlay.form.removeEventListener('submit', formHandler);

			var data = overlay.dataElement[overlay.dataAttribute];

			closeOverlay(overlay, function afterClose () {
				callback(data);
			});

		}

	}

	// Opens a modal dialog, calls function based upon user input.
	function openOverlay (name, accept, cancel) {

		var overlay = overlays[name];

		if (accept) {
			overlayData(overlay, accept);
		}

		overlay.cancel.addEventListener('click', cancelOverlay);

		function cancelOverlay (clickEvent) {
			clickEvent.target.removeEventListener('click', cancelOverlay);
			closeOverlay(overlay, cancel);
		}

		overlay.dialog.showModal();

	}

	// Closes a specified overlay.
	function closeOverlay (overlay, callback) {
		overlay.dialog.close();
		callback();
	}

	// Removes files from the file insert dialog if they no longer exist.
	function deleteFiles (fileSelect, files) {

		for (var file in fileSelect) {

			var optionId = file + '_option';

			if (files.indexOf(optionId) < 0) {
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
		overlay: openOverlay,
		updateFiles: updateFiles
	};

};
