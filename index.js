// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 960;
cnv.height = 720;

// Global Variables
let lastFrameOccurence;
let currentTime;
let p1Up;
let p1Down;
let p2Up;
let p2Down;
let gameState;
let p1Score;
let p2Score;
let paddle1 = {
    x: 50,
    y: 310,
    w: 10,
    h: 100,
}
let paddle2 = {
    x: 900,
    y: 310,
    w: 10,
    h: 100,
}
let ball = {
    x: 475,
    y: 355,
    size: 10,
    dir: false,
    speed: 7,
    degree: 0,
    rise: 0,
};
reset();


// Draw Function
window.addEventListener("load", draw);
function draw() {
    currentTime = performance.now();
    if (gameState === "start") {
        startScreen();
    } else if (gameState === "gameLoop") {
        gameLoop();
    } else if (gameState === "win") {
        winScreen();
    }
    requestAnimationFrame(draw);
}

// Key down handler
window.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    if (keyPressed === "Enter" && gameState === "start") {
        gameState = "gameLoop";
    }
    if (keyPressed === "w") {
        p1Up = true;
    } else if (keyPressed === "s") {
        p1Down = true;
    } else if (keyPressed === "ArrowUp") {
        p2Up = true;
    } else if (keyPressed === "ArrowDown") {
        p2Down = true;
    }
})

// Key up handler
window.addEventListener("keyup", (e) => {
    let keyPressed = e.key;
    if (keyPressed === "w") {
        p1Up = false;
    } else if (keyPressed === "s") {
        p1Down = false;
    } else if (keyPressed === "ArrowUp") {
        p2Up = false;
    } else if (keyPressed === "ArrowDown") {
        p2Down = false;
    }
})