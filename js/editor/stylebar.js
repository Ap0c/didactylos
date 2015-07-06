module.exports = function Stylebar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var preview = document.getElementById('preview');
	var styleBar = document.getElementById('stylebar');
	var styleSheet = document.styleSheets[1];
	var styleTools = {};

	var rules = {
		font_size: {
			smallest: 'smallest_font',
			small: 'small_font',
			medium: 'medium_font',
			large: 'large_font',
			largest: 'largest_font'
		}
	};


	// ----- Functions ----- //

	// Listens for an event on the tool corresponding to a change.
	function action (toolName, callback) {

		var tool = styleTools[toolName];
		if (tool.tagName === 'SELECT') {
			tool.addEventListener('change', function eventHandler (event) {
				callback(event.target.value);
			});
		}

	}

	// Sets the style for a particular type of element.
	function setStyle (style, value) {

		var ruleClass = rules[style][value];
		var previewClasses = preview.classList;

		for (var rule in rules[style]) {
			if (previewClasses.contains(rules[style][rule])) {
				previewClasses.remove(rules[style][rule]);
			}
		}

		previewClasses.add(ruleClass);

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
