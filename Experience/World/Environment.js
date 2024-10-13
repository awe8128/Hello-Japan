import Experience from "../Experience";
import * as THREE from "three";
import gsap from "gsap";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
  }
  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 6);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-1.5, 5, 3);
    this.scene.add(this.sunLight);

    this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientlight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      gsap.to(this.sunLight.color, {
        r: 0.1725,
        g: 0.2313,
        b: 0.6862,
      });
      gsap.to(this.ambientlight.color, {
        r: 0.1725,
        g: 0.2313,
        b: 0.6862,
      });
      gsap.to(this.sunLight, {
        intensity: 0.78,
      });
      gsap.to(this.ambientlight, {
        intensity: 0.78,
      });
    } else {
      gsap.to(this.sunLight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      gsap.to(this.ambientlight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      gsap.to(this.sunLight, {
        intensity: 2,
      });
      gsap.to(this.ambientlight, {
        intensity: 2,
      });
    }
  }
  resize() {}

  update() {}
}
