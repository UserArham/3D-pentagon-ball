document.getElementById("openLogs").addEventListener("click", () => {
    const logWindow = window.open(".commit/logs.html", "_blank", "noopener");

    if (!logWindow) {
        console.warn("Popup blocked. Could not open logs.html.");
    }
});
