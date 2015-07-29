// ----- Functions ----- //

function serialise (drawings) {

	var serialisedDrawings = [];

	for (i = 0, len = drawings.number; i < len; i++) {

		var serialisable = drawings.get(i).serialAttrs();
		var serialised = JSON.parse(serialisable);
		serialisedDrawings.push(serialised);

	}

	return serialisedDrawings;

}


// ----- Module Exports ----- //

module.exports = {
	serialise: serialise
};
