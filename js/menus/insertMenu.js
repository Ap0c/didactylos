exports.items = function items (clickEvent) {

	// ----- Setup ----- //

	var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];


	// ----- Functions ----- //

	// Creates a menu separator.
	function separator () {
		return { 
			menu: { type: 'separator' }
		};
	}

	// Adds headings to the insert menu list.
	function buildHeadings () {

		var headingItems = [];

		for (var i = 0, noHeadings = headings.length; i < noHeadings; i++) {

			var headingMenuItem = {
				win: 'editor',
				menu: {
					label: headings[i].toUpperCase(),
					click: clickEvent(headings[i])
				}
			};

			headingItems.push(headingMenuItem);

		}

		return headingItems;

	}

	// Builds the list of items to be added to the insert menu.
	function menuItems () {

		var headingItems = buildHeadings();
		var otherItems = [separator(), italicsTool, boldTool, separator(),
			bulletTool, linkTool, codeTool];

		return headingItems.concat(otherItems);

	}


	// ----- Menu Items ----- //

	var italicsTool = {
		win: 'editor',
		menu: {
			label: 'Italics',
			key: 'i',
			modifiers: 'cmd',
			click: clickEvent('italics')
		}
	};

	var boldTool = {
		win: 'editor',
		menu: {
			label: 'Bold',
			key: 'b',
			modifiers: 'cmd',
			click: clickEvent('bold')
		}
	};

	var bulletTool = {
		win: 'editor',
		menu: {
			label: 'Bullet',
			key: 'b',
			modifiers: 'cmd-shift',
			click: clickEvent('bullet')
		}
	};

	var linkTool = {
		win: 'editor',
		menu: {
			label: 'Link',
			key: 'l',
			modifiers: 'cmd',
			click: clickEvent('link')
		}
	};

	var codeTool = {
		win: 'editor',
		menu: {
			label: 'Code Block',
			key: 'c',
			modifiers: 'cmd-shift',
			click: clickEvent('code')
		}
	};


	// ----- Return ----- //

	return menuItems();

};
