// =========
// BRICK WALL
// =========

    // An array of bricks is created
var bricks = [];
var columnNum = 5;
var rowNum = 4;

var brickHalfWidth = 50;
var brickHalfHeight = 15;

for (var i=0; i<columnNum; i++) {
		bricks[i] = [];
		for (var j=0; j<rowNum; j++) {
    		bricks[i][j] = {
        		x : 0,
            y : 0,
            
            clear : false,
        }
    } 
}

    // Bricks are drawn
function drawBricks() {
		for (var i=0; i<columnNum; i++) {
    		for (var j=0; j<rowNum; j++) {
        		if(bricks[i][j].clear == false){
                    var brickX = ((i+1) * 100-50);
                    var brickY = ((j+1) * 50+50);

                    bricks[i][j].x = brickX;
                    bricks[i][j].y = brickY;

                    ctx.beginPath();
                    ctx.fillRect(brickX, brickY, brickHalfWidth*2-5, brickHalfHeight*2);
           	    }
            }
        }   
}

    // Brick collision. If a brick is hit a sound is played and the brick disappears and
    // the ball's y velocity is inverted
    // A function checks if any power ups should be activated
function brickCollide(prevX, prevY, nextX, nextY, r) {
    for (var i=0; i<columnNum; i++) {
       for (var j=0; j<rowNum; j++) {
           var clCheck = bricks[i][j];
            if(!bricks[i][j].clear){
               if (nextX + r*2 >= clCheck.x - brickHalfWidth && 
                    nextX - r*2 <= clCheck.x + brickHalfWidth &&
                    nextY + r*2 >= clCheck.y - brickHalfHeight &&
                    nextY - r*2 <= clCheck.y + brickHalfHeight) {
           
                        bricks[i][j].clear = true;
                        powerUpOn();
                        
                        blockClearSound();
                        return true;
                }
            }
        }  
    }
}