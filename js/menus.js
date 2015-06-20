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

	// Adds a submenu to the menubar.
	function addSubmenu (menuItems) {

		var subMenu = new gui.Menu();

		for (var item in menuItems) {
			var menuItem = new gui.MenuItem(menuItems[item]);
			subMenu.append(menuItem);
		}

		return subMenu;

	}

	// Adds a menu to the menubar.
	function addMenu (name, position, items) {

		var subMenu = addSubmenu(items);

		var newMenu = new gui.MenuItem({
			label: name,
			submenu: subMenu
		});

		menu.insert(newMenu, position);

	}

	// Builds out the menubar with menus.
	function buildMenubar () {

		var fileMenuItems = fileMenu.items(gui, file);
		addMenu('File', 1, fileMenuItems);

	}


	// ----- Build GUI ----- //

	// Builds the menus.
	buildMacMenu();
	buildMenubar();

	// Adds the menu to the window.
	gui.Window.get().menu = menu;

};
