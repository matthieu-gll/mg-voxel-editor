"use client";

import { CubeMouseHelper } from "@/components/CubeMouseHelper";
// import { Model } from "@/components/Model";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const EditorPage = () => {
  return (
    <div className="h-svh w-full bg-neutral-600">
      <Canvas>
        {/* <Model /> */}
        <CubeMouseHelper />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default EditorPage;
