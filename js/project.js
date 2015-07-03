// ----- Requires ----- //

var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');

var Menus = require('../js/menus.js');


// ----- Functions ----- //

// Writes the project info to file.
function writeInfo (projectInfo) {

	var projectJson = JSON.stringify(projectInfo, null, 4);
	var dataPath = path.join(projectInfo.path, 'didactylos.json');

	fs.writeFile(dataPath, projectJson, mainWindow);

}

// Opens the main editor window.
function mainWindow () {

	gui.Window.open('editor.html', {
		"toolbar": true,
		"width": 1200,
		"height": 640
	});

	var win = gui.Window.get();
	win.close();

}

// Saves the new project to disk.
function setupSave () {

	var projectSave = document.getElementById('project_save');

	projectSave.addEventListener('change', function () {

		var projectName = localStorage.getItem('projectName');		
		var projectPath = path.join(projectSave.value, projectName);

		localStorage.setItem('projectPath', projectPath);
		fs.mkdir(projectPath);

		var projectInfo = {
			name: projectName,
			path: projectPath
		};

		writeInfo(projectInfo);

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

		var projectInfo = path.join(projectPath, 'didactylos.json');
		if (!fs.statSync(projectInfo).isFile()) {
			console.log('Missing didactylos.json');
		}

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

// Builds the app menubar.
function buildMenubar() {

	var menus = Menus(gui);
	menus.macMenu();

}

// Sets up various components of the editor (e.g. file handling).
function setup () {

	buildMenubar();
	setupSave();
	setupLoad();

	var newProject = document.getElementById('new_project');
	var openProject = document.getElementById('open_project');
	newProject.addEventListener('click', createProject);
	openProject.addEventListener('click', loadProject);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
