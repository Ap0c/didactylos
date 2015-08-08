// ----- Requires ----- //

var fs = require('fs');
var path = require('path');


// ----- Setup ----- //

var styleData = {

	font_family: {
		selector: '#content',
		property: 'font-family',
		values: {
			serif: 'Times, "Times New Roman", Georgia, serif',
			sans_serif: 'HelveticaNeue, Verdana, Arial, sans-serif'
		}
	},
	font_colour: {
		selector: '#content',
		property: 'color'
	},
	background_colour: {
		selector: 'body',
		property: 'background-color'
	},
	font_size: {
		selector: '#content',
		property: 'font-size',
		values: {
			smallest: 'x-small',
			small: 'small',
			medium: 'medium',
			large: 'large',
			largest: 'x-large'
		}
	},
	heading_family: {
		selector: 'h1, h2, h3, h4, h5, h6',
		property: 'font-family',
		values: {
			serif: 'Times, "Times New Roman", Georgia, serif',
			sans_serif: 'HelveticaNeue, Verdana, Arial, sans-serif'
		}
	},
	heading_colour: {
		selector: 'h1, h2, h3, h4, h5, h6',
		property: 'color'
	}

};


// ----- Functions ----- //

// Creates a CSS declaration from a specific style.
function updateDeclarations (declarations, info, value) {

	var selector = info.selector;

	if (!declarations[selector]) {
		declarations[selector] = [];
	}

	var declaration = { property: info.property };

	if (info.values) {
		declaration.value = info.values[value];
	} else {
		declaration.value = value;
	}

	declarations[selector].push(declaration);

}

// Builds a set of declarations from the styles, and groups them by selector.
function assembleDeclarations (styles) {

	var declarations = {};

	for (var style in styles) {

		var info = styleData[style];
		updateDeclarations(declarations, info, styles[style]);

	}

	return declarations;

}

// Puts together a rule for a given CSS selector.
function buildRule (selector, declarations) {

	var rule = `${selector} {`;

	for (var i = 0, noDecl = declarations.length; i < noDecl; i++) {
		rule = `${rule} ${declarations[i].property}: ${declarations[i].value};`;
	}

	rule = `${rule} }`;

	return rule;

}

// Puts together a stylesheet from the given styles.
function buildStylesheet (styles) {

	var selectors = assembleDeclarations(styles);
	var result = '';

	for (var selector in selectors) {
		result = `${result}${buildRule(selector, selectors[selector])}\n`;
	}

	return result;

}

// Builds a stylesheet and writes it to file.
function exportStyles (target, styles, filename) {

	var stylesheet = buildStylesheet(styles);
	var stylesheetFile = path.join(target, `styles/${filename}.css`);

	fs.writeFile(stylesheetFile, stylesheet);

}

// ----- Exports ----- //

module.exports = {
	exportStyles: exportStyles
};
