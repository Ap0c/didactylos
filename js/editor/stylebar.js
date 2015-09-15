/* Object to handle the animator window's style toolbar, located at the top of
the preview area.
*/

module.exports = function Stylebar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var preview = document.getElementById('preview');
	var styleBar = document.getElementById('stylebar');

	// Gets the stylesheet for the page.
	var pageStyle = document.styleSheets[2];
	// Inputs in the stylebar.
	var styleTools = {};

	// Stores all the possible CSS rules that can be applied using the stylebar.
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
		},
		background_colour: {
			type: 'inline',
			ruleName: 'background-color'
		},
		font_family: {
			type: 'class',
			classes: {
				serif: 'serif_font',
				sans_serif: 'sans_serif_font'
			}
		},
		heading_family: {
			type: 'class',
			classes: {
				serif: 'serif_headings',
				sans_serif: 'sans_serif_headings'
			}
		},
		heading_colour: {
			type: 'page',
			ruleText: function (colour) {
				return `#preview > h1, #preview > h2, #preview > h3,
				#preview > h4, #preview > h5, #preview > h6
				{ color: ${colour}; }`;
			}
		}
	};


	// ----- Functions ----- //

	// Listens for an event on the tool corresponding to a change.
	function action (toolName, callback) {

		var tool = styleTools[toolName];
		var eventType = tool.tagName === 'SELECT' ? 'change' : 'input';

		tool.addEventListener(eventType, function eventHandler (event) {
			callback(event.target.value);
		});

	}

	// Loads a given style into an HTML select element based tool.
	function loadSelect (tool, value) {

		var toolOptions = tool.options;

		for (var i = 0, length = toolOptions.length; i < length; i++) {

			if (toolOptions[i].value === value) {
				tool.selectedIndex = i;
				var changeEvent = document.createEvent("HTMLEvents");
				changeEvent.initEvent("change", false, true);
				tool.dispatchEvent(changeEvent);
				return;
			}

		}

	}

	// Loads a given style into an HTML input element based tool.
	function loadInput (tool, value) {

		tool.value = value;
		var inputEvent = document.createEvent("HTMLEvents");
		inputEvent.initEvent("input", false, true);
		tool.dispatchEvent(inputEvent);

	}

	// Loads a specific style into the stylebar.
	function loadStyle (tool, value) {

		if (tool.tagName === 'SELECT') {
			loadSelect(tool, value);
		} else if (tool.tagName === 'INPUT') {
			loadInput(tool, value);
		}

	}

	// Converts an rgb colour to its hex equivalent.
	function rgbToHex (rgbString) {

		var rgbArray = rgbString.split('(')[1].split(')')[0].split(',');

		var hexArray = rgbArray.map(function (x) {
			return parseInt(x).toString(16);
		});

		return `#${hexArray.join('')}`;

	}

	// Removes a rule's classes from the preview element.
	function resetClasses (rule) {

		var classes = rules[rule].classes;
		var previewClasses = preview.classList;

		for (var className in classes) {
			if (previewClasses.contains(classes[className])) {
				previewClasses.remove(classes[className]);
			}
		}

	}

	// Resets a select element to its default value.
	function resetSelect (tool) {

		var toolOptions = tool.options;

		for (var i = 0, length = toolOptions.length; i < length; i++) {

			if (toolOptions[i].defaultSelected) {
				tool.selectedIndex = toolOptions[i].index;
				return;
			}

		}

	}

	// Resets an input element to its default value.
	function resetInput (tool, rule) {

		var value = window.getComputedStyle(preview).getPropertyValue(rule);

		if (rule === 'color' || rule === 'background-color') {
			value = rgbToHex(value);
		}

		tool.value = value;

	}

	// Resets both the style and tool to the default defined in the stylesheet.
	function resetStyle (tool, rule) {

		var ruleName = rules[rule].ruleName;
		var previewClasses = preview.classList;

		if (rules[rule].type === 'inline') {
			preview.style.removeProperty(ruleName);
		} else if (rules[rule].type === 'class') {
			resetClasses(rule);
		} else if (rules[rule].type === 'page') {
			deletePage(0);
		}

		if (tool.tagName === 'SELECT') {
			resetSelect(tool);
		} else if (tool.tagName === 'INPUT') {
			resetInput(tool, ruleName);
		}

	}

	// Loads a set of styles into the stylebar.
	function loadStyles (styles) {

		for (var rule in rules) {

			var styleTool = styleTools[rule];

			if (rule in styles) {
				var value = styles[rule];
				loadStyle(styleTool, value);
			} else {
				resetStyle(styleTool, rule);
			}

		}

	}

	// Delete a rule from the page stylesheet.
	function deletePage (location) {

		if (pageStyle.cssRules[String(0)]) {
			pageStyle.deleteRule(0);
		}

	}

	// Adds a rule to the page stylesheet.
	function setPage (style, value) {

		var rule = rules[style];

		deletePage(0);
		pageStyle.insertRule(rule.ruleText(value), 0);

	}

	// Adds a class to the preview element, removes old class.
	function setClass (style, value) {

		resetClasses(style);

		var classes = rules[style].classes;
		var previewClasses = preview.classList;
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
		} else if (ruleType === 'page') {
			setPage(style, value);
		}

	}

	// Sets up the stylebar.
	function init () {

		var tools = styleBar.getElementsByClassName('style_tool');

		for (var i = tools.length - 1; i >= 0; i--) {

			var tool = tools[i];
			styleTools[tool.id] = tool;

		}

	}


	// ----- Constructor ----- //

	init();

	return {
		action: action,
		loadStyles: loadStyles,
		setStyle: setStyle
	};

};
