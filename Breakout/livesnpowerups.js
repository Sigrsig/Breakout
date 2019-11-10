// ==========
// LIVES
// ==========

    // At the start of the game the player has 3 lives, once heis out of lives a "Game Over"
    // alert comes up and the game resets
var lives = 3;
var gameOver = false;

function loseLife(){
    lives -= 1;
    
    if (lives < 1) {
        alert('Game Over - Press OK to restart'); 
        gameReset();        
    }
}

    // Lives displayed on screen
function setLives() {
    ctx.font = "30px Arial Bold";
  	ctx.fillText('Lives: ' + lives,50,40); 
}



// =============
// Power ups
// =============

    // Several power ups are available in the game. Every time a block is cleared there is a 
    // chance of a power up being added
    // The power ups are: Double balls, Double paddles, Larger paddle and Smaller paddle

var doubleBall = false;
var doublePaddle = false;
var bigPadd = false;
var smallPadd = false;

function powerUpOn() {
	var chance = (Math.random()*30)-1;
    
    if (chance < 8) {
        if (chance <= 1) {
    		doubleBall = true;
        }
        else if (chance <= 3 && chance > 1) {
            doublePaddle = true;
        }
        else if (chance <= 5 && chance > 3) {
            bigPadd = true;
            o_paddle1.halfWidth = 75;
            g_paddle1.halfWidth = 75;
        }
        else if (chance <= 8 && chance > 5) {
            smallPadd = true;
            o_paddle1.halfWidth = 25;
            g_paddle1.halfWidth = 25;
        }
    }
}