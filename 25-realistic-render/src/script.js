import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();

const woodColorTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg');
woodColorTexture.colorSpace = THREE.SRGBColorSpace;
const woodNormalTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png');
const woodAORoughnessMetalnessTexture = textureLoader.load(
  '/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg',
);

const brickColorTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg');
brickColorTexture.colorSpace = THREE.SRGBColorSpace;
const brickNormalTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png');
const brickAORoughnessMetalnessTexture = textureLoader.load(
  '/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg',
);

/**
 * Base
 */
// Debug
const gui = new GUI();
const global = {};

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = global.envMapIntensity;

      // Shadows
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Environment map
 */
// Global intensity
global.envMapIntensity = 1;
gui.add(global, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials);

// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Directional light
 */

const directionalLight = new THREE.DirectionalLight('#ffffff', 6);
directionalLight.position.set(-4, 6.5, 2.5);
directionalLight.shadow.normalBias = 0.027;
directionalLight.shadow.bias = -0.004;
scene.add(directionalLight);

gui.add(directionalLight, 'intensity', 0, 10, 0.001).name('lightIntensity');
gui.add(directionalLight.position, 'x', -10, 10, 0.001).name('lightX');
gui.add(directionalLight.position, 'y', -10, 10, 0.001).name('lightY');
gui.add(directionalLight.position, 'z', -10, 10, 0.001).name('lightZ');

gui.add(directionalLight.shadow, 'normalBias', -0.05, 0.05, 0.001);
gui.add(directionalLight.shadow, 'bias', -0.05, 0.05, 0.001);

// Shadows
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
gui.add(directionalLight, 'castShadow');

//Helper
// const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionalLightHelper);

// Target
directionalLight.target.position.set(0, 4, 0);
directionalLight.target.updateWorldMatrix();

/**
 * Models
 */
// Helmet
// gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
//   gltf.scene.scale.set(10, 10, 10);
//   scene.add(gltf.scene);

//   updateAllMaterials();
// });

// Burger
gltfLoader.load('/models/hamburger.glb', (gltf) => {
  gltf.scene.scale.set(0.4, 0.4, 0.4);
  gltf.scene.position.set(0, 2.5, 0);
  scene.add(gltf.scene);

  updateAllMaterials();
});

// Floor
const floorMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshStandardMaterial({
    map: woodColorTexture,
    normalMap: woodNormalTexture,
    aoMap: woodAORoughnessMetalnessTexture,
    roughnessMap: woodAORoughnessMetalnessTexture,
    metalnessMap: woodAORoughnessMetalnessTexture,
  }),
);
floorMesh.rotation.x = -Math.PI * 0.5;
scene.add(floorMesh);

// Wall
const wallMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshStandardMaterial({
    map: brickColorTexture,
    normalMap: brickNormalTexture,
    aoMap: brickAORoughnessMetalnessTexture,
    roughnessMap: brickAORoughnessMetalnessTexture,
    metalnessMap: brickAORoughnessMetalnessTexture,
  }),
);
wallMesh.position.z = -4;
wallMesh.position.y = 4;
scene.add(wallMesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // screen with a pixel ratio above 1 don't really need antialiasing
  // antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Tone mapping
renderer.toneMappingExposure = 3;
renderer.toneMapping = THREE.ReinhardToneMapping;

gui.add(renderer, 'toneMapping', {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
  AgX: THREE.AgXToneMapping,
});
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001);

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
