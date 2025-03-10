"use client";

import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { CUBE_SIZE, SCALE_GRID } from "@/constants";
import { useGlobalStore } from "@/stores/useGlobalStore";

export const AddCubePointer = () => {
  const interactionMode = useGlobalStore((state) => state.interactionMode);
  const modelAddComposite = useGlobalStore((state) => state.modelAddComposite);
  const meshBuildingPlaneRef = useRef<Mesh>(null);
  const meshCubeHelperRef = useRef<Mesh>(null);

  const { raycaster, pointer, camera } = useThree();

  const isAddCubeMode = interactionMode === "add-cube";

  useFrame(() => {
    if (
      !isAddCubeMode ||
      !meshBuildingPlaneRef.current ||
      !meshCubeHelperRef.current
    ) {
      return;
    }

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObject(meshBuildingPlaneRef.current);
    if (intersects.length === 0) {
      return;
    }

    const { point, face } = intersects[0];
    if (!point || !face) {
      return;
    }

    const cubePosition = point.clone().add(face.normal);
    cubePosition
      .divideScalar(CUBE_SIZE)
      .floor()
      .multiplyScalar(CUBE_SIZE)
      .addScalar(CUBE_SIZE / 2);

    meshCubeHelperRef.current.position.copy(cubePosition);
  });

  const handleOnClick = () => {
    if (!meshCubeHelperRef.current) return;
    const position: [number, number, number] = [
      meshCubeHelperRef.current.position.x,
      meshCubeHelperRef.current.position.y,
      meshCubeHelperRef.current.position.z,
    ];
    modelAddComposite({ color: "blue", position });
  };

  return (
    <>
      {isAddCubeMode && (
        <>
          <mesh
            ref={meshCubeHelperRef}
            position={[0, 0, 0]}
            onClick={handleOnClick}
          >
            <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
            <meshBasicMaterial color="blue" opacity={0.4} transparent />
          </mesh>
          <mesh ref={meshBuildingPlaneRef} rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry
              args={[CUBE_SIZE * SCALE_GRID, CUBE_SIZE * SCALE_GRID, CUBE_SIZE]}
            />
            <meshBasicMaterial visible={false} />
          </mesh>
        </>
      )}
    </>
  );
};
