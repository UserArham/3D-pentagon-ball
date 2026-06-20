renderer.domElement.addEventListener('mousedown', e=>{
    if(e.button === 0){ // left click
        isDragging = true;
        prevPos = [e.clientX, e.clientY];
        // Boop jiggle + spin
        for(let i=0;i<velocities.length;i++) velocities[i] += (Math.random()-0.5)*jiggle;
        spinVelocity.x += (Math.random()-0.5)*0.05;
        spinVelocity.y += (Math.random()-0.5)*0.05;
        spinVelocity.z += (Math.random()-0.5)*0.05;
    }
});

renderer.domElement.addEventListener('mousemove', e=>{
    if(isDragging){
        let dx = e.clientX - prevPos[0];
        let dy = e.clientY - prevPos[1];
        prevPos = [e.clientX, e.clientY];
        sphere.position.x += dx * 0.005;
        sphere.position.y -= dy * 0.005;
    }
});

renderer.domElement.addEventListener('mouseup', e=>{
    if(e.button === 0) isDragging = false;
});

renderer.domElement.addEventListener('wheel', e=>{
    e.preventDefault();
    let scale = sphere.scale.x * (1 - e.deltaY * 0.001);
    sphere.scale.set(scale, scale, scale);
}, {passive:false});
