// ----- Requires ----- //

var gui = require('nw.gui');

var Editor = require('../js/editor.js');
var File = require('../js/file.js');
var Toolbar = require('../js/toolbar.js');
var menus = require('../js/menus.js');
var tools = require('../js/editing-tools.js');


// ----- Functions ----- //

// Sets up various components of the editor (e.g. file handling).
var setup = function () {

	var editor = Editor(window);
	var file = File(window, editor);
	var toolbar = Toolbar(window);

	menus.build(gui, file, toolbar);
	tools.setup(toolbar, editor);
	editor.focus();

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
