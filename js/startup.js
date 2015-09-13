// ----- Requires ----- //

var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');

var Menus = require('../js/editor/menus/menus.js');


// ----- Functions ----- //

// Writes the project info to file and local storage.
function writeInfo (projectName, projectPath, callback) {

	var projectInfo = {
		name: projectName,
		path: projectPath,
		animPath: path.join(projectPath, 'animations'),
		files: {},
		animations: {}
	};

	var projectJson = JSON.stringify(projectInfo, null, 4);

	localStorage.setItem('projectPath', projectPath);
	localStorage.setItem('projectInfo', projectJson);

	var dataPath = path.join(projectPath, 'project-metadata.json');
	fs.writeFile(dataPath, projectJson, callback);

}

// Reads the project info from file.
function readInfo (projectPath, infoFile) {

	var projectJson = fs.readFileSync(infoFile);
	var info = JSON.parse(projectJson);

	if (info.path !== projectPath) {
		info.path = projectPath;
	}

	localStorage.setItem('projectName', info.name);
	localStorage.setItem('projectPath', projectPath);
	localStorage.setItem('projectInfo', JSON.stringify(info));

}

// Opens the main editor window.
function mainWindow () {

	gui.Window.open('editor.html', {
		"toolbar": false,
		"width": 1300,
		"height": 640
	});

	var currentWindow = gui.Window.get();
	currentWindow.close();

}

// Checks if the directory contains a project.
function checkProject (projectFile, callback) {

	fs.stat(projectFile, function (err, stats) {

		if (err) {
			alert('This directory does not appear to contain a project.');
		} else {
			callback();
		}

	});

}

// Creates the animations directory.
function animationsDir (projectPath, callback) {

	var dirPath = path.join(projectPath, 'animations');

	fs.mkdir(dirPath, function (err) {
		if (err) {
			alert('Error: Problem creating project (animation directory).');
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
			animationsDir(dirPath, callback);
		}
	});

}

// Creates the new project on disk.
function setupNew () {

	var projectNew = document.getElementById('project_new');

	projectNew.addEventListener('change', function () {

		var projectLocation = projectNew.value;
		var projectName = localStorage.getItem('projectName');
		var projectPath = path.join(projectLocation, projectName);

		projectNew.value = '';

		createDir(projectPath, function afterCreate () {
			writeInfo(projectName, projectPath, mainWindow);
		});

	});

}

// Opens an existing project.
function setupLoad () {

	var projectLoad = document.getElementById('project_load');

	projectLoad.addEventListener('change', function () {

		var projectPath = projectLoad.value;
		var infoFile = path.join(projectPath, 'project-metadata.json');

		checkProject(infoFile, function afterCheck () {
			readInfo(projectPath, infoFile);
			mainWindow();
		});

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
