module.exports = function Stylebar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var preview = document.getElementById('preview');
	var styleBar = document.getElementById('stylebar');
	var styleSheet = document.styleSheets[1];
	var styleLocations = {
		"font-size": 0
	};
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

		var ruleNumber = styleLocations[style];

		if (styleSheet.cssRules[String(ruleNumber)]) {
			styleSheet.deleteRule(ruleNumber);
		}
		styleSheet.insertRule('#preview > ' + tagName + ' { ' + style + ': ' + value + '; }', ruleNumber);

	}

	// Sets up the style bar.
	function init () {

		var tools = styleBar.getElementsByClassName('style_tool');

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
