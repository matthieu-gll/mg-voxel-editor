"use client";

import { useRef, useState } from "react";
import { InstancedMesh, Matrix4, Raycaster, Vector3, Color } from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const Model = () => {
  const instancedMeshRef = useRef<InstancedMesh>(null);
  const { camera, mouse, scene } = useThree();
  const [voxels, setVoxels] = useState<Vector3[]>([new Vector3(0, 0, 0)]);
  const raycaster = useRef(new Raycaster());
  const dummy = new Matrix4();
  const color = new Color();

  // Gère le clic pour ajouter un voxel
  const handlePointerDown = (event: any) => {
    if (!instancedMeshRef.current) return;

    raycaster.current.setFromCamera(mouse, camera);
    const intersects = raycaster.current.intersectObject(instancedMeshRef.current);

    if (intersects.length > 0) {
      const { face, point, instanceId } = intersects[0];
      if (face && typeof instanceId === "number") {
        const normal = face.normal.clone().round();

        const position = voxels[instanceId];
        const newVoxel = new Vector3().copy(position).add(normal);

        // Vérifie si la position existe déjà
        const alreadyExists = voxels.some((v) => v.equals(newVoxel));
        if (!alreadyExists) {
          setVoxels([...voxels, newVoxel]);
        }
      }
    }
  };

  // Mise à jour des voxels dans le render loop
  useFrame(() => {
    voxels.forEach((voxel, i) => {
      dummy.makeTranslation(voxel.x, voxel.y, voxel.z);
      instancedMeshRef.current?.setMatrixAt(i, dummy);
      instancedMeshRef.current?.setColorAt(i, color.setHex(0xff9900)); // Orange
    });

    instancedMeshRef.current!.instanceMatrix.needsUpdate = true;
    instancedMeshRef.current!.instanceColor!.needsUpdate = true;
  });

  return (
    <>
      <OrbitControls />
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, voxels.length]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial vertexColors />
      </instancedMesh>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};
