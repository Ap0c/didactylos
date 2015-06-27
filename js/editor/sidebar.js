module.exports = function Sidebar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var sidebar = document.getElementById('sidebar');

	// ----- Functions ----- //

	// Adds a file to the sidebar.
	function addFile (name) {

		var fileDiv = document.createElement('div');
		var filename = document.createTextNode(name);

		fileDiv.appendChild(filename);
		sidebar.appendChild(fileDiv);

	}

	// Fills the sidebar with project files.
	function populateFiles (files) {

		var noFiles = files.length;

		for (var i = 0; i < noFiles; i++) {
			addFile(files[i]);
		}

	}

	// Prompts the user for a new file name.
	function newFile (message) {

		var name = window.prompt(message, 'My File');

		if (name !== null) {

			var projectPath = window.localStorage.getItem('projectPath');

			return {
				name: name,
				path: projectPath
			};

		} else {
			return null;
		}

	}

	// ----- Constructor ----- //

	return {
		addFile: addFile,
		build: populateFiles,
		newFile: newFile
	};

};
