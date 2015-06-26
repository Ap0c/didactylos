module.exports = function Sidebar (window, file) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var sidebar = document.getElementById('sidebar');

	// ----- Functions ----- //

	// Adds a file to the sidebar.
	function addFile (name) {

		var fileDiv = document.createElement('div');
		var filename = document.createTextNode(name);

		fileDiv.append(filename);
		sidebar.append(fileDiv);

	}

	// Fills the sidebar with project files.
	function populateFiles (files) {

		var noFiles = files.length;

		for (var i = 0; i < noFiles; i++) {
			addFile(files[i]);
		}

	}

	// Fills the sidebar with files.
	function init () {

		var projectPath = window.localStorage.getItem('projectPath');
		file.projectFiles(projectPath, populateFiles);

	}

};
