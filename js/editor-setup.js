// ----- Requires ----- //

// var fs = require('fs');
var Editor = require('../js/editor.js');
var File = require('../js/file.js');
var gui = require('nw.gui');
var menus = require('../js/gui.js');
var tools = require('../js/editing-tools.js');


// ----- Functions ----- //

// Sets up various components of the editor (e.g. file handling).
var setup = function () {

	var editor = Editor(window);
	var file = File(window, editor);
	menus.build(gui, file);

	tools.setupToolbar(document, editor);
	editor.focus();

};


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
