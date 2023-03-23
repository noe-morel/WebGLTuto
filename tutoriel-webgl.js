import * as THREE from 'three';



function makeInstance(parent, geometry, color, x, y, z) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const mesh = new THREE.Mesh(geometry, material);
    parent.add(mesh);
   
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
   
    return mesh;
}

function makeSphere(radius, detail){
    const geometry = new THREE.IcosahedronGeometry(radius, detail);
    return geometry;
}

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });


    const fov = 75;
    const aspect = 1;
    const near = 0.1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 40;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    const sun = makeInstance(solarSystem, makeSphere(1,2),0xffe100,0,0,0);
    const mercure = makeInstance(solarSystem, makeSphere(0.2,1), 0x0062ac,3,0,0);
    const venus = makeInstance(solarSystem, makeSphere(0.3,1), 0x0062ac,3,3,0);
    const mars = makeInstance(solarSystem, makeSphere(0.5,1), 0xc63e02,-5,4,0);
    const earth = makeInstance(solarSystem, makeSphere(0.5,1), 0x0062ac,-4,-8,0);
    const saturn = makeInstance(solarSystem, makeSphere(0.8,1), 0xffe0d9,12,-3,0);
    const jupiter = makeInstance(solarSystem, makeSphere(1,1), 0xf7bc6c,12,-12,0);
    const neptune = makeInstance(solarSystem, makeSphere(0.7,1), 0x0062ac,-13,14,0);
    const uranus = makeInstance(solarSystem, makeSphere(0.7,1), 0x0062ac,16,16,0);
    const moon = makeInstance(earth, makeSphere(0.1,1), 0x0062ac,0.7,0,0);

    const ambientcolor = 0xFFFFFF;
    const ambientintensity = 1;
    const ambientlight = new THREE.AmbientLight(ambientcolor, ambientintensity);
    scene.add(ambientlight);

    const suncolor = 0xFFFFFF;
    const sunintensity = 1;
    const sunlight = new THREE.PointLight(suncolor, sunintensity);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);
    /*
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      */


    function render(time) {
        time *= 0.001;  // convert time to seconds
        /*
        if (resizeRendererToDisplaySize(renderer)){
            const canvas = renderer.domElement;
            camera.aspect = 2;
            camera.updateProjectionMatrix();            
        }*/
        if (document.body.clientHeight>document.body.clientWidth){
            canvas.style.width="100%";
            canvas.style.height="auto";
        }else{
            canvas.style.width="auto";
            canvas.style.height="100%";
        }

        if (canvas.clientHeight>canvas.clientWidth){
            renderer.setSize(canvas.clientWidth, canvas.clientWidth, false)
        }
        else{
            renderer.setSize(canvas.clientHeight, canvas.clientHeight, false)
        }
        camera.updateProjectionMatrix();

        const rot = time;
        solarSystem.rotation.z = rot;
        earth.rotation.z = rot;
       
        renderer.render(scene, camera);
       
        requestAnimationFrame(render);
      }

    requestAnimationFrame(render);

    renderer.render(scene, camera);
}




main();
