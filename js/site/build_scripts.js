/* Creates Javascript files to accompany each exported page in the static site.
These set up several aspects of the page including KaTeX and diagram rendering,
and are based on 'page_script.js'.
*/

// ----- Requires ----- //

var fs = require('fs');
var path = require('path');


// ----- Functions ----- //

// Writes the script to file.
function writeScript (target, animations, filename) {

	fs.readFile(path.join(__dirname, 'page_script.js'), function (err, data) {

		var script = `${animations}\n\n${data}`;
		fs.writeFile(path.join(target, `scripts/${filename}.js`), script);

	});

}

// Creates an object to store the drawings for the canvas.
function compileAnimations (project, animationData) {

	var animations = 'var canvases = {\n';

	for (var i = 0, noNames = animationData.length; i < noNames; i++) {

		var filepath = project.animation(animationData[i].name);
		var animationPath = path.join(project.animPath(), filepath);
		var animation = fs.readFileSync(animationPath, 'utf-8');
		animations = `${animations}${animationData[i].id}: ${animation},\n`;

	}

	return `${animations}};`;

}

// Reads the animator files and prepares them for the page script.
function build (target, project, animationData, filename) {

	var animations = compileAnimations(project, animationData);
	writeScript(target, animations, filename);


}


// ----- Module Exports ----- //

module.exports = {
	build: build
};
