module.exports = function Sidebar (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var sidebar = document.getElementById('sidebar');
	var currentFile = null;


	// ----- Functions ----- //

	// Updates the appearance of the selected file.
	function updateSelection (newSelection) {

		if (currentFile) {
			currentFile.classList.remove('selected_file');
		}

		currentFile = newSelection;
		currentFile.classList.add('selected_file');

	}

	// Adds a file to the sidebar.
	function addFile (name, fileOpen) {

		var fileDiv = document.createElement('div');
		var filename = document.createTextNode(name);

		fileDiv.appendChild(filename);
		sidebar.appendChild(fileDiv);

		fileDiv.addEventListener('click', function () {
			fileOpen(name);
			updateSelection(fileDiv);
		});

	}

	// Fills the sidebar with project files.
	function populateFiles (files, fileOpen) {

		var noFiles = files.length;

		for (var i = 0; i < noFiles; i++) {
			addFile(files[i], fileOpen);
		}

		sidebar.firstChild.click();

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
