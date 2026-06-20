import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.147/build/three.module.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.set(0,0,5);

let renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
