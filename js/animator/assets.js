// ----- Requires ----- //

var path = require('path');


// ----- Exports ----- //

module.exports = function Assets (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var assets = document.getElementById('assets');
	var assetPath = '../assets';


	// ----- Functions ----- //

	// Adds an asset to the asset sidebar.
	function addAsset (name, assetFile) {

		// var assetDiv = document.createElement('div');
		var assetImage = document.createElement('img');
		assetImage.src = path.join(assetPath, assetFile);

		assets.appendChild(assetImage);

	}


	// ----- Constructor ----- //

	return {
		add: addAsset
	};

};
