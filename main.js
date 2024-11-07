import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// We initialize an instance, tool that three.js
// uses to allocate space on the webpage
const renderer = new THREE.WebGLRenderer();
const gui = new dat.GUI();

// These are options which are handled by the GUI to give
// us the colorpicker and the switch, etc..
const options = {
  color: 0x0000ff,
  wireframe: false,
  speed: 0.01,
};

// We append the helpers into the GUI
gui.addColor(options, "color").onChange(function (e) {
  sphereMesh.material.color.set(e);
});

gui.add(options, "wireframe").onChange(function (e) {
  sphereMesh.material.wireframe = e;
});

gui.add(options, "speed", 0, 0.01);

let step = 0;

// We allocate space to it by giving the entire
// width and height property of our website window
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

// This is for the camera functionality - often used in flight simulators
// In short words - First Person Controls to stimulate flying experience
// const fPControls = new FirstPersonControls(camera, renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);

// first arg is x-axis, 2nd y-axis, and 3rd z-axis
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 5);
orbitControls.update();

const gridHelper = new THREE.GridHelper(15, 20);
scene.add(gridHelper);

// Box Scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(geometry, material);
scene.add(box);

box.translateX(5);

box.rotateX(Math.PI / 2);

box.scale.set(1, 2, 1);
// Plane scene - plane is a two dimensional surface, more like a floor

const planeGeometry = new THREE.PlaneGeometry(15, 15);
const planeMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

planeMesh.rotation.x = -0.5 * Math.PI;

// The default values for the horizontal segments is 32
// and 16 for the vertical segments
// THREE.SphereGeometry(2) is same as
// THREE.SphereGeometry(2, 32, 16)
const sphereGeometry = new THREE.SphereGeometry(2, 60, 60);

// MeshStandardMaterial requires light in order to be able to be seen
// Just like in real life, If no light everything will be dark
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: true,
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

function animate(time) {
  step += options.speed;
  sphereMesh.position.y = 3 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
