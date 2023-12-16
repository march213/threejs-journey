import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Debug
const gui = new GUI({ width: 300 });

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Textures
const loader = new THREE.TextureLoader();

const doorColorTexture = loader.load('./textures/door/color.jpg');
const doorAlphaTexture = loader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = loader.load('./textures/door/ambientOcclusion.jpg');
const doorHeightTexture = loader.load('./textures/door/height.jpg');
const doorNormalTexture = loader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = loader.load('./textures/door/metalness.jpg');
const doorRoughnessTexture = loader.load('./textures/door/roughness.jpg');

const matcapTexture = loader.load('./textures/matcaps/8.png');

// Set door and matcap color space to sRGB
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const gradientTexture = loader.load('./textures/gradients/5.jpg');

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color('#f30');
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial({});
// material.flatShading = true;

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 10;
// material.specular = new THREE.Color('#1188ff');

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

// Lights
// when there is an environment map sometimes it is not necessary to keep lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = envMap;
  scene.environment = envMap;
});

// Objects
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
sphereMesh.position.x = -1.5;

const planeGeometry = new THREE.PlaneGeometry(1, 1, 16, 16);
const planeMesh = new THREE.Mesh(planeGeometry, material);

const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);
const torusMesh = new THREE.Mesh(torusGeometry, material);
torusMesh.position.x = 1.5;
scene.add(sphereMesh, planeMesh, torusMesh);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Rotate objects
  sphereMesh.rotation.y = 0.1 * elapsedTime;
  planeMesh.rotation.y = 0.1 * elapsedTime;
  torusMesh.rotation.y = 0.1 * elapsedTime;

  sphereMesh.rotation.x = -0.15 * elapsedTime;
  planeMesh.rotation.x = -0.15 * elapsedTime;
  torusMesh.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
