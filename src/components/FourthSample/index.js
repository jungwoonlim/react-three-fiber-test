import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, useFrame, extend } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { AdditiveBlendingShader, VolumetricLightShader } from "./shaders";
// import { useGLTF } from "drei";
import { useGLTF } from "@react-three/drei";
import "./styles.css";

extend({ EffectComposer, RenderPass, ShaderPass });

const DEFAULT_LAYER = 0;
const OCCLUSION_LAYER = 1;

// Component auto-generated by GLTFJSX: https://github.com/react-spring/gltfjsx
function Elf({ layer = DEFAULT_LAYER }) {
  const group = useRef();
  const { nodes } = useGLTF("./scene.glb");
  const material = useMemo(() => {
    if (layer === DEFAULT_LAYER)
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a2a2a"),
        roughness: 1,
        metalness: 0.9,
      });
    else
      return new THREE.MeshBasicMaterial({ color: new THREE.Color("black") });
  }, [layer]);

  useFrame(() => (group.current.rotation.y += 0.004));

  return (
    <group ref={group}>
      <group rotation={[-1.5707963267948963, 0, 0]} position={[0, 2, 0]}>
        <mesh
          geometry={nodes.mesh_0.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        ></mesh>
        <mesh
          geometry={nodes.mesh_1.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        ></mesh>
        <mesh
          geometry={nodes.mesh_2.geometry}
          material={material}
          layers={layer}
          receiveShadow
          castShadow
        ></mesh>
      </group>
    </group>
  );
}

function Effects() {
  const { gl, scene, camera, size } = useThree();
  const occlusionRenderTarget = useMemo(
    () => new THREE.WebGLRenderTarget(),
    []
  );
  const occlusionComposer = useRef();
  const composer = useRef();

  useEffect(() => {
    occlusionComposer.current.setSize(size.width, size.height);
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    camera.layers.set(OCCLUSION_LAYER);
    occlusionComposer.current.render();
    camera.layers.set(DEFAULT_LAYER);
    composer.current.render();
  }, 1);

  return (
    <>
      <mesh layers={OCCLUSION_LAYER} position={[0, 4.5, -10]}>
        <sphereBufferGeometry args={[5, 32, 32]} />
        <meshBasicMaterial />
      </mesh>
      <effectComposer
        ref={occlusionComposer}
        args={[gl, occlusionRenderTarget]}
        renderToScreen={false}
      >
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass
          attachArray="passes"
          args={[VolumetricLightShader]}
          needsSwap={false}
        />
      </effectComposer>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass
          attachArray="passes"
          args={[AdditiveBlendingShader]}
          uniforms-tAdd-value={occlusionRenderTarget.texture}
        />
        <shaderPass
          attachArray="passes"
          args={[FXAAShader]}
          uniforms-resolution-value={[1 / size.width, 1 / size.height]}
          renderToScreen
        />
      </effectComposer>
    </>
  );
}

function App() {
  return (
    <Canvas
      shadowMap
      style={{ background: "#171717" }}
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{ antialias: false }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 60, -100]} intensity={20} />
      <pointLight position={[-50, 0, -50]} intensity={2} />
      <spotLight
        castShadow
        intensity={8}
        angle={Math.PI / 10}
        position={[10, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <mesh position={[0, 4.5, -10]}>
        <sphereBufferGeometry args={[4.9, 32, 32]} />
        <meshBasicMaterial transparent opacity={0.5} />
      </mesh>
      <Suspense fallback={null}>
        <Elf />
        <Elf layer={OCCLUSION_LAYER} />
      </Suspense>
      <Effects />
    </Canvas>
  );
}

export default App;
