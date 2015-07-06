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

// Builds the stylebar.
function setup (project, views) {

	fontSize(project, views);

}


// ----- Module Exports ----- //

module.exports = {
	setup: setup
};
