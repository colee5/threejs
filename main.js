// All three js functionalities - may not be a good practice
import * as THREE from "three";

// We initialize an instance, tool that three.js
// uses to allocate space on the webpage
const rendered = new THREE.WebGL3DRenderer();

// We allocate space to it by giving the entire
// width and height property of our website window
rendererReference.setSize(window.innerHeight, window.innerHeight);

// We inject that space into basically a <canvas> element
document.body.appendChild(renderer.domElement);
