import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x705df2 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff00f0 }));
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xfff000 }));
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00fff0 }));
cube2.position.x = -1.5;
cube3.position.x = 1.5;
group.add(cube1);
group.add(cube2);
group.add(cube3);

group.scale.y = 2;
group.position.y = 2;
group.rotation.z = Math.PI * 0.5;

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.set(-0.7, 0.6, 0.5);

// Scale
// mesh.scale.x = 1.25;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(1.25, 0.5, 0.5);

// Rotation
mesh.rotation.reorder('ZYX');
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI;
mesh.rotation.z = Math.PI * 0.5;

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// Apply this to see axes helper
// camera.position.x = 0.25;
// camera.position.y = 0.25;
scene.add(camera);
// camera.lookAt(mesh.position);
camera.lookAt(group.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
