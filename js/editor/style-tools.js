// ----- Functions ----- //

// Updates the font size.
function fontSize (project, stylebar, sidebar) {

	stylebar.action('font_size', function (value) {

		var file = sidebar.activeFile();
		stylebar.setStyle('font_size', value);
		project.updateStyle(file, 'font_size', value);

	});

}

// Builds the stylebar.
function setup (project, stylebar, sidebar) {

	fontSize(project, stylebar, sidebar);

}


// ----- Module Exports ----- //

module.exports = {
	setup: setup
};
