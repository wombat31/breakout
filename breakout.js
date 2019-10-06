var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI *2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    //check whether the ball has hit the sides
    if(x + ballRadius > canvas.width || x - ballRadius < 0){
        dx= -dx;
    }

    if(y  - ballRadius < 0 ){ 
        dy = -dy;
    } else if (y + ballRadius> canvas.height) {
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
        }
    }

    if(rightPressed && paddleX + paddleWidth < canvas.width) {
        paddleX +=7;
    } else if(leftPressed && paddleX > 0){
        paddleX -=7;
    }

    //increments values for the ball to make it move
    x += dx;
    y += dy;
}
//add listener events for keypresses
document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler,false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}


var interval = setInterval(draw, 10);