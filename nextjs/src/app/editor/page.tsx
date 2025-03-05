"use client";

import { Model } from "@/components/Model";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

// function Instances() {
//   const instancedMeshRef = useRef<InstancedMesh>(null);
//   const temp = useMemo(() => new THREE.Object3D(), []);
//   const [total];
//   //   useEffect(() => {
//   //     // Set positions
//   //     for (let i = 0; i < count; i++) {
//   //       temp.position.set(
//   //         Math.random() * 10,
//   //         Math.random() * 10,
//   //         Math.random() * 10
//   //       );
//   //       temp.updateMatrix();
//   //       //   random color

//   //       instancedMeshRef.current.setMatrixAt(i, temp.matrix);
//   //     }
//   //     // Update the instance
//   //     instancedMeshRef.current.instanceMatrix.needsUpdate = true;
//   //   }, []);
//   return (
//     <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshBasicMaterial />
//     </instancedMesh>
//   );
// }

const EditorPage = () => {
  //   const object = useMemo(() => new THREE.Object3D(), []);
  //   const instancedMeshRef = useRef<InstancedMesh>(null);
  //   const length = 10;
  //   useEffect(() => {
  //     if (!instancedMeshRef.current) return;
  //     // Set positions
  //     for (let i = 0; i < length; i++) {
  //       object.position.set(Math.random(), Math.random(), Math.random());
  //       object.updateMatrix();
  //       instancedMeshRef.current.setMatrixAt(i, object.matrix);
  //     }
  //     // Update the instance
  //     instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  //   }, [object]);

  return (
    <div className="h-svh w-full bg-neutral-600">
      <Canvas>
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default EditorPage;
