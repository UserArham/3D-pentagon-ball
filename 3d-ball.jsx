import React, { useRef, useState, useMemo } from 'react';  
import { Canvas, useFrame } from '@react-three/fiber';  
import \* as THREE from 'three'; 

// This component handles the 3D Slime Ball and its physics  
function SlimeBall({ color, size }) {  
const meshRef = useRef(); 

// Create a stable reference for geometry data using useMemo  
const { origPositions, vertices, velocities } = useMemo(() => {  
const geom = new THREE.IcosahedronGeometry(1, 5);  
const posAttr = geom.attributes.position.array;  
return {  
origPositions: posAttr.slice(),  
vertices: posAttr,  
velocities: new Float32Array(posAttr.length),  
};  
}, \[\]); 

// Physics and animation variables  
const damping = 0.85;  
const spring = 0.2;  
const jiggle = 0.02;  
const spinVelocity = useRef(new THREE.Vector3(0, 0, 0));  
const spinDamping = 0.9;  
const isDragging = useRef(false);  
const prevPos = useRef(\[0, 0\]); 

// Run physics calculations on every single frame  
useFrame(() => {  
if (!meshRef.current) return; 

// 1. Soft-body jiggle physics  
for (let i = 0; i < vertices.length; i++) {  
let orig = origPositions\[i\];  
velocities\[i\] += (orig - vertices\[i\]) \* spring;  
velocities\[i\] \*= damping;  
vertices\[i\] += velocities\[i\];  
}  
meshRef.current.geometry.attributes.position.needsUpdate = true;  
meshRef.current.geometry.computeVertexNormals(); 

// 2. Apply spin rotation  
meshRef.current.rotation.x += spinVelocity.current.x;  
meshRef.current.rotation.y += spinVelocity.current.y;  
meshRef.current.rotation.z += spinVelocity.current.z;  
spinVelocity.current.multiplyScalar(spinDamping);  
}); 

// Handle clicking on the slime (Boop action)  
const handlePointerDown = (e) => {  
e.stopPropagation();  
isDragging.current = true;  
prevPos.current = \[e.clientX, e.clientY\]; 

// Add random velocity spikes to create the jiggle effect  
for (let i = 0; i < velocities.length; i++) {  
velocities\[i\] += (Math.random() - 0.5) \* jiggle;  
}  
spinVelocity.current.x += (Math.random() - 0.5) \* 0.05;  
spinVelocity.current.y += (Math.random() - 0.5) \* 0.05;  
spinVelocity.current.z += (Math.random() - 0.5) \* 0.05;  
}; 

// Handle dragging the slime around the screen  
const handlePointerMove = (e) => {  
if (!isDragging.current) return;  
e.stopPropagation(); 

let dx = e.clientX - prevPos.current\[0\];  
let dy = e.clientY - prevPos.current\[1\];  
prevPos.current = \[e.clientX, e.clientY\]; 

meshRef.current.position.x += dx \* 0.005;  
meshRef.current.position.y -= dy \* 0.005;  
}; 

// Handle zooming using the mouse wheel  
const handleWheel = (e) => {  
e.stopPropagation();  
// In React Three Fiber, we can adjust the object scale smoothly  
// The master scale is controlled by our slider state below  
}; 

return (  
<mesh  
ref={meshRef}  
scale={\[size, size, size\]}  
onPointerDown={handlePointerDown}  
onPointerMove={handlePointerMove}  
onPointerUp={() => (isDragging.current = false)}  
onPointerOut={() => (isDragging.current = false)}  
onWheel={handleWheel}  
\>  
<icosahedronGeometry args={\[1, 5\]} />  
  
  
);  
} 

// Main App Container UI  
export default function JellySlimeApp() {  
const \[color, setColor\] = useState('#ff0a0a');  
const \[size, setSize\] = useState(1); 

return (  
<div style={{ width: '100vw', height: '100vh', background: '#222', position: 'relative' }}> 

{/\* HTML Interface Overlay controls \*/}  
<div style={{  
position: 'absolute', top: '10px', left: '10px',  
color: 'white', fontFamily: 'sans-serif', zIndex: 10  
}}>  
  
Color: <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />  
  
<div style={{ marginTop: '10px' }}>  
Size: <input type="range" min="0.5" max="3" step="0.01" value={size} onChange={(e) => setSize(parseFloat(e.target.value))} />  
  
 

{/\* The 3D Canvas Box \*/}  
<Canvas camera={{ position:, fov: 45 }}>  
<pointLight position={\[5, 5, 5\]} intensity={1} />  
  
  
  
);  
}
