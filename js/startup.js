// ----- Requires ----- //

var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');


// ----- Functions ----- //

// Saves the new project to disk.
function setupSave () {

	var win = gui.Window.get();
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

// Opens an existing project.
function setupLoad () {

	var win = gui.Window.get();
	var projectLoad = document.getElementById('project_load');

	projectLoad.addEventListener('change', function () {

		var projectPath = projectLoad.value;
		var projectName = path.basename(projectPath);
		localStorage.setItem('projectPath', projectPath);
		localStorage.setItem('projectName', projectName);

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

	var projectSave = document.getElementById('project_save');
	var name = prompt('Name Your Project:', 'My Project');

	if (name !== null) {

		localStorage.setItem('projectName', name);
		projectSave.click();

	}

}

// Opens an existing project.
function loadProject () {

	var projectLoad = document.getElementById('project_load');
	projectLoad.click();

}

// Sets up various components of the editor (e.g. file handling).
function setup () {

	var newProject = document.getElementById('new_project');
	var openProject = document.getElementById('open_project');

	setupSave();
	setupLoad();

	newProject.addEventListener('click', createProject);
	openProject.addEventListener('click', loadProject);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
