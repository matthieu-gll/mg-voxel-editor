"use client";

import { AddCubePointer } from "@/components/AddCubePointer";
import { Grid } from "@/components/Grid";
import { Model } from "@/components/Model";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const EditorPage = () => {
  const { cameraMode } = useGlobalStore();
  return (
    <Canvas
      className="relative z-0"
      camera={{ fov: 90, position: [0, 100, 0] }}
    >
      <Model />
      <AddCubePointer />
      <Grid />
      <OrbitControls enabled={cameraMode === "free"} />
      <ambientLight intensity={1} />
    </Canvas>
  );
};

export default EditorPage;
