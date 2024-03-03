import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setSunLight();
  }

  setSunLight = () => {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
    this.sunLight.position.set(0, 2, 2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.camera.far = 10;
    this.sunLight.shadow.normalBias = 0.05;

    this.scene.add(this.sunLight);
  };
}
