// ----- Requires ----- //

var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');

var Menus = require('../js/menus.js');


// ----- Functions ----- //

// Writes the project info to file.
function writeInfo (projectInfo, callback) {

	var projectJson = JSON.stringify(projectInfo, null, 4);
	var dataPath = path.join(projectInfo.path, 'didactylos.json');

	fs.writeFile(dataPath, projectJson, callback);

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

// Checks if the directory contains a didactylos project.
function checkProject (projectFile, callback) {

	fs.stat(projectFile, function (err, stats) {

		if (err) {
			alert('This directory does not appear to contain a didactylos' +
				' project.');
		} else {
			callback();
		}

	});

}

// Attempts to create the project directory, and warns user if it exists.
function createDir (dirPath, callback) {

	fs.mkdir(dirPath, function (err) {
		if (err) {
			alert('A folder already exists with that name.');
			createProject();
		} else {
			callback();
		}
	});

}

// Obtains information about the project and returns it as an object.
function retrieveInfo (projectLocation) {

	var projectName = localStorage.getItem('projectName');
	var projectPath = path.join(projectLocation, projectName);
	localStorage.setItem('projectPath', projectPath);

	var projectInfo = {
		name: projectName,
		path: projectPath
	};

	return projectInfo;

}

// Creates the new project on disk.
function setupNew () {

	var projectNew = document.getElementById('project_new');

	projectNew.addEventListener('change', function () {

		var projectInfo = retrieveInfo(projectNew.value);
		projectNew.value = '';
		createDir(projectInfo.path, afterCreate);

		function afterCreate () {
			writeInfo(projectInfo, mainWindow);
		}

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

		checkProject(projectInfo, mainWindow);

	});

}

// Creates a new project directory, prompts user for name.
function createProject () {

	var projectNew = document.getElementById('project_new');
	var name = prompt('Name Your Project:', 'My Project');

	if (name !== null) {

		localStorage.setItem('projectName', name);
		projectNew.click();

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
	setupNew();
	setupLoad();

	var newProject = document.getElementById('new_project');
	var openProject = document.getElementById('open_project');
	newProject.addEventListener('click', createProject);
	openProject.addEventListener('click', loadProject);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
