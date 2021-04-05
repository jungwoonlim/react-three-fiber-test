import React, { useRef, Suspense } from "react";
import "./index.scss";
import { Section } from "./section";
import { Canvas, useFrame } from "react-three-fiber";
import { useGLTF, Sky } from "@react-three/drei";
import { Vector3 } from "three";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
    </>
  );
};

function Model({ url }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} dispose={null} />;
}

const Content = ({ modelPath, position }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, position, 0]}>
        <mesh ref={ref} position={[0, -35, 0]} scale={[10, 10, 10]}>
          <Model url={modelPath} />
        </mesh>
      </group>
    </Section>
  );
};

export default function App() {
  return (
    <>
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        <Sky sunPosition={new Vector3(100, 10, 100)} />
        <Lights />
        <Suspense fallback={null}>
          <Content modelPath="./scene.glb" position={300}></Content>
        </Suspense>
      </Canvas>
    </>
  );
}
