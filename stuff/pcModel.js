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
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

// animator
function animate() {
    requestAnimationFrame(animate);

    object.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

animate();