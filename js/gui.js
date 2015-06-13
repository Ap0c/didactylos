// ----- Requires ----- //

var gui = require('nw.gui');


// ----- Setup ----- //

var menu = new gui.Menu({ type: 'menubar' });


// ----- Functions ----- //

function buildMacMenu () {
	menu.createMacBuiltin('Didactylos');
}


// ----- Build ----- //

buildMacMenu();
gui.Window.get().menu = menu;
