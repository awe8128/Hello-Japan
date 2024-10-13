import Experience from "../Experience";
import * as THREE from "three";
import { gsap } from "gsap";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }
  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
      if (child.name === "keyboard") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x549dd2);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }
      if (child.name === "Screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.Screen,
        });
      }
    });

    const width = 0.5;
    const height = 0.7;
    const intensity = 2;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(-0.9, 0.4, -0.3);
    rectLight.rotation.y = -Math.PI / 6;

    // rectLight.rotation.z = Math.PI / 4;
    this.actualRoom.add(rectLight);

    const rectLightHelper = new RectAreaLightHelper(rectLight);
    //rectLight.add(rectLightHelper);
    this.scene.add(this.actualRoom);
    //this.actualRoom.scale.set(0.11, 0.11, 0.11);
    //this.actualRoom.rotation.y = Math.PI;
  }
  // setAnimation() {
  //   this.mixer = new THREE.AnimationMixer(this.actualRoom);
  //   this.swim = this.mixer.clipAction(this.room.animations[0]);
  //   this.swim.play();
  // }
  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        (2 * (e.clientX - window.innerWidth / 2)) / window.innerWidth;
      this.lerp.target = this.rotation;
    });
  }
  resize() {}

  update() {
    this.lerp.current = gsap.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current * 0.1;
    // this.mixer.update();
  }
}
