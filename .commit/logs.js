if (!window.WebGLRenderingContext) {
    console.error("WebGL is not supported by this browser.");
}

let renderer;
try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
} catch (err) {
    console.error("Failed to create WebGL renderer:", err);
}

