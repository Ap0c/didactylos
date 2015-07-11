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
		insert_link: {
			dialog: document.getElementById('insert_link_overlay'),
			processData: linkInsert,
			cancel: document.getElementById('cancel_link')
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
	function linkInsert (overlay, callback) {

		form = document.getElementById('insert_link');
		form.addEventListener('submit', insertLink);

		function insertLink (submitEvent) {

			submitEvent.preventDefault();
			form.removeEventListener('submit', insertLink);
			linkText = document.getElementById('link_text').value;
			data = {text: linkText};
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
		overlay: openOverlay
	};

};
