// ----- Functions ----- //

// Updates the font size.
function fontSize (project, stylebar, sidebar) {

	stylebar.action('font_size', function (value) {

		var file = sidebar.activeFile();
		stylebar.setStyle('p', 'font-size', value);
		project.updateStyle(file, 'fontSize', value);

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
