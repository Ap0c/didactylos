// ----- Functions ----- //

// Updates the font size.
function fontSize (project, views) {

	views.stylebar.action('font_size', function (value) {

		var file = views.sidebar.activeFile();
		views.stylebar.setStyle('font_size', value);
		views.editor.focus();
		project.updateStyle(file, 'font_size', value);

	});

}

function fontColour (project, views) {

	views.stylebar.action('font_colour', function (value) {

		var file = views.sidebar.activeFile();
		views.stylebar.setStyle('font_colour', value);
		views.editor.focus();
		project.updateStyle(file, 'font_colour', value);

	});

}

function backgroundColour (project, views) {

	views.stylebar.action('background_colour', function (value) {

		var file = views.sidebar.activeFile();
		views.stylebar.setStyle('background_colour', value);
		views.editor.focus();
		project.updateStyle(file, 'background_colour', value);

	});

}

function fontFamily (project, views) {

	views.stylebar.action('font_family', function (value) {

		var file = views.sidebar.activeFile();
		views.stylebar.setStyle('font_family', value);
		views.editor.focus();
		project.updateStyle(file, 'font_family', value);

	});

}

function headingFamily (project, views) {

	views.stylebar.action('heading_family', function (value) {

		var file = views.sidebar.activeFile();
		views.stylebar.setStyle('heading_family', value);
		views.editor.focus();
		project.updateStyle(file, 'heading_family', value);

	});

}

// Builds the stylebar.
function setup (project, views) {

	fontSize(project, views);
	fontColour(project, views);
	backgroundColour(project, views);
	fontFamily(project, views);
	headingFamily(project, views);

}


// ----- Module Exports ----- //

module.exports = {
	setup: setup
};
