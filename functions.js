function startScreen() {
    drawMainComponents();
    p1Score = 0;
    p2Score = 0;
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
    checkWin();
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
        paddle1.y += -10;
    }
    if (p1Down) {
        paddle1.y += 10;
    }
    // Check if paddle hits top/bottom
    if (paddle1.y >= cnv.height - 50) {
        paddle1.y = cnv.height - 50
    } else if (paddle1.y <= -50) {
        paddle1.y = -50;
    }
    // P2 movement
    if (p2Up) {
        paddle2.y += -7;
    }
    if (p2Down) {
        paddle2.y += 7;
    }
    // Check if paddle hits top/bottom
    if (paddle2.y >= cnv.height - 50) {
        paddle2.y = cnv.height - 50
    } else if (paddle2.y <= -50) {
        paddle2.y = -50;
    }
}

function moveBall() {
    // Check if the ball hits a paddle, then send it at a random angle. Also increase ball speed
    if (ball.x <= 60 && ball.x >= 50 && ball.y >= paddle1.y - 10 && ball.y <= paddle1.y + 100 ||
    ball.x >= 890 && ball.x <= 900 && ball.y >= paddle2.y - 10 && ball.y <= paddle2.y + 100) {
        ball.dir = !ball.dir;
        ball.angle = Math.random() * 160;
        ball.speed += 0.1;
    }
    // Check if the ball hits the top or bottom, then send it at the opposite of its current angle.
    if (ball.y <= 0 || ball.y >= 710) {
        ball.angle *= -1;
    }
    // Move ball
    if (ball.dir) {
        ball.x += ball.speed;
        ball.y += (ball.angle % 90) / ball.speed; // Pretty sure this angle calculation is inaccurate but whatever
    } else {
        ball.x += ball.speed * -1;
        ball.y += (ball.angle % 90) / ball.speed; // Something something rise over run
    }
}

function checkScore() {
    if (ball.x <= 50) {
        p2Score++;
        ballReset();
    } else if (ball.x >= 900) {
        p1Score++;
        ballReset();
    }
}

function checkWin() {
    if (p1Score === 5 || p2Score === 5) {
        gameState = "win";
    }
}

function winScreen() {
    if (p1Score === 5) {
        ctx.textAlign = "center";
        ctx.font = "50px Roboto";
        ctx.fillStyle = "white";
        ctx.fillText("P1 WIN", 240, 360);
        setTimeout(() => {p1Score = 0; gameState = "start";}, 5000);
    } else if (p2Score === 5) {
        ctx.textAlign = "center";
        ctx.font = "50px Roboto";
        ctx.fillStyle = "white";
        ctx.fillText("P2 WIN", 720, 360);
        setTimeout(() => {gameState = "start";}, 5000);
    }
}

function ballReset() {
    gameState = "";
    speedIncrement = p1Score + p2Score;
    if (ball.dir === true) {
        ball = {
            x: 65,
            y: 50 + paddle1.y,
            angle: ball.angle,
            dir: ball.dir,
            speed: 7,
        }
    } else {
        ball = {
            x: 870,
            y: 50 + paddle2.y,
            angle: ball.angle,
            dir: ball.dir,
            speed: 7,
        }
    }
    setTimeout(() => {gameState = "gameLoop";}, 2000);
}