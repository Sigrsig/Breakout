"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");


/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =================
// KEYBOARD HANDLING
// =================

    var g_keys = [];

    function handleKeydown(evt) {
        g_keys[evt.keyCode] = true;
    }

    function handleKeyup(evt) {
        g_keys[evt.keyCode] = false;
    }

    function eatKey(keyCode) {
        var isDown = g_keys[keyCode];
        g_keys[keyCode] = false;
        
        return isDown;
    }

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);


// ==========
// BALLS
// ==========

// I had issues with moving this portion to another file so I kept it in jsmain.js

    // Constructors for the two available balls
function Ball(descr) {
        for (var property in descr) {
            this[property] = descr[property];
        }
    }

    var g_ball = new Ball({
        cx: 300,
        cy: 300,
        radius: 10,

        xVel: 5,
        yVel: 4
    });

    var o_ball = new Ball({
        cx: 300,
        cy: 300,
        radius: 10,

        xVel: 5,
        yVel: 4
    });


    // The ball's direction and velocity. When a ball collides with a brick or paddle its y
    // velocity is inverted. An if statement is used for the double paddle powerup

Ball.prototype.update = function () {
    // Ball's previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute the ball's next position
    var nextX = prevX + this.xVel;
    var nextY = prevY + this.yVel;

    // Bounce off the paddles and bricks
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius)){
        this.yVel *= -1;
    }

    if (doublePaddle){
        if (o_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius)){
            this.yVel *= -1;
        }
    }
    
    if (brickCollide(prevX, prevY, nextX, nextY, this.radius)){
    		this.yVel *= -1;
    }

    
    // If the ball hits the top of the frame the y velocity is inverted
    if (nextY < 0 ) {               
        this.yVel *= -1;
    }
    
    // If the ball hits the bottom of the screen a life is lost and the ball resets
    if (nextY > g_canvas.height) {
    		loseLife();
        g_ball.reset();
        if (doubleBall) {o_ball.reset();}
    }

    // x velocity is inverted if the ball hits the sides of the frame
    if ((nextX < 0) || (nextX > g_canvas.width)) {
        this.xVel *= -1;
    }
 
    // Update ball's position
    this.cx += this.xVel;
    this.cy += this.yVel;
};

Ball.prototype.reset = function () {
    this.cx = 300;
    this.cy = 400;
    this.xVel = 5;
    this.yVel = -4;
};

Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius, this.xVel, this.yVel);
};



// =====
// UTILS
// =====

    // Clear canvas
function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

    // Draw ball function
function fillCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

    // Ball render
Ball.prototype.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius, this.xVel, this.yVel);
};

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



    // A function that is called after a game over to reset the balls, paddles, bricks, 
    // and power ups
function gameReset(){
		lives = 3;
    g_ball.reset();
    o_ball.reset();
    
    g_paddle1.halfWidth = 50;
    o_paddle1.halfWidth = 50;
        
    doubleBall = false;
    doublePaddle = false;
    bigPadd = false;
    smallPadd = false;
    
    for (var i=0; i<columnNum; i++) {
    		for (var j=0; j<rowNum; j++) {
                bricks[i][j].clear = false;
            }
        }
        
}


// =============
// GATHER INPUTS
// =============

function gatherInputs() {}


// =================
// UPDATE SIMULATION
// =================

    // Simulation updated, if double ball or double paddle upgrades are active they are 
    // also updated
function updateSimulation() {
    if (shouldSkipUpdate()) return;

    g_ball.update();
    if (doubleBall){o_ball.update();}
    
    g_paddle1.update();
    if (doublePaddle) {o_paddle1.update();}

}

window.requestAnimationFrame(updateSimulation);

    // Togglable Pause Mode (P) and single step (O)
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP  = 'O'.charCodeAt(0);

var g_isUpdatePaused = false;

function shouldSkipUpdate() {
    if (eatKey(KEY_PAUSE)) {
        g_isUpdatePaused = !g_isUpdatePaused;       	
    }
    
    return g_isUpdatePaused && !eatKey(KEY_STEP);    
}

function updateNext() {
	if (eatKey(KEY_STEP)) {
        updateSimulation();      	
    }
}

var KEY_RESET = 'C'.charCodeAt(0);

if (g_keys[KEY_RESET]){
		gameReset();
}



// =================
// RENDER SIMULATION
// =================

function renderSimulation(ctx) {
    clearCanvas(ctx);
    
    ctx.fillStyle = 'White';
    
    g_ball.render(ctx);    
    if (doubleBall){o_ball.render(ctx);}
    
    g_paddle1.render(ctx);
    if (doublePaddle) {o_paddle1.render(ctx);}
    
    setLives();
    
    setColor();
    drawBricks();
}

// =========
// MAIN LOOP
// =========

function mainIter() {
    if (!requestedQuit()) {
        gatherInputs();
        updateSimulation();
        renderSimulation(g_ctx);
    } else {
        window.clearInterval(intervalID);
    }
}

// Simple voluntary quit mechanism
//
var KEY_QUIT = 'Q'.charCodeAt(0);
function requestedQuit() {
    return g_keys[KEY_QUIT];
}

// ..and this is how we set it all up, by requesting a recurring periodic
// "timer event" which we can use as a kind of "heartbeat" for our game.
//
var intervalID = window.setInterval(mainIter, 16.666);

//window.focus();