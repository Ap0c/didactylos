// ----- Requires ----- //

var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');


// ----- Functions ----- //

// Saves the new project to disk.
function setupSave () {

	var projectSave = document.getElementById('project_save');

	projectSave.addEventListener('change', function () {

		var projectName = localStorage.getItem('projectName');
		var projectPath = path.join(projectSave.value, projectName);

		localStorage.setItem('projectPath', projectPath);
		fs.mkdir(projectPath);

		gui.Window.open('editor.html', {
			"toolbar": true,
			"width": 1200,
			"height": 640
		});

		win.close();

	});

}

// Creates a new project directory, prompts user for name.
function createProject () {

	var win = gui.Window.get();
	var projectSave = document.getElementById('project_save');
	var name = prompt('Name Your Project:', 'My Project');

	if (name !== null) {

		localStorage.setItem('projectName', name);
		projectSave.click();

	}

}

// Sets up various components of the editor (e.g. file handling).
function setup () {

	var newProject = document.getElementById('new_project');
	var openProject = document.getElementById('open_project');

	setupSave();

	newProject.addEventListener('click', createProject);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
