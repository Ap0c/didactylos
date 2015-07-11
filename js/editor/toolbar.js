module.exports = function Toolbar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var toolbar = document.getElementById('toolbar');
	var toolButtons = {};
	var overlays = {
		link_type: {
			dialog: document.getElementById('link_type_overlay'),
			processData: linkType,
			cancel: document.getElementById('cancel_link_choice')
		},
		web_link: {
			dialog: document.getElementById('web_link_overlay'),
			processData: webInsert,
			cancel: document.getElementById('cancel_web_link')
		},
		file_link: {
			dialog: document.getElementById('file_link_overlay'),
			processData: fileInsert,
			cancel: document.getElementById('cancel_file_link')
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

	// Returns the results from the linktype form as an object.
	function linkType (overlay, callback) {

		form = document.getElementById('link_type');
		form.addEventListener('submit', linkChoice);

		function linkChoice (submitEvent) {

			submitEvent.preventDefault();
			form.removeEventListener('submit', linkChoice);
			webLink = document.getElementById('link_type_web').checked;
			data = {web: webLink};
			closeOverlay(overlay, afterClose);

			function afterClose () {
				callback(data);
			}

		}

	}

	// Returns the results from the linkinsert form as an object.
	function webInsert (overlay, callback) {

		form = document.getElementById('web_link');
		form.addEventListener('submit', webLink);

		function webLink (submitEvent) {

			submitEvent.preventDefault();
			form.removeEventListener('submit', webLink);
			linkText = document.getElementById('link_text').value;
			data = {text: linkText};
			closeOverlay(overlay, afterClose);

			function afterClose () {
				callback(data);
			}
		}

	}

	// Returns the results from the linkinsert form as an object.
	function fileInsert (overlay, callback) {

		form = document.getElementById('file_link');
		form.addEventListener('submit', insertFile);

		function insertFile (submitEvent) {

			submitEvent.preventDefault();
			form.removeEventListener('submit', insertFile);
			filename = document.getElementById('file_select').value;
			data = {name: filename};
			closeOverlay(overlay, afterClose);

			function afterClose () {
				callback(data);
			}
		}

	}

	// Opens a modal dialog, calls function based upon user input.
	function openOverlay (name, accept, cancel) {

		var overlay = overlays[name];

		if (accept) {
			overlay.processData(overlay, accept);
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

	// Removes files from the list if they no longer exist in the project.
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
