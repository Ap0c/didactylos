// ----- Requires ----- //

var fileMenu = require('./fileMenu.js');


// ----- Export ----- //

exports.build = function buildMenus (gui, file) {

	// ----- Setup ----- //

	// Creates the menu bar.
	var menu = new gui.Menu({ type: 'menubar' });


	// ----- Functions ----- //

	// Creates the default OS X menu controls.
	function buildMacMenu () {
		menu.createMacBuiltin('Didactylos');
	}

	// Adds an item to the menu.
	function addMenuItem (menu, item) {

		var menuItem = new gui.MenuItem(item);
		menu.append(menuItem);

	}

	// Creates the File submenu (to hold Open, Save, etc.).
	function buildFileSubmenu () {

		var fileSubmenu = new gui.Menu();
		var menuItems = fileMenu.items(gui, file);

		for (var item in menuItems) {
			addMenuItem(fileSubmenu, menuItems[item]);
		}

		return fileSubmenu;

	}

	// Creates the File option on the menu bar.
	function addFileMenu () {

		var fileSubmenu = buildFileSubmenu();

		var fileMenu = new gui.MenuItem({
			label: 'File',
			submenu: fileSubmenu
		});

		menu.insert(fileMenu, 1);

	}


	// ----- Build GUI ----- //

	// Builds the menus.
	buildMacMenu();
	addFileMenu();

	// Adds the menu to the window.
	gui.Window.get().menu = menu;

};
