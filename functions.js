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

function gameDraw() {
    drawMainComponents();
    drawGameElements();
}

function gameLogic() {
    movePaddles();
    moveBall();
    checkScore();
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
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.w, paddle1.h);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.w, paddle2.h);
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
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
    if (paddle1.y >= cnv.height - paddle1.h) {
        paddle1.y = cnv.height - paddle1.h
    } else if (paddle1.y <= 0) {
        paddle1.y = 0;
    }
    // P2 movement
    if (p2Up) {
        paddle2.y += -7;
    }
    if (p2Down) {
        paddle2.y += 7;
    }
    // Check if paddle hits top/bottom
    if (paddle2.y >= cnv.height - paddle2.h) {
        paddle2.y = cnv.height - paddle2.h
    } else if (paddle2.y <= 0) {
        paddle2.y = 0;
    }
}

function moveBall() {
    // Check if the ball hits a paddle, then send it at a random angle.
    if (
        ball.x < paddle1.x + paddle1.w && // 1Right side
        ball.x + ball.size > paddle1.x && // 1Left side
        ball.y > paddle1.y - ball.size && // 1Top side
        ball.y < paddle1.y + paddle1.h || // 1Bottom side
        ball.x < paddle2.x + paddle2.w && // 2Right side
        ball.x + ball.size > paddle2.x && // 2Left side
        ball.y > paddle2.y - ball.size && // 2Top side
        ball.y < paddle2.y + paddle2.h // 2Bottom side
    ) {
        ball.dir = !ball.dir;
        ball.degree = Math.random() * (70 + 70) - 70;
        ball.rise = Math.tan(ball.degree * Math.PI / 180) * ball.speed;
        ball.speed += 0.1;
    }
    // Check if the ball hits the top or bottom of the screen, then send it at the opposite of its current angle.
    if (ball.y < 0 || ball.y > cnv.height - ball.size) {
        ball.rise *= -1;
    }
    // Move ball
    if (ball.dir) {
        ball.x += ball.speed;
    } else {
        ball.x -= ball.speed;
    }
    ball.y -= ball.rise;
}

function checkScore() {
    if (ball.x < 0 - ball.size) {
        p2Score++;
        ballReset();
    } else if (ball.x > cnv.width) {
        p1Score++;
        ballReset();
    }
    if (p1Score === 5 || p2Score === 5) {
        gameState = "win";
        setTimeout(reset, 5000);
    } else if (currentTime - roundStartTime >= 90000) {
        gameState = "tie";
        setTimeout(reset, 5000);
    }
}

function winScreen() {
    drawMainComponents();
    drawGameElements();
    if (p2Score < 5) {
        ctx.textAlign = "center";
        ctx.font = "50px Roboto";
        ctx.fillStyle = "white";
        ctx.fillText("P1 WIN", 240, 360);
    } else if (p1Score < 5) {
        ctx.textAlign = "center";
        ctx.font = "50px Roboto";
        ctx.fillStyle = "white";
        ctx.fillText("P2 WIN", 720, 360);
    }
}

function bruhScreen() {
    drawMainComponents();
    drawGameElements();
    ctx.textAlign = "center";
    ctx.font = "50px Roboto";
    ctx.fillStyle = "white";
    ctx.fillText("bruh", 480, 360);
}

function reset() {
    gameState = "start";
    p1Score = 0; 
    p2Score = 0;
    paddle1 = {
        x: 50,
        y: 310,
        w: 10,
        h: 100,
    };
    paddle2 = {
        x: 900,
        y: 310,
        w: 10,
        h: 100,
    };
    ball = {
        x: 475,
        y: 355,
        size: 10,
        dir: false,
        speed: 7,
        degree: 0,
        rise: 0,
    };
}

function ballReset() {
    gameState = "pause";
    roundStartTime = performance.now();
    if (ball.dir) {
        ball.x = 65;
        ball.y = paddle1.y + paddle1.h / 2 - ball.size / 2;
    } else {
        ball.x = 885;
        ball.y = paddle2.y + paddle2.h / 2 - ball.size / 2;
    }
    ball = {
        x: ball.x,
        y: ball.y,
        size: 10,
        dir: ball.dir,
        speed: 7,
        degree: ball.degree,
        rise: 0.1,
    }
    if (p1Score < 5 && p2Score < 5) {
        setTimeout(() => {gameState = "gameLoop";}, 2000);
    }
}