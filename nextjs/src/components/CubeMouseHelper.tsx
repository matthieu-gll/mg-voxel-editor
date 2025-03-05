import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export const CubeMouseHelper = () => {
  const meshBuildingPlaneRef = useRef<Mesh>(null);
  const meshCubeHelperRef = useRef<Mesh>(null);

  const { raycaster, pointer, camera } = useThree();

  useFrame(() => {
    if (!meshBuildingPlaneRef.current || !meshCubeHelperRef.current) return;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObject(meshBuildingPlaneRef.current);
    if (intersects.length > 0) {
      const { point } = intersects[0];
      meshCubeHelperRef.current.position.set(
        Math.round(point.x) + 0.5,
        Math.round(point.y) + 0.5,
        Math.round(point.z) + 0.5
      );
    }
  });

  return (
    <>
      <mesh ref={meshCubeHelperRef} position={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} opacity={0.4} transparent />
      </mesh>
      <mesh ref={meshBuildingPlaneRef} rotation={[0, 0, 0]}>
        <gridHelper args={[100, 100]} />
      </mesh>
    </>
  );
};
