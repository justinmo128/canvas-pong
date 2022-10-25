// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 960;
cnv.height = 720;

// Global Variables
let gameState = "start";
let lastFrameOccurence;
let currentTime;
let p1Up;
let p1Down;
let p2Up;
let p2Down;
let paddle1 = {
    y: 310,
}
let paddle2 = {
    y: 310,
}
let ball = {
    x: 475,
    y: 355,
    angle: Math.random(),
    dir: false,
    speed: 7,
};
let p1Score = 0;
let p2Score = 0;


// Draw Function
window.addEventListener("load", draw);
function draw() {
    currentTime = performance.now();
    if (gameState === "start") {
        startScreen();
    } else if (gameState === "gameLoop") {
        gameLoop();
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