import * as THREE from "three";

export const responziver = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): (() => void) => {
  const handleResize = (): void => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", handleResize);
  handleResize();

  return () => {
    window.removeEventListener("resize", handleResize);
  };
};
