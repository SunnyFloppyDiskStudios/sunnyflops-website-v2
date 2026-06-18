// three
import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// object loader
let object;

const loader = new GLTFLoader();

loader.load(
    "/a_assets/models/stuff/pc.glb",
    function(gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100);
    },
    function(error) {
        console.error(error);
    }
)

// canvas setup
const canv = document.getElementById('stuff-canvas');
const width = canv.offsetWidth;
const height = canv.offsetHeight;

// scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canv });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canv.offsetWidth, canv.offsetHeight);

camera.position.setZ(5);

// scene content
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
ambientLight.intensity = 3;
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;

// animator variables
let hasBegun = false;
let hasEntered = false;

const scaleRate = 0.05;

// squish effect
let canClick = true;
let isAnimatingClick = false;

let targetY = 0.5
let normalY = 1
let stage = 0;

let squishRate = 0.04;

canv.addEventListener('mousedown', function(e) {
    if (!object) { return; }
    if (!canClick) { return; }

    canClick = false;
    isAnimatingClick = true;
    stage = 1;
})

// animator
function animate() {
    requestAnimationFrame(animate);

    // if non existant
    if (!object) {
        renderer.render(scene, camera);
        return;
    }

    // start ingoing animation
    if (!hasBegun) {
        object.scale.set(0,0,0);
        object.position.setY(-2);
        hasBegun = true;
    }

    // general loop
    if (!hasEntered && hasBegun) {
        if (object.scale.x < 1) {
            object.rotation.y += 0.27;

            object.scale.x += scaleRate;
            object.scale.y += scaleRate;
            object.scale.z += scaleRate;

            object.position.y += scaleRate * 2;

        } else {
            hasEntered = true;
        }
    }
    object.rotation.y += 0.0067;


    // object.traverse(child => {
    //     if (child.name === "Cube001") {
    //     }
    // })

    // squish effect logic
    if (isAnimatingClick) {
        console.log(stage);
        console.log(object.scale.y)

        // if big, make small
        if (object.scale.y >= targetY && stage === 1) {
            object.scale.y -= squishRate;
            object.scale.x += squishRate / 2;
            object.scale.z += squishRate / 2;
        }

        // if small, make stage
        if (object.scale.y <= targetY && stage === 1) {
            stage = 2;
        }

        // if small, make big
        if (object.scale.y <= normalY && stage === 2) {
            object.scale.y += squishRate;
            object.scale.x -= squishRate / 2;
            object.scale.z -= squishRate / 2;
        }

        // if big, make stage
        if (object.scale.y >= normalY && stage === 2) {
            stage = 3;
        }

        // kill
        if (object.scale.y >= normalY && stage === 3) {
            stage = 0;
            isAnimatingClick = false;
            canClick = true;
        }
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();