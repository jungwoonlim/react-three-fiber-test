import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles.css";

const Bird = () => {
  const mixer = useRef();
  const [gltf] = useLoader(GLTFLoader, "/Grunt.glb");

  useEffect(() => {
    if (gltf) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      //      const action = mixer.current.clipAction(gltf.animations[0])
      console.log(gltf.animations);
      //    action.play()
    }
  }, [gltf]);

  useFrame(
    ({ clock }) => mixer.current && mixer.current.update(clock.getDelta())
  );
  return gltf ? <primitive object={gltf.scene} /> : null;
};

const App = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, -10], fov: 50 }}
      onCreated={({ camera, gl, scene }) => {
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.background = new THREE.Color("lightblue");
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Bird />
    </Canvas>
  );
};

export default App;
