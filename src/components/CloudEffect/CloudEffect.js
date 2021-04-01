import * as THREE from "three";
import {
  BloomEffect,
  BlendFunction,
  KernelSize,
  EffectPass,
  EffectComposer,
  RenderPass,
} from "postprocessing";
import CloudImage from "./cloud.png";

class CloudEffect {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.ambient = null;
    this.directionalLight = null;
    this.orangeLight = null;
    this.redLight = null;
    this.blueLight = null;

    this.loader = null;
    this.cloudGeo = null;
    this.cloudMaterial = null;

    this.cloudParticles = null;
    this.bloomEffect = null;
    this.effectpass = null;
    this.composer = null;
  }

  startEffect = () => {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27;

    // Light
    this.ambient = new THREE.AmbientLight(0x555555);
    this.scene.add(this.ambient);

    this.directionalLight = new THREE.DirectionalLight(0xff8c19);
    this.directionalLight.position.set(0, 0, 1);
    this.scene.add(this.directionalLight);

    this.orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
    this.orangeLight.position.set(200, 300, 100);
    this.scene.add(this.orangeLight);

    this.redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
    this.redLight.position.set(100, 300, 100);
    this.scene.add(this.redLight);

    this.blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
    this.blueLight.position.set(300, 300, 200);
    this.scene.add(this.blueLight);

    // renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene.fog = new THREE.FogExp2(0x009dd6, 0.001);
    this.renderer.setClearColor(this.scene.fog.color);
    document
      .getElementById("CloudEffect")
      .appendChild(this.renderer.domElement);

    // texture loader
    this.cloudParticles = [];

    this.loader = new THREE.TextureLoader();
    this.loader.load(CloudImage, (texture) => {
      // texture is loaded
      this.cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
      this.cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
      });

      for (let p = 0; p < 50; p++) {
        let cloud = new THREE.Mesh(this.cloudGeo, this.cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 2 * Math.PI;
        cloud.material.opacity = 0.55;
        this.cloudParticles.push(cloud);
        this.scene.add(cloud);
      }
    });

    this.bloomEffect = new BloomEffect({
      blendFunction: BlendFunction.COLOR_DODGE,
      kernelSize: KernelSize.SMALL,
      useLuminanceFilter: true,
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.75,
    });
    this.bloomEffect.blendMode.opacity.value = 0.3;

    this.effectpass = new EffectPass(this.camera, this.bloomEffect);
    this.effectpass.renderToScreen = true;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.effectpass);
    window.addEventListener("resize", this.onWindowResize);
    this.render();
  };
  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  render = () => {
    requestAnimationFrame(this.render);

    this.cloudParticles.forEach((p) => {
      p.rotation.z -= 0.005;
    });

    this.composer.render(0.1);
  };
}

export default CloudEffect;
