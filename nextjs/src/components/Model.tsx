"use client";

import { CUBE_SIZE } from "@/constants";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { Edges } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { Vector3, Mesh } from "three";

interface CubeProps {
  index: number;
  position: [number, number, number];
  color: string;
  onPointerOver: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut: () => void;
  onClick: (event: ThreeEvent<MouseEvent>) => void;
  isHovered: boolean;
  isRemoveMode: boolean;
}

interface HoveredState {
  index: number;
  normal: Vector3;
}

const Cube: React.FC<CubeProps> = ({
  index,
  position,
  color,
  onPointerOver,
  onPointerOut,
  onClick,
  isHovered,
  isRemoveMode,
}) => {
  const interactionMode = useGlobalStore((state) => state.interactionMode);
  return (
    <mesh
      key={index}
      position={position}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshBasicMaterial
        color={color}
        opacity={isHovered && isRemoveMode ? 0.4 : 1}
        transparent
      />
      {isHovered && interactionMode !== "nothing" && (
        <Edges linewidth={1} scale={1} color={"white"} />
      )}
    </mesh>
  );
};

export const Model: React.FC = () => {
  const composition = useGlobalStore(
    (state) => state.modelConfiguration.composition
  );
  const modelAddComposite = useGlobalStore((state) => state.modelAddComposite);
  const modelRemoveComposite = useGlobalStore(
    (state) => state.modelRemoveComposite
  );
  const interactionMode = useGlobalStore((state) => state.interactionMode);

  const [hovered, setHovered] = useState<HoveredState | null>(null);
  const previewRef = useRef<Mesh>(null);

  const calculateNewPosition = (
    index: number,
    normal: Vector3
  ): [number, number, number] => {
    const currentPosition = composition[index].position;
    const direction = normal.clone().multiplyScalar(CUBE_SIZE).toArray() as [
      number,
      number,
      number
    ];

    return [
      currentPosition[0] + direction[0],
      currentPosition[1] + direction[1],
      currentPosition[2] + direction[2],
    ];
  };

  useFrame(() => {
    if (
      previewRef.current &&
      hovered &&
      interactionMode === "add-cube" &&
      composition.length > 0
    ) {
      const newPosition = calculateNewPosition(hovered.index, hovered.normal);
      previewRef.current.position.set(...newPosition);
    }
  });

  const handlePointerOver = (
    event: ThreeEvent<PointerEvent>,
    index: number
  ) => {
    event.stopPropagation();
    setHovered({
      index,
      normal: event.face?.normal?.clone() ?? new Vector3(0, 1, 0),
    });
  };

  const handlePointerOut = () => setHovered(null);

  const handleAddCube = (index: number) => {
    if (!hovered) return;
    modelAddComposite({
      color: "blue",
      position: calculateNewPosition(index, hovered.normal),
    });
  };

  const handleRemoveCube = (index: number) => {
    modelRemoveComposite(index);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>, index: number) => {
    event.stopPropagation();

    if (interactionMode === "add-cube") handleAddCube(index);
    if (interactionMode === "remove-cube") handleRemoveCube(index);
  };

  return (
    <>
      {composition.map((cube, index) => (
        <Cube
          key={index}
          index={index}
          position={cube.position}
          color={cube.color}
          onPointerOver={(event) => handlePointerOver(event, index)}
          onPointerOut={handlePointerOut}
          onClick={(event) => handleClick(event, index)}
          isHovered={hovered?.index === index}
          isRemoveMode={interactionMode === "remove-cube"}
        />
      ))}

      {interactionMode === "add-cube" && hovered && (
        <mesh ref={previewRef}>
          <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
          <meshBasicMaterial color="white" opacity={0.4} transparent />
        </mesh>
      )}
    </>
  );
};
