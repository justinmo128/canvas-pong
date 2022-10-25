function startScreen() {
    drawMainComponents();
    // Left half of text
    ctx.font = "20px Roboto";
    ctx.textAlign = "right";
    ctx.fillText("P1 Controls: WS ", 480, 550);
    ctx.font = "50px Roboto";
    ctx.fillText("Po ", 480, 100);
    ctx.font = "30px Roboto";
    ctx.fillText("Press Enter ", 480, 500);

    // Right half of text
    ctx.font = "20px Roboto";
    ctx.textAlign = "left";
    ctx.fillText(" P2 Controls: Arrow Keys", 480, 550);
    ctx.font = "50px Roboto";
    ctx.fillText(" ng", 480, 100);
    ctx.font = "30px Roboto";
    ctx.fillText(" to start", 480, 500);
}

function gameLoop() {
    movePaddles();
    moveBall();
    checkScore();
    drawMainComponents();
    drawGameElements();
}

function drawMainComponents() {
    // Background
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    // FPS
    let fps = 1000 / (currentTime - lastFrameOccurence);
    fps = Math.round(fps);
    lastFrameOccurence = currentTime;
    ctx.textAlign = "left";
    ctx.font = "14px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText(`FPS: ${fps}`, 10, 20)
    // Center line
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    let i = 0;
    while (i < 1000) {
        ctx.beginPath();
        ctx.moveTo(480, i);
        i += 20;
        ctx.lineTo(480, i);
        ctx.stroke();
        i += 10;
    }
}

function drawGameElements() {
    ctx.fillStyle = "white";
    // Paddles and ball
    ctx.fillRect(50, paddle1.y, 10, 100);
    ctx.fillRect(900, paddle2.y, 10, 100);
    ctx.fillRect(ball.x, ball.y, 10, 10);
    // Score
    ctx.textAlign = "center";
    ctx.font = "60px Roboto";
    ctx.fillText(`${p1Score}`, cnv.width / 4, 70);
    ctx.fillText(`${p2Score}`, cnv.width / 4 * 3, 70);
}

function movePaddles() {
    // P1 movement
    if (p1Up) {
        paddle1.y += -3;
    }
    if (p1Down) {
        paddle1.y += 3;
    }
    // P2 movement
    if (p2Up) {
        paddle2.y += -3;
    }
    if (p2Down) {
        paddle2.y += 3;
    }
}

function moveBall() {
    // Check if the ball hits a paddle, then send it
    // at a random angle.
    if (ball.x <= 60 && ball.y >= paddle1.y && ball.y <= paddle1.y + 100) {
        ball.dir = true;
    } else if (ball.x >= 890 && ball.y >= paddle2.y && ball.y <= paddle2.y + 100) {
        ball.dir = false;
    }
    if (ball.dir) {
        ball.x += 3;
    } else {
        ball.x += -3;
    }
}

function checkScore() {
    if (ball.x <= 5) {
        p2Score++;
        ballReset();
    } else if (ball.x >= cnv.width - 5) {
        p1Score++;
        ballReset();
    }
}

function ballReset() {
    gameState = "scorePause";
    if (ball.dir === true) {
        ball = {
            x: 60,
            y: 50 + paddle1.y,
            angle: ball.angle,
            dir: ball.dir,
        }
    } else {
        ball = {
            x: 870,
            y: 50 + paddle2.y,
            angle: ball.angle,
            dir: ball.dir,
        }
    }
    setTimeout(() => {gameState = "gameLoop";}, 2000);
}