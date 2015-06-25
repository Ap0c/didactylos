// ----- Requires ----- //

var gui = require('nw.gui');

var Editor = require('../js/editor/editor.js');
var File = require('../js/editor/file.js');
var Toolbar = require('../js/editor/toolbar.js');
var menus = require('../js/editor/menus.js');
var tools = require('../js/editor/editing-tools.js');


// ----- Functions ----- //

// Sets up various components of the editor (e.g. file handling).
var setup = function () {

	window.focus();

	var projectName = localStorage.getItem('projectName');
	document.title = projectName;

	var editor = Editor(window);
	var file = File(window, editor);
	var toolbar = Toolbar(window);

	menus.build(gui, file, toolbar);
	tools.setup(toolbar, editor);
	editor.focus();

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
