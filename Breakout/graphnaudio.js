// =============
// BRICK COLOUR
// =============

function setColor(){
	var gradient = ctx.createLinearGradient(300, 0, 300, 600);
	gradient.addColorStop(0, '#07575B');
	gradient.addColorStop(1, '#C4DFE6');
	ctx.fillStyle = gradient;
}

// ============
// SOUNDS
// ============

function blockClearSound() {
	var blip = 'Sounds/blip.wav';
    
    var audio = new Audio();
    audio.src = blip;
    audio.play();
}

function paddleSound() {
    var boop = 'Sounds/boop.wav';

    var audio = new Audio();
    audio.src = boop;
    audio.play();
}
