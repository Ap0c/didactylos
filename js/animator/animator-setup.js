// ----- Functions ----- //

function setup () {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = '#ffffff';
	ctx.fillRect(0, 0, 500, 400);

}


// ----- Page Load ----- //

document.addEventListener('DOMContentLoaded', setup);
