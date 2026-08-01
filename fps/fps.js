fps++;
const fpsLabel = document.getElementById("fpsLabel");
const fpsFill = document.getElementById("fpsFill");

let fps = 0;
setInterval(() => {
    fpsLabel.textContent = "FPS: " + fps;

    const percent = Math.min(fps, 60) / 60 * 100;
    fpsFill.style.width = percent + "%";

    if (fps >= 50) {
        fpsFill.style.background = "#00ff66"; // Green
    } else if (fps >= 30) {
        fpsFill.style.background = "#ffcc00"; // Yellow
    } else {
        fpsFill.style.background = "#ff4444"; // Red
    }

    fps = 0;
}, 1000);
