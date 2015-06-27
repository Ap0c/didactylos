// ----- Requires ----- //

var fileMenu = require('./editor/fileMenu.js');
var insertMenu = require('./editor/insertMenu.js');


// ----- Export ----- //

module.exports = function Menus (gui, file, toolbar) {

	// ----- Setup ----- //

	// Creates the menu bar.
	var menu = new gui.Menu({ type: 'menubar' });


	// ----- Functions ----- //

	// Creates the default OS X menu controls.
	function buildMacMenu () {
		menu.createMacBuiltin('Didactylos');
		gui.Window.get().menu = menu;
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
	function editorMenubar () {

		var fileMenuItems = fileMenu.items(gui, file);
		addMenu('File', 1, fileMenuItems);

		var insertMenuItems = insertMenu.items(toolbar);
		addMenu('Insert', 3, insertMenuItems);

	}


	// ----- Build GUI ----- //

	return {
		macMenu: buildMacMenu,
		editor: editorMenubar
	};

};
