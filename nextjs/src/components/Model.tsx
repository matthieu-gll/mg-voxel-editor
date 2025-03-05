"use client";

export const Model = () => {
  return (
    <>
      <instancedMesh args={[undefined, undefined, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </instancedMesh>
    </>
  );
};
