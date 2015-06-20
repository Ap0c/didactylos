exports.items = function items (gui, toolbar) {

	// ----- Setup ----- //

	var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];


	// ----- Functions ----- //

	// Creates a menu separator.
	function separator () {
		return { type: 'separator' };
	}

	// Simulates a click on an item in the toolbar.
	function clickTool (name) {
		return function () {
			toolbar.click(name);
		};
	}

	// Adds headings to the insert menu list.
	function addHeadings (menuItems) {

		for (var i = headings.length - 1; i >= 0; i--) {

			var headingMenuItem = {
				label: headings[i].toUpperCase(),
				click: clickTool(headings[i])
			};

			menuItems.unshift(headingMenuItem);

		}

	}

	// Builds the list of items to be added to the insert menu.
	function menuItems () {

		var items = [];
		var otherItems = [separator(), italicsTool, boldTool, separator(),
			bulletTool, linkTool, codeTool];

		addHeadings(items);

		items.push.apply(
			items,
			otherItems
		);

		return items;

	}


	// ----- Menu Items ----- //

	var italicsTool = {
		label: 'Italics',
		key: 'i',
		modifiers: 'cmd',
		click: clickTool('italics')
	};

	var boldTool = {
		label: 'Bold',
		key: 'b',
		modifiers: 'cmd',
		click: clickTool('bold')
	};

	var bulletTool = {
		label: 'Bullet',
		key: 'b',
		modifiers: 'cmd-shift',
		click: clickTool('bullet')
	};

	var linkTool = {
		label: 'Link',
		key: 'l',
		modifiers: 'cmd',
		click: clickTool('link')
	};

	var codeTool = {
		label: 'Code Block',
		key: 'c',
		modifiers: 'cmd-shift',
		click: clickTool('code')
	};


	// ----- Return ----- //

	return menuItems();

};
