// All three js functionalities - may not be a good practice
import * as THREE from "three";

// We initialize an instance, tool that three.js
// uses to allocate space on the webpage
const renderer = new THREE.WebGLRenderer();

// We allocate space to it by giving the entire
// width and height property of our website window
renderer.setSize(window.innerWidth, window.innerHeight);

// We inject that space into basically a <canvas> element
document.body.appendChild(renderer.domElement);

// Creating a scene
const scene = new THREE.Scene();

// Initialize a perspective Camera which takes 4 props
const camera = new THREE.PerspectiveCamera(
  75, // Field of view - anything between 40 and 8 are sufficient
  window.innerWidth / window.innerHeight, // Aspect ratio which we calculate by dividing our canvas size
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

camera.position.z = 5;
// We render and link scene to the camera

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

renderer.render(scene, camera);
