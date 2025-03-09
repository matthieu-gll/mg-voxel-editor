import { CUBE_SIZE, SCALE_GRID } from "@/constants";

export const Grid = () => {
  return (
    <mesh rotation={[0, 0, 0]}>
      <gridHelper args={[CUBE_SIZE * SCALE_GRID, SCALE_GRID]} />
    </mesh>
  );
};
