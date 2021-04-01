import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import objModel from "./models/male02.obj";
import imageUrl from "./models/uv_grid_opengl.jpg";

class Loader {
  constructor() {
    this.container = null;

    this.camera = null;
    this.scene = null;
    this.renderer = null;

    this.mouseX = 0;
    this.mouseY = 0;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.object = null;
  }

  init() {
    this.container = document.createElement("div");
    document.getElementById("canvas").appendChild(this.container);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    this.camera.position.z = 250;

    // scene

    this.scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    this.camera.add(pointLight);
    this.scene.add(this.camera);

    // manager

    function loadModel() {
      this.object.traverse(function (child) {
        if (child.isMesh) child.material.map = texture;
      });

      this.object.position.y = -95;
      this.scene.add(this.object);
    }

    const manager = new THREE.LoadingManager(loadModel);

    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total);
    };

    // texture

    const textureLoader = new THREE.TextureLoader(manager);
    const texture = textureLoader.load(imageUrl);

    // model

    function onProgress(xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log("model " + Math.round(percentComplete, 2) + "% downloaded");
      }
    }

    function onError() {}

    this.loader = new OBJLoader(manager);
    this.loader.load(
      objModel,
      function (obj) {
        this.object = obj;
      },
      onProgress,
      onError
    );

    //

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    document.addEventListener("mousemove", this.onDocumentMouseMove);

    //

    window.addEventListener("resize", this.onWindowResize);
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onDocumentMouseMove(event) {
    this.mouseX = (event.clientX - this.windowHalfX) / 2;
    this.mouseY = (event.clientY - this.windowHalfY) / 2;
  }

  //

  render() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;

    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }
}

export default Loader;
