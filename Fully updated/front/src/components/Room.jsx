/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\isometric_underground_room.glb --transform 
Files: .\isometric_underground_room.glb [2.22MB] > D:\Course\my-project\public\models\isometric_underground_room-transformed.glb [113.23KB] (95%)
Author: Iyak (https://sketchfab.com/limaujawa)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/isometric-underground-room-11f02a6fb1fa4cd6960e85a1b0ebd7df
Title: Isometric Underground Room
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Room(props) {
  const { nodes, materials } = useGLTF(
    "/models/isometric_underground_room-transformed.glb"
  );
  return (
    <group {...props} dispose={null} scale={1.8}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials.PaletteMaterial001}
        position={[0, 0.986, -1.108]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[1, 0.108, 1]}
        s
      />
      <mesh
        geometry={nodes.Object_41.geometry}
        material={materials.PaletteMaterial002}
        position={[0.874, 0.877, -0.003]}
        rotation={[-Math.PI, 0.982, -Math.PI]}
        scale={0.094}
      />
      <mesh
        geometry={nodes.Object_87.geometry}
        material={materials.PaletteMaterial003}
        position={[0.475, 0.912, 0.405]}
        rotation={[0, -0.786, 0]}
        scale={0.252}
      />
      {/* <instancedMesh
        args={[nodes.Object_17.geometry, materials.PaletteMaterial001, 5]}
        instanceMatrix={nodes.Object_17.instanceMatrix}
      />
      <instancedMesh
        args={[nodes.Object_88.geometry, materials.PaletteMaterial001, 5]}
        instanceMatrix={nodes.Object_88.instanceMatrix}
      />
      <instancedMesh
        args={[nodes.Object_102.geometry, materials.PaletteMaterial001, 15]}
        instanceMatrix={nodes.Object_102.instanceMatrix}
      /> */}
    </group>
  );
}

useGLTF.preload("/models/isometric_underground_room-transformed.glb");
