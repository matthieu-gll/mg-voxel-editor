import { Grid } from "@react-three/drei";

interface CubicGridProps {
  size: number;
}

export const CubicGrid = ({ size }: CubicGridProps) => {
  const gridSize: [number, number, number] = [size, size, size];
  const halfSize = size / 2;

  return (
    <>
      <Grid
        fadeDistance={1024}
        cellSize={1}
        sectionSize={4}
        position={[halfSize, -halfSize, -halfSize]}
        rotation={[0, 0, 0]}
        args={gridSize}
        cellColor={"red"}
        sectionColor={"red"}
      />
      <Grid
        fadeDistance={1024}
        cellSize={1}
        sectionSize={4}
        rotation={[-Math.PI / 2, 0, 0]}
        args={gridSize}
        position={[halfSize, 0, 0]}
        cellColor={"green"}
      />
      <Grid
        fadeDistance={1024}
        cellSize={1}
        sectionSize={4}
        position={[0, 0, -halfSize]}
        rotation={[0, 0, -Math.PI / 2]}
        args={gridSize}
        cellColor={"blue"}
      />
    </>
  );
};
