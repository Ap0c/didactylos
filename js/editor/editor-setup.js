// ----- Requires ----- //

var gui = require('nw.gui');

var Editor = require('../js/editor/editor.js');
var Toolbar = require('../js/editor/toolbar.js');
var Sidebar = require('../js/editor/sidebar.js');
var File = require('../js/editor/files.js');
var menus = require('../js/editor/menus.js');
var tools = require('../js/editor/editing-tools.js');


// ----- Functions ----- //

// Sets up various components of the editor (e.g. file handling).
var setup = function () {

	window.focus();

	var projectName = localStorage.getItem('projectName');
	var projectPath = localStorage.getItem('projectPath');
	document.title = projectName;

	var editor = Editor(window);
	var toolbar = Toolbar(window);
	var sidebar = Sidebar(window);
	var file = File(editor, sidebar);

	file.projectFiles(projectPath, function (files) {
		sidebar.build(files);
	});
	menus.build(gui, file, toolbar);
	tools.setup(toolbar, editor);
	editor.focus();

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
