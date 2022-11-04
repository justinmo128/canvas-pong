// Canvas and graphics context
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 960;
cnv.height = 720;

// Global variables
let health = 100;

// Draw Function
window.addEventListener("load", draw);
function draw() {
    // Background
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    // Health bar
    ctx.fillStyle = "red";
    ctx.fillRect(0, 680, 960, 40)
    ctx.fillStyle = "green";
    ctx.fillRect(0, 680, 960 * health / 100, 40);
    requestAnimationFrame(draw)
}

// Key down handler
window.addEventListener("keydown", () => {
    health -= 5;
})