// ----- Requires ----- //

var events = require('events');

var fileMenu = require('./fileMenu.js');
var insertMenu = require('./insertMenu.js');


// ----- Export ----- //

module.exports = function menus (gui) {

	// ----- Setup ----- //

	// Creates the menu bar.
	var menu = new gui.Menu({ type: 'menubar' });
	var Menus = new events.EventEmitter();
	var editor = [];
	var animator = [];


	// ----- Functions ----- //

	// Activate editor menus and disable animator menus.
	function activateEditor () {

		for (var i = editor.length - 1; i >= 0; i--) {
			editor[i].enabled = true;
		}

		for (var j = animator.length - 1; j >= 0; j--) {
			animator[j].enabled = false;
		}

	}

	// Activate animator menus and disable editor menus.
	function activateAnimator () {

		for (var i = editor.length - 1; i >= 0; i--) {
			editor[i].enabled = false;
		}

		for (var j = animator.length - 1; j >= 0; j--) {
			animator[j].enabled = true;
		}

	}

	// Creates the default OS X menu controls.
	function buildMacMenu () {
		menu.createMacBuiltin('Didactylos');
		gui.Window.get().menu = menu;
	}

	// If the menu item belongs to a specific window, add it to that array.
	function attachWindow (win, menuItem) {

		if (win === 'editor') {
			editor.push(menuItem);
		} else if (win === 'animator') {
			animator.push(menuItem);
		}

	}

	// Adds a submenu to the menubar.
	function addSubmenu (menuItems) {

		var subMenu = new gui.Menu();

		for (var i = 0, noItems = menuItems.length; i < noItems; i++) {

			var item = menuItems[i];
			var menuItem = new gui.MenuItem(item.menu);

			subMenu.append(menuItem);
			attachWindow(item.win, menuItem);

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

	// Sets up the click events for the items in a menu.
	function menuEvent (menuName) {

		return function clickEvent (info) {
			return function emitClick () {
				Menus.emit(menuName, info);
			};
		};

	}

	// Builds out the menubar with menus.
	function menubar () {

		var insertMenuItems = insertMenu.items(menuEvent('insert'));
		addMenu('Insert', 3, insertMenuItems);

		var fileMenuItems = fileMenu.items(menuEvent('file'));
		addMenu('File', 1, fileMenuItems);

	}


	// ----- Constructor ----- //

	Menus.macMenu = buildMacMenu;
	Menus.menubar = menubar;
	Menus.activateAnimator = activateAnimator;
	Menus.activateEditor = activateEditor;

	return Menus;

};
