// ============
// PADDLE STUFF
// ============

function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

    // Paddle Width and Height
Paddle.prototype.halfWidth = 50;
Paddle.prototype.halfHeight = 10;

    // Paddle update function depending on key press
Paddle.prototype.update = function () {
    if (g_keys[this.GO_LEFT]) {
 				if(this.cx > Paddle.prototype.halfWidth){
        	this.cx -= 5;}
    } else if (g_keys[this.GO_RIGHT]) {
				if(this.cx < 550){
        	this.cx += 5;}
      else {this.cx -= 0;}
    }
}

    // Paddle render
Paddle.prototype.render = function (ctx) {
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
};

    // Paddle collision function. If hit a sound is played and the ball's y velocity 
    // is inverted
Paddle.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    if(nextY + r >= this.cy - this.halfHeight &&
        nextY - r <= this.cy + this.halfHeight &&
        nextX + r >= this.cx - this.halfWidth &&
        nextX - r <= this.cx + this.halfWidth){
            // It's a hit!
        paddleSound();
        return true;
    }
    // It's a miss!
    return false;
};


    // Paddle g and o constructors
    // g_paddle1 is controlled with A and D
    // o_paddle1 is controlled with J and L

var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);

var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);

var g_paddle1 = new Paddle({
    cx : 300,
    cy : 550,

    GO_LEFT : KEY_A,
    GO_RIGHT : KEY_D
});

var o_paddle1 = new Paddle({
    cx : 300,
    cy : 500,

    GO_LEFT : KEY_J,
    GO_RIGHT : KEY_L
});
