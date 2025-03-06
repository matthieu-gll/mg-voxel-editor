"use client";

import { AddCubePointer } from "@/components/AddCubePointer";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const EditorPage = () => {
  return (
    <Canvas
      className="relative z-0"
      camera={{ fov: 90, position: [0, 100, 0] }}
    >
      <AddCubePointer />
      <OrbitControls />
    </Canvas>
  );
};

export default EditorPage;
