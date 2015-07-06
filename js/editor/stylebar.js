module.exports = function Stylebar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var preview = document.getElementById('preview');
	var stylebar = document.getElementById('stylebar');
	var styleTools = {};


	// ----- Functions ----- //

	// Listens for an event on the tool corresponding to a change.
	function action (toolName, callback) {

		var tool = styleTools[toolName];
		console.log(tool.tagName);
		if (tool.tagName === 'SELECT') {
			tool.addEventListener('change', function eventHandler (event) {
				callback(event.target.value);
			});
		}

	}

	// Sets the style for a particular type of element.
	function setStyle (tagName, style, value) {

		var elements = preview.getElementsByTagName(tagName);

		for (var i = elements.length - 1; i >= 0; i--) {
			elements[i].style[style] = value;
		}

	}

	// Sets up the style bar.
	function init () {

		var tools = stylebar.getElementsByClassName('style_tool');

		for (var i = tools.length - 1; i >= 0; i--) {

			var tool = tools[i];
			styleTools[tool.name] = tool;

		}

	}


	// ----- Constructor ----- //

	init();

	return {
		action: action,
		setStyle: setStyle
	};

};
