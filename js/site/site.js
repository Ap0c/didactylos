// ----- Requires ----- //

var fs = require('fs');
var marked = require('marked');
var path = require('path');
var styles = require('./export_styles');
var scripts = require('./build_scripts');


// ----- Functions ----- //

// Takes the page content and wraps it in HTML boilerplate.
function buildPage (title, content, filename) {

	return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB" xml:lang="en-GB">
<head>
<meta c="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">	
<link rel="stylesheet" href="styles/main.css">
<link rel="stylesheet" href="styles/${filename}.css">
<script type="text/javascript" src="scripts/${filename}.js"></script>
<title>${title}</title>
</head>
<body>
	<section id="content">
		${content}
	</section>
</body>
</html>
`;

}

// Converts a string to one that is filesystem/url friendly.
function sanitiseName (name) {
	return name.replace(' ', '_').toLowerCase();
}

// Custom link renderer to handle files and animations.
function linkRenderer (animations) {

	return function handleLinks (href, title, text) {

		if (href.substring(0, 5) === 'file:') {

			var link = sanitiseName(href.substring(5));
			href = `${link}.html`;

		} else if (href.substring(0, 10) === 'animation:') {

			var id = sanitiseName(href.substring(10));
			animations.push({ name: href.substring(10), id: id });
			return `<canvas id="${id}" width="500" height="400">${text}</canvas>`;

		}

		return `<a href="${href}">${text}</a>`;

	};

}

// Creates a custom marked renderer to handle file links and animation embeds.
function customRenderer () {

	var renderer = new marked.Renderer();
	var animations = [];

	renderer.link = linkRenderer(animations);

	return {
		renderer: renderer,
		animations: animations
	};

}

// Exports a file and its associated assets.
function exportFile (target, project, file) {

	var renderer = customRenderer();
	var filepath = path.join(project.path(), project.file(file));
	var filename = sanitiseName(file);

	fs.readFile(filepath, 'utf-8', function (err, data) {

		var content = marked(data, {renderer: renderer.renderer});
		var page = buildPage(file, content, filename);

		fs.writeFile(path.join(target, `${filename}.html`), page);
		styles.exportStyles(target, project.styles(file), filename);
		scripts.build(target, project, renderer.animations, filename);

	});

}

// Sets up the directories and prerequisite files (e.g. main.css).
function setupDirectories (location) {

	var styleLocation = path.join(location, 'styles/main.css');

	fs.mkdir(path.join(location, 'styles'));
	fs.mkdir(path.join(location, 'scripts'));

	fs.readFile(path.join(__dirname, 'main.css'), function (err, data) {
		fs.writeFile(styleLocation, data);
	});

}

// Exports the site to an external folder.
function exportSite (location, project) {

	var files = project.files();
	setupDirectories(location);

	for (var i = 0, noFiles = files.length; i < noFiles; i++) {
		exportFile(location, project, files[i]);
	}

}


// ----- Exports ----- //

module.exports = {
	exportSite: exportSite
};
