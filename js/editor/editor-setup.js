// ----- Requires ----- //

var gui = require('nw.gui');

var Editor = require('../js/editor/editor.js');
var Toolbar = require('../js/editor/toolbar.js');
var Sidebar = require('../js/editor/sidebar.js');
var File = require('../js/editor/file.js');
var menus = require('../js/editor/menus.js');
var tools = require('../js/editor/editing-tools.js');


// ----- Functions ----- //

// Builds the components linked to objects on the page.
function viewComponents () {

	var editor = Editor(window);
	var toolbar = Toolbar(window);
	var sidebar = Sidebar(window);

	return {
		editor: editor,
		toolbar: toolbar,
		sidebar: sidebar
	};

}

// Updates the window title with the project title.
function updateTitle () {

	var projectName = localStorage.getItem('projectName');
	document.title = projectName;

}

// Populates the sidebar with project files.
function buildSidebar (sidebar, file) {

	var projectPath = localStorage.getItem('projectPath');

	file.projectFiles(projectPath, function (files) {
		sidebar.build(files);
	});

}

// Sets up various components of the editor (e.g. file handling).
function setup () {

	window.focus();
	updateTitle();

	var view = viewComponents();
	var file = File(view.editor, view.sidebar);

	buildSidebar(view.sidebar, file);
	menus.build(gui, file, view.toolbar);
	tools.setup(view.toolbar, view.editor);

	editor.focus();

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
