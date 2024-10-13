import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControl();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );

    this.scene.add(this.perspectiveCamera);
    this.helper = new THREE.CameraHelper(this.perspectiveCamera);
    //this.scene.add(this.helper);
    //grid helper
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);

    //this.scene.add(gridHelper);

    //axis helper
    const axesHelper = new THREE.AxesHelper(10);
    //this.scene.add(axesHelper);
    this.perspectiveCamera.position.y = 4;
    this.perspectiveCamera.position.z = 5;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    this.orthographicCamera.position.y = 5;
    this.orthographicCamera.position.z = 11;

    //??????
    this.orthographicCamera.rotation.x = -Math.PI / 2;
    // this.orthographicCamera = new THREE.PerspectiveCamera(
    //   35,
    //   this.sizes.aspect,
    //   0.1,
    //   1000
    // );

    this.scene.add(this.orthographicCamera);

    this.helper = new THREE.CameraHelper(this.orthographicCamera);
    //this.scene.add(this.helper);
    //grid helper
    const size = 20;
    const divisions = 20;
    const gridHelper = new THREE.GridHelper(size, divisions);

    //this.scene.add(gridHelper);

    //axis helper
    const axesHelper = new THREE.AxesHelper(10);
    //this.scene.add(axesHelper);
  }
  setOrbitControl() {
    this.controls = new OrbitControls(this.orthographicCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
  }
  resize() {
    //Updating Perspective Camera no resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    //Updating orthographic Camera no resize
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
    this.helper.matrixWorldNeedsUpdate = true;
    //this.helper.update();
    this.helper.position.copy(this.orthographicCamera.position);
    this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
