import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { responziver } from "../lib/responziver";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

// We inject that space into basically a <canvas> element
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, // Field of view - anything between 40 and 8 are sufficient
  window.innerWidth / window.innerHeight, // Aspect ratio which we calculate by dividing our canvas size
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

const orbitControls = new OrbitControls(camera, renderer.domElement);

renderer.shadowMap.enabled = true;

camera.position.set(5, 10, 15);
orbitControls.update();

function animate(): void {
  renderer.render(scene, camera);
}

animate();

// RESPONSIVNESS
responziver(camera, renderer);
