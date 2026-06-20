let origPositions = sphereGeom.attributes.position.array.slice();
let vertices = sphereGeom.attributes.position.array;
let velocities = new Float32Array(vertices.length);
let damping = 0.85;
let spring = 0.2;
let jiggle = 0.02;
