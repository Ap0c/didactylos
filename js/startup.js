// ----- Requires ----- //

var gui = require('nw.gui');


// ----- Functions ----- //

// Sets up various components of the editor (e.g. file handling).
function setup () {

	var newProject = document.getElementById('new_project');
	var openProject = document.getElementById('open_project');
	var win = gui.Window.get();

	newProject.addEventListener('click', function () {
		gui.Window.open('editor.html', {
			"toolbar": true,
			"width": 1200,
			"height": 640
		});
		win.close();
	});

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
