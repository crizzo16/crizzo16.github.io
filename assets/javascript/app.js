
let canvas = document.getElementById("mainCanvas");
let canvasWidth = canvas.width = 450;
let canvasHeight = canvas.height = 450;
let cancan = canvas.getContext("2d");
let go = true;

let requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;



function run() {
    go = true;
    ball.x = 30;
    ball.y = 30;
    ball.dy = 4;
    ball.dx = 3;
    requestAnimationFrame(moveBall);
}

function stop() {
    go = false;
}

let ball = {
    x: 30,
    y: 30,
    dx: 3,
    dy: 4,
    radius: 20
};

let player = {
  x: 50,
  y: canvasHeight-20,
  motion: 0,
  height: 20,
  width: 100
}


function moveBall() {
    cancan.clearRect(0, 0, canvasWidth, canvasHeight);

    cancan.fillStyle = "#eeeeee";
    cancan.fillRect(0, 0, canvasWidth, canvasHeight);



    cancan.beginPath();
    cancan.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    cancan.closePath();
    cancan.fillStyle = "#4ca3e8";
    cancan.fill();
  
    cancan.fillStyle = "#111111";
    cancan.fillRect(player.x, player.y, player.width, player.height);
    player.x += player.motion;
    

    if ((ball.x + ball.radius) >= canvasWidth || (ball.x - ball.radius) <= 0) {
        ball.dx = -ball.dx;
    }
    
    if ((ball.x > player.x && ball.x < (player.x+player.width)) && (ball.y+ball.radius > player.y)) {
        ball.dy = -ball.dy;
    } else if ((ball.y + ball.radius) >= canvasHeight) {
        ball.dy = 0;
        ball.dx = 0;
    } else if ((ball.y - ball.radius) <= 0) {
        ball.dy = -ball.dy;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (go) {
        requestAnimationFrame(moveBall);
    }
}
moveBall();

document.onkeydown = function (event) {
  let code = event.key;
  if (code === "ArrowLeft") {
    //Left Arrow Key
    player.motion = -4;
    if (player.x <= 0) {
        player.motion = 0;
    }
  } else if (code === "ArrowRight") {
    //Right Arrow Key
    player.motion = 4;
    if ((player.x+player.width) >= canvasWidth) {
        player.motion = 0;
    }
  }

  
}
document.onkeyup = function (event) {
 
    player.motion = 0;
  
}