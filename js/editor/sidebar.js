/* Object to handle the editor window's file browsing sidebar, on the left of
the editor window.
*/

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

	// Adds an animation to the sidebar.
	function createAnimation (name, animationOpen) {

		var animationDiv = document.createElement('div');
		animationDiv.textContent = name;

		animationDiv.addEventListener('click', function () {
			animationOpen(name);
		});

		return animationDiv;

	}

	// Adds an animation to the sidebar.
	function addAnimation (name, animationOpen) {

		var animationSection = document.getElementById('animations');
		var animation = createAnimation(name, animationOpen);
		animationSection.appendChild(animation);

	}

	// Adds project animations to the sidebar.
	function addAnimations (animations, animationOpen) {

		var animationList = document.createDocumentFragment();

		for (var i = 0, noAnims = animations.length; i < noAnims; i++) {
			var animation = createAnimation(animations[i], animationOpen);
			animationList.appendChild(animation);
		}

		var animationSection = document.getElementById('animations');
		animationSection.appendChild(animationList);

	}

	// Creates a file div for the sidebar.
	function createFile (name, switchFile) {

		var fileDiv = document.createElement('div');
		fileDiv.textContent = name;
		updateSelection(fileDiv);

		fileDiv.addEventListener('click', function () {
			switchFile(name);
			updateSelection(fileDiv);
		});

		return fileDiv;

	}

	// Adds a file to the sidebar.
	function addFile (name, switchFile) {

		var fileSection = document.getElementById('files');
		var file = createFile(name, switchFile);
		fileSection.appendChild(file);

	}

	// Adds project files to the sidebar.
	function addFiles (files, fileOpen, switchFile) {

		var fileList = document.createDocumentFragment();

		for (var i = 0, noFiles = files.length; i < noFiles; i++) {
			var file = createFile(files[i], switchFile);
			fileList.appendChild(file);
		}

		if (fileList.firstChild) {
			fileOpen(fileList.firstChild.textContent);
			updateSelection(fileList.firstChild);
		}

		var fileSection = document.getElementById('files');
		fileSection.appendChild(fileList);

	}

	// Fills the sidebar with project files.
	function populateFiles (files, fileOpen, switchFile, animationOpen) {

		addFiles(files.files, fileOpen, switchFile);
		addAnimations(files.animations, animationOpen);

	}

	// Prompts the user for a new file name.
	function newFile (message) {
		return window.prompt(message, 'My File');
	}

	// Returns the name of the current file.
	function activeFile () {
		return currentFile.textContent;
	}

	// Displays a message to the user.
	function message (messageText) {
		window.alert(messageText);
	}

	// Returns the number of drawings on the canvas.
	function noDrawings () {
		return drawings.length;
	}


	// ----- Constructor ----- //

	return {
		addFile: addFile,
		addAnimation: addAnimation,
		build: populateFiles,
		newFile: newFile,
		activeFile: activeFile,
		message: message
	};

};
