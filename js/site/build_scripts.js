// ----- Requires ----- //

var fs = require('fs');
var path = require('path');


// ----- Functions ----- //

function writeScript (target, animations, filename) {

	fs.readFile(path.join(__dirname, 'page_script.js'), function (err, data) {

		var script = `${animations}\n\n${data}`;
		fs.writeFile(path.join(target, `scripts/${filename}.js`), script);

	});

}


function build (target, project, animationData, filename) {

	var animations = 'var canvases = {\n';

	for (var i = 0, noNames = animationData.length; i < noNames; i++) {

		var filepath = project.animation(animationData[i].name);
		var animationPath = path.join(project.animPath(), filepath);
		var animation = fs.readFileSync(animationPath, 'utf-8');
		animations = `${animations}${animationData[i].id}: ${animation},\n`;

	}

	animations = `${animations}};`;
	writeScript(target, animations, filename);

}


// ----- Module Exports ----- //

module.exports = {
	build: build
};
