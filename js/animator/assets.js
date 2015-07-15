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
	function addAsset (name) {

		if (assetList[name]) {
			throw new Error(`Asset '${name}' already exists.`);
		} else {

			var assetImage = document.createElement('img');
			assetImage.src = path.join(assetPath, `${name}.svg`);

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

	// Populates the assets sidebar with drawings.
	function build (assetNames) {

		for (var i = assetNames.length - 1; i >= 0; i--) {
			addAsset(assetNames[i]);
		}

	}


	// ----- Constructor ----- //

	return {
		build: build,
		add: addAsset,
		click: clickAsset
	};

};
