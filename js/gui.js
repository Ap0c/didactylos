// ----- Requires ----- //

var gui = require('nw.gui');


// ----- Setup ----- //

// Creates the menu bar.
var menu = new gui.Menu({ type: 'menubar' });


// ----- Functions ----- //

// Creates the default OS X menu controls.
function buildMacMenu () {
	menu.createMacBuiltin('Didactylos');
}

// Adds the File > New menu item.
function buildFileNew (fileMenu) {

	var fileNew = new gui.MenuItem({

		label: 'New',
		key: 'n',
		modifiers: 'cmd',
		click: function () {
			gui.Window.open('editor.html', { "toolbar": false });
		}

	});

	fileMenu.append(fileNew);

}

// Adds the File > Open menu item.
function buildFileOpen (fileMenu) {

	var fileOpen = new gui.MenuItem({

		label: 'Open',
		key: 'o',
		modifiers: 'cmd',
		click: function () {
			var fileOpen = document.getElementById('file_open');
			fileOpen.click();
		}

	});

	fileMenu.append(fileOpen);

}

// Adds the File > Save menu item.
function buildFileSave (fileMenu) {

	var fileSave = new gui.MenuItem({

		label: 'Save',
		key: 's',
		modifiers: 'cmd',
		click: function () {
			var fileSave = document.getElementById('file_save');
			fileSave.click();
		}

	});

	fileMenu.append(fileSave);

}

// Creates the File submenu (to hold Open, Save, etc.).
function buildFileSubmenu () {

	var fileSubmenu = new gui.Menu();

	buildFileNew(fileSubmenu);
	buildFileOpen(fileSubmenu);
	buildFileSave(fileSubmenu);

	return fileSubmenu;

}

// Creates the File option on the menu bar.
function addFileMenu () {

	var fileMenuContent = buildFileMenu();

	var fileMenu = new gui.MenuItem({
		label: 'File',
		submenu: fileMenuContent
	});

	menu.insert(fileMenu, 1);

}


// ----- Build GUI ----- //

// Builds the menus.
buildMacMenu();
addFileMenu();

// Adds the menu to the window.
gui.Window.get().menu = menu;
