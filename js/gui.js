// ----- Requires ----- //

var gui = require('nw.gui');


// ----- Setup ----- //

var menu = new gui.Menu({ type: 'menubar' });


// ----- Functions ----- //

function buildMacMenu () {
	menu.createMacBuiltin('Didactylos');
}

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

function buildFileOpen (fileMenu) {

	var fileOpen = new gui.MenuItem({

		label: 'Open',
		key: 'o',
		modifiers: 'cmd',
		click: function () {
			var fileInput = document.getElementById('file_open');
			fileInput.click();
		}

	});

	fileMenu.append(fileOpen);

}

function buildFileSave (fileMenu) {

	var fileSave = new gui.MenuItem({

		label: 'Save',
		key: 's',
		modifiers: 'cmd',
		click: function () {
			
		}

	});

	fileMenu.append(fileSave);

}

function buildFileMenu () {

	var fileMenu = new gui.Menu();

	buildFileNew(fileMenu);
	buildFileOpen(fileMenu);
	buildFileSave(fileMenu);

	return fileMenu;

}

function addFileMenu () {

	var fileMenuContent = buildFileMenu();

	var fileMenu = new gui.MenuItem({
		label: 'File',
		submenu: fileMenuContent
	});

	menu.insert(fileMenu, 1);

}


// ----- Build ----- //

buildMacMenu();
addFileMenu();
gui.Window.get().menu = menu;
