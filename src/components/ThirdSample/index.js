import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Box } from "drei/shapes";
import "./styles.css";

function Scene() {
  const scene = useRef();
  useFrame(() => {
    scene.current.rotation.x += 0.04;
    scene.current.rotation.y += 0.04;
    scene.current.rotation.z += 0.04;
  });
  return (
    <group ref={scene}>
      <Box>
        <meshLambertMaterial attach="material" color="white" />
      </Box>
    </group>
  );
}

function App() {
  return (
    <Canvas>
      <directionalLight intensity={0.5} />
      <Scene />
    </Canvas>
  );
}

export default App;
