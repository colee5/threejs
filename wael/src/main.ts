import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface GuiOptions {
  color: number;
  wireframe: boolean;
  speed: number;
  intensity: number;
  angle: number;
  penumbra: number;
}

// We initialize an instance, tool that three.js
// uses to allocate space on the webpage
const renderer = new THREE.WebGLRenderer();
const gui = new dat.GUI();

const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();

const cubeTexture = cubeTextureLoader.load([
  "/End of tweet banner.png",
  "/End of tweet banner-1.png",
  "/End of tweet banner-2.png",
  "/End of tweet banner-3.png",
  "/End of tweet banner-4.png",
  "/End of tweet banner-5.png",
]);

const boxTexture = textureLoader.load("/texture.png");
boxTexture.colorSpace = THREE.SRGBColorSpace;

const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMat = new THREE.MeshBasicMaterial({ map: boxTexture });
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
boxMesh.position.set(-5, 2, 0);
// Addressing the issue of the background being washed out
// backgroundImage.colorSpace = THREE.SRGBColorSpace;

// These are options which are handled by the GUI to give
// us the colorpicker and the switch, etc..
const options: GuiOptions = {
  color: 0x0000ff,
  wireframe: false,
  speed: 0.01,
  intensity: 0,
  angle: 0.2,
  penumbra: 0,
};

// We append the helpers into the GUI
gui.addColor(options, "color").onChange(function (e: number) {
  sphereMesh.material.color.set(e);
});

gui.add(options, "wireframe").onChange(function (e: boolean) {
  sphereMesh.material.wireframe = e;
});

gui.add(options, "intensity", 0, 1000).onChange(function (e: number) {
  spotlight.intensity = e;
});
gui.add(options, "angle", 0, 2).onChange(function (e: number) {
  spotlight.angle = e;
});
gui.add(options, "penumbra", 0, 1).onChange(function (e: number) {
  spotlight.penumbra = e;
});

gui.add(options, "speed", 0, 0.01);

// We allocate space to it by giving the entire
// width and height property of our website window
renderer.setSize(window.innerWidth, window.innerHeight);

// We inject that space into basically a <canvas> element
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// scene.background = backgroundImage;
scene.add(boxMesh);
scene.background = cubeTexture;
// This is for the camera functionality - often used in flight simulators
// In short words - First Person Controls to stimulate flying experience
// const fPControls = new FirstPersonControls(camera, renderer.domElement);

// ---------------- //
// Camera & Helpers

const camera = new THREE.PerspectiveCamera(
  75, // Field of view - anything between 40 and 8 are sufficient
  window.innerWidth / window.innerHeight, // Aspect ratio which we calculate by dividing our canvas size
  0.1, // Near clipping plane
  1000 // Far clipping plane
);

const orbitControls = new OrbitControls(camera, renderer.domElement);

// first arg is x-axis, 2nd y-axis, and 3rd z-axis
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Enabling shadows - disabled by default
renderer.shadowMap.enabled = true;

camera.position.set(5, 10, 15);
orbitControls.update();

const gridHelper = new THREE.GridHelper(15, 20);
scene.add(gridHelper);

// ---------------- //
// Shapes & Geometries

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
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

planeMesh.receiveShadow = true;
planeMesh.rotation.x = -0.5 * Math.PI;

// The default values for the horizontal segments is 32
// and 16 for the vertical segments
// THREE.SphereGeometry(2) is same as
// THREE.SphereGeometry(2, 32, 16)
const sphereGeometry = new THREE.SphereGeometry(2, 60, 60);

// MeshStandardMaterial requires light in order to be able to be seen
// Just like in real life, If no light everything will be dark
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
});

const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.castShadow = true;
scene.add(sphereMesh);

// ---------------- //
// Light sources

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(directionalLight);
directionalLight.position.set(-5, 8, 0);
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 3);
scene.add(dLightHelper);
// For a known problem and since every light uses additional camera
// for it's shadow, we use a helper for this.
const dLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(dLightShadowHelper);
directionalLight.shadow.camera.top = 7;

const spotlight = new THREE.SpotLight(0xffffff, 1000);
scene.add(spotlight);
spotlight.position.set(-5, 8, 0);
const sLightHelper = new THREE.SpotLightHelper(spotlight);
spotlight.castShadow = true;
scene.add(sLightHelper);

// First method of instantiating Fog
// scene.fog = new THREE.Fog(0x5500af, 0, 50);

// Second method of instantiating Fog
scene.fog = new THREE.FogExp2(0x5500af, 0.03);
// ---------------- //
// Loop Animation

let step = 0;

function animate(): void {
  step += options.speed;
  sLightHelper.update();
  // sphereMesh.position.y = 3 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
renderer.setClearColor(0x1b1b1b);

window.addEventListener("resize", function () {
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
});
