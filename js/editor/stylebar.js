module.exports = function Stylebar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var preview = document.getElementById('preview');
	var styleBar = document.getElementById('stylebar');
	var styleSheet = document.styleSheets[1];
	var styleTools = {};

	var rules = {
		font_size: {
			type: 'class',
			classes: {
				smallest: 'smallest_font',
				small: 'small_font',
				medium: 'medium_font',
				large: 'large_font',
				largest: 'largest_font'
			}
		},
		font_colour: {
			type: 'inline',
			ruleName: 'color'
		}
	};


	// ----- Functions ----- //

	// Listens for an event on the tool corresponding to a change.
	function action (toolName, callback) {

		var tool = styleTools[toolName];
		var eventType = tool.tagName === 'SELECT' ? 'change' : 'input';
		console.log(eventType);

		tool.addEventListener(eventType, function eventHandler (event) {
			console.log('here');
			callback(event.target.value);
		});

	}

	// Loads a given style into a select-element based tool.
	function loadSelect (tool, value) {

		var toolOptions = tool.options;

		for (var i = 0, length = toolOptions.length; i < length; i++) {

			if (toolOptions[i].value === value) {
				tool.selectedIndex = i;
				var changeEvent = document.createEvent("HTMLEvents");
				changeEvent.initEvent("change", false, true);
				tool.dispatchEvent(changeEvent);
			}

		}

	}

	// Loads a given style into an input-element based tool.
	function loadInput (tool, value) {

		tool.value = value;
		var inputEvent = document.createEvent("HTMLEvents");
		inputEvent.initEvent("input", false, true);
		tool.dispatchEvent(inputEvent);

	}

	// Loads up a specific style into the stylebar.
	function loadStyle (tool, value) {

		if (tool.tagName === 'SELECT') {
			loadSelect(tool, value);
		} else if (tool.tagName === 'INPUT') {
			loadInput(tool, value);
		}

	}

	// Loads a set of styles into the stylebar.
	function loadStyles (styles) {

		for (var style in styles) {

			var styleTool = styleTools[style];
			var value = styles[style];

			loadStyle(styleTool, value);

		}

	}

	// Adds a class to the preview element, removes old class.
	function setClass (style, value) {

		var classes = rules[style].classes;
		var previewClasses = preview.classList;

		for (var className in classes) {
			if (previewClasses.contains(classes[className])) {
				previewClasses.remove(classes[className]);
			}
		}

		previewClasses.add(classes[value]);

	}

	// Sets the inline style on the preview element.
	function setInline (style, value) {

		var ruleName = rules[style].ruleName;
		preview.style[ruleName] = value;

	}

	// Sets the style for a particular type of rule.
	function setStyle (style, value) {

		var ruleType = rules[style].type;

		if (ruleType === 'class') {
			setClass(style, value);
		} else if (ruleType === 'inline') {
			setInline(style, value);
		}

	}

	// Sets up the style bar.
	function init () {

		var tools = styleBar.getElementsByClassName('style_tool');

		for (var i = tools.length - 1; i >= 0; i--) {

			console.log(tools[i]);
			var tool = tools[i];
			styleTools[tool.id] = tool;

		}

		console.log(styleTools);

	}


	// ----- Constructor ----- //

	init();

	return {
		action: action,
		loadStyles: loadStyles,
		setStyle: setStyle
	};

};
