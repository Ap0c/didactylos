// ----- Requires ----- //

var gui = require('nw.gui');


// ----- Functions ----- //

// Creates a new project directory, prompts user for name.
function createProject () {

	var win = gui.Window.get();
	var name = prompt('Name Your Project:', 'My Project');

	if (name !== null) {

		localStorage.setItem('projectName', name);

		gui.Window.open('editor.html', {
			"toolbar": true,
			"width": 1200,
			"height": 640
		});

		win.close();

	}

}

// Sets up various components of the editor (e.g. file handling).
function setup () {

	var newProject = document.getElementById('new_project');
	var openProject = document.getElementById('open_project');

	newProject.addEventListener('click', createProject);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
