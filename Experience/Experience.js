import * as THREE from "three";

import Sizes from "./Utils/Sizes";

import Camera from "./Camera";

import Renderer from "./Renderer";

import Time from "./Utils/Time";

import World from "./World/World";

import Resources from "./Utils/Resourses";

import Controls from "./World/Controls";

import assets from "./Utils/assets";

import Theme from "./Theme";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;

    //Creating scene
    this.scene = new THREE.Scene();

    //Adding framerate time
    this.time = new Time();

    //window sizes
    this.sizes = new Sizes();

    //Adding Camera
    this.camera = new Camera();

    //renderer
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();

    //this.Controls = new Controls();
    //eventListener with Event.emitter

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }
  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
