/* Handles the procedure for adjusting styles in the preview area through the
stylebar in the editor.
*/

// ----- Functions ----- //

// Sets up an individual tool in the stylebar.
function setupStyle(project, views, styleName) {

	views.stylebar.action(styleName, function (value) {

		var file = views.sidebar.activeFile();
		views.stylebar.setStyle(styleName, value);
		views.editor.focus();
		project.updateStyle(file, styleName, value);

	});

}

// Builds the stylebar.
function setup (project, views) {

	var styleTools = ['font_size', 'font_colour', 'background_colour',
	'font_family', 'heading_family', 'heading_colour'];

	for (var i = styleTools.length - 1; i >= 0; i--) {
		setupStyle(project, views, styleTools[i]);
	}

}


// ----- Module Exports ----- //

module.exports = {
	setup: setup
};
