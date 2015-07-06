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
	function addFile (name, switchFile) {

		var fileDiv = document.createElement('div');
		var filename = document.createTextNode(name);

		fileDiv.appendChild(filename);
		sidebar.appendChild(fileDiv);
		updateSelection(fileDiv);

		fileDiv.addEventListener('click', function () {
			switchFile(name);
			updateSelection(fileDiv);
		});

	}

	// Fills the sidebar with project files.
	function populateFiles (files, fileOpen, switchFile) {

		var noFiles = files.length;

		for (var i = 0; i < noFiles; i++) {
			addFile(files[i], switchFile);
		}

		var firstFile = sidebar.firstChild;

		if (firstFile) {
			fileOpen(firstFile.textContent);
			updateSelection(firstFile);
		}

	}

	// Prompts the user for a new file name.
	function newFile (message) {

		return window.prompt(message, 'My File');

	}

	// Returns the name of the current file.
	function activeFile () {
		return currentFile.textContent;
	}

	// ----- Constructor ----- //

	return {
		addFile: addFile,
		build: populateFiles,
		newFile: newFile,
		activeFile: activeFile
	};

};
