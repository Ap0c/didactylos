// ----- Requires ----- //

var gui = require('nw.gui');

var Editor = require('../js/editor/editor.js');
var Toolbar = require('../js/editor/toolbar.js');
var Sidebar = require('../js/editor/sidebar.js');
var Stylebar = require('../js/editor/stylebar.js');
var File = require('../js/editor/file.js');
var Menus = require('../js/editor/menus/menus.js');
var Project = require('../js/editor/project.js');
var tools = require('../js/editor/editing-tools.js');
var styles = require('../js/editor/style-tools.js');
var Animator = require('../js/editor/animator-new.js');


// ----- Setup ----- //

var editorWindow = gui.Window.get();


// ----- Functions ----- //

// Builds the components linked to objects on the page.
function viewComponents () {

	var editor = Editor(window);
	var toolbar = Toolbar(window);
	var sidebar = Sidebar(window);
	var stylebar = Stylebar(window);

	return {
		editor: editor,
		toolbar: toolbar,
		sidebar: sidebar,
		stylebar: stylebar
	};

}

// Updates the window title with the project title.
function updateTitle () {

	var projectName = localStorage.getItem('projectName');
	document.title = projectName;

}

// Populates the sidebar with project files.
function buildSidebar (sidebar, file, project) {

	var files = project.files();
	sidebar.build(files, file.open, file.switch);

}

// Handles the user closing the window.
function setupClose (file, animator) {

	editorWindow.on('close', function closeApp () {
		file.save();
		animator.closeWindows();
		editorWindow.close(true);
	});

}

// Sets up handling of options from the insert menu.
function insertMenu (menus, toolbar) {

	menus.on('insert', function insertEvent (item) {
		toolbar.click(item);
	});

}

// Sets up handling of options from the file menu.
function fileMenu (menus, file, animator) {

	menus.on('file', function fileEvent (item) {

		switch (item) {
			case 'new':
				file.newFile();
				break;
			case 'save':
				file.save();
				break;
			case 'newAnim':
				animator.newAnimation();
				break;
			case 'openAnim':
				animator.openAnimation('try');
				break;
			case 'saveAnim':
				animator.saveAnimation();
		}

	});

}

// Builds the main menubar.
function buildMenus (menus, views, file, animator) {

	menus.macMenu();
	menus.menubar();
	insertMenu(menus, views.toolbar);
	fileMenu(menus, file, animator);

}

// Sets up various components of the editor (e.g. file handling).
function setup () {

	updateTitle();

	var views = viewComponents();
	var project = Project(localStorage.getItem('projectInfo'));
	var file = File(views, project);
	var menus = Menus(gui);
	var animator = Animator(gui, file);

	buildMenus(menus, views, file, animator);
	buildSidebar(views.sidebar, file, project);
	tools.setup(views.toolbar, views.editor, project);
	styles.setup(project, views);
	setupClose(file, animator);

	editor.focus();

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
