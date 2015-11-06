"use strict";
/*
    Defining our variables
    world and viewport are DOM elements,
    worldXAngle and worldYAngle are floats that hold the world rotations,
    d is an int that defines the distance of the world from the camera 
*/
var world = document.getElementById('world'),
    viewport = document.getElementById('viewport'),
    worldXAngle = 0,
    worldYAngle = 0,
    d = 0;

/*
    Changes the transform property of world to be
    translated in the Z axis by d pixels,
    rotated in the X axis by worldXAngle degrees and
    rotated in the Y axis by worldYAngle degrees.
*/
function updateView() {
    world.style.transform = 'translateZ(' + d + 'px) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
    update();
}

window.addEventListener('mousemove', function (e) {
    worldYAngle = -(0.5 - (e.clientX / window.innerWidth)) * 180;
    worldXAngle = (0.5 - (e.clientY / window.innerHeight)) * 180;
    updateView();
});



/*
    objects is an array of cloud bases
    layers is an array of cloud layers
*/
var objects = [],
    layers = [];

/*
    Creates a single cloud base and adds several cloud layers.
    Each cloud layer has random position ( x, y, z ), rotation (a)
    and scale (s). layers[] keeps track of those divs.
*/
function createCloud() {
    var left = 256,
        x = Math.floor((Math.random() * 512) - 256),
        y = Math.floor((Math.random() * 512) - 256),
        z = Math.floor((Math.random() * 512) - 256),
    
        div = document.createElement('div'),
        t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )';
    div.className = 'cloudBase';
    div.style.transform = t;
    world.appendChild(div);
    
    for (var j = 0; j < 5 + Math.round(Math.random() * 10); j++) {
        var cloud = document.createElement('img');
        cloud.className = 'cloudLayer';
        
        cloud.src="/img/cloud.png";
        
        cloud.data = { 
            x: Math.floor((Math.random() * 360) + 1),
            y: Math.floor((Math.random() * 360) + 1),
            z: Math.floor((Math.random() * 360) + 1),
            a: Math.floor((Math.random() * 360) - 180),
            s: Math.floor((Math.random() * 2) + 1),
        };
        var t = 'translateX( ' + cloud.x + 'px ) translateY( ' + cloud.y + 'px ) translateZ( ' + cloud.z + 'px ) rotateZ( ' + cloud.a - 120 + 'deg ) scale( ' + cloud.s + ' )'; 
        cloud.style.transform = t;
        
        div.appendChild(cloud);
        layers.push(cloud);
    }
    
    return div;
}
/*
    Clears the DOM of previous clouds bases 
    and generates a new set of cloud bases
*/
function generate(cloudNumber) {
    var j = 0;
    objects = [];
    layers = [];
    if (world.hasChildNodes()) {
        while (world.childNodes.length >= 1) {
            world.removeChild(world.firstChild);
        }
    }
    for (j = 0; j < cloudNumber; j++) {
        objects.push(createCloud());
    }
}

/*
    Iterate layers[], update the rotation and apply the
    inverse transformation currently applied to the world.
    Notice the order in which rotations are applied.
*/
function update() {     
    for( var j = 0; j < layers.length; j++ ) {
        var layer = layers[ j ];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) \
            translateY( ' + layer.data.y + 'px ) \
            translateZ( ' + layer.data.z + 'px ) \
            rotateY( ' + ( - worldYAngle ) + 'deg ) \
            rotateX( ' + ( - worldXAngle ) + 'deg ) \
            scale( ' + layer.data.s + ')';
        layer.style.transform = t;
    }
    requestAnimationFrame(update);
    
}
