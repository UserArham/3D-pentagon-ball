renderer.domElement.addEventListener('touchstart', e=>{
    if(e.touches.length === 1){
        isDragging = true;
        prevPos = [e.touches[0].clientX, e.touches[0].clientY];
        // Boop jiggle + spin
        for(let i=0;i<velocities.length;i++) velocities[i] += (Math.random()-0.5)*jiggle;
        spinVelocity.x += (Math.random()-0.5)*0.05;
        spinVelocity.y += (Math.random()-0.5)*0.05;
        spinVelocity.z += (Math.random()-0.5)*0.05;
    } else if(e.touches.length === 2){
        pinchDist = distance([e.touches[0].clientX, e.touches[0].clientY],
                             [e.touches[1].clientX, e.touches[1].clientY]);
        startScale = sphere.scale.x;
    }
});

renderer.domElement.addEventListener('touchmove', e=>{
    e.preventDefault();
    if(e.touches.length === 1 && isDragging){
        let dx = e.touches[0].clientX - prevPos[0];
        let dy = e.touches[0].clientY - prevPos[1];
        prevPos = [e.touches[0].clientX, e.touches[0].clientY];
        sphere.position.x += dx * 0.005;
        sphere.position.y -= dy * 0.005;
    } else if(e.touches.length === 2){
        let newDist = distance([e.touches[0].clientX, e.touches[0].clientY],
                               [e.touches[1].clientX, e.touches[1].clientY]);
        let scale = startScale * newDist / pinchDist;
        sphere.scale.set(scale, scale, scale);
    }
});

renderer.domElement.addEventListener('touchend', e=>{
    if(e.touches.length === 0) isDragging = false;
});
