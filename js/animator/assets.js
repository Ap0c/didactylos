// ----- Requires ----- //

var path = require('path');


// ----- Exports ----- //

module.exports = function Assets (window) {

	// ----- Internal Properties ----- //

	var document = window.document;
	var assets = document.getElementById('assets');
	var assetPath = '../assets';

	var assetList = {};


	// ----- Functions ----- //

	// Adds an asset to the asset sidebar.
	function addAsset (name, assetFile) {

		if (assetList[name]) {
			throw new Error(`Asset '${name}' already exists.`);
		} else {

			var assetImage = document.createElement('img');
			assetImage.src = path.join(assetPath, assetFile);

			assets.appendChild(assetImage);
			assetList[name] = assetImage;

		}

	}

	// Assigns a function to be called when an asset is selected.
	function clickAsset (name, callback) {

		var asset = assetList[name];

		if (asset) {

			asset.addEventListener('click', function assetClick () {
				callback();
			});

		} else {
			throw new Error(`Asset '${name}' does not exist.`);
		}

	}


	// ----- Constructor ----- //

	return {
		add: addAsset,
		click: clickAsset
	};

};
