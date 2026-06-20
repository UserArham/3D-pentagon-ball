function animate(){
    requestAnimationFrame(animate);

    // Soft-body physics
    for(let i=0; i<vertices.length; i++){
        let orig = origPositions[i];
        velocities[i] += (orig - vertices[i]) * spring;
        velocities[i] *= damping;
        vertices[i] += velocities[i];
    }
    sphereGeom.attributes.position.needsUpdate = true;
    sphereGeom.computeVertexNormals();

    // Apply spin
    sphere.rotation.x += spinVelocity.x;
    sphere.rotation.y += spinVelocity.y;
    sphere.rotation.z += spinVelocity.z;
    spinVelocity.multiplyScalar(spinDamping);

    // Update material color
    material.color.set(colorInput.value);

    // Slider scale
    let s = parseFloat(sizeSlider.value);
    sphere.scale.set(s, s, s);

    renderer.render(scene, camera);
}
animate();
