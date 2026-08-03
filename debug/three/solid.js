// Three.js components (Solid ball, not pentagon)
import * as THREE from 'three';

// 1. Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// 2. Create the camera (FOV, Aspect Ratio, Near, Far)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create the renderer and attach it to the DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Create the ball (SphereGeometry parameters: radius, widthSegments, heightSegments)
const geometry = new THREE.SphereGeometry(1.5, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0xff4444,
    roughness: 0.4,
    metalness: 0.1
});
const ball = new THREE.Mesh(geometry, material);
scene.add(ball);

// 5. Add lighting so the 3D ball is visible
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 6. Handle window resizing dynamically
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7. Animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);

    // Optional: Rotate the ball slightly for visual effect
    ball.rotation.x += 0.005;
    ball.rotation.y += 0.005;

    renderer.render(scene, camera);
}

// Start the animation
animate();
