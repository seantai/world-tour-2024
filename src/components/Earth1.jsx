import React, { useRef, useEffect } from "react";
import { useGLTF, CameraControls } from "@react-three/drei";
import { state } from "../data/state";
import { useSnapshot } from "valtio";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/earth_0508.glb");

  const camRef = useRef();

  const snap = useSnapshot(state);

  useEffect(() => {
    const timeout = setTimeout(() => {
      camRef.current?.lookInDirectionOf(
        snap.view[0],
        snap.view[1],
        snap.view[2],
        true
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [state.view]);

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes.Sphere.geometry}
          material={materials["Material.001"]}
          position={[0, -0.06, 0]}
        />
        <mesh
          geometry={nodes.Pin.geometry}
          material={materials["PinMaterial.001"]}
          position={[0.41, 0.1, -0.89]}
          rotation={[1.13, 0, 0]}
          scale={0.43}
        />
        <mesh
          geometry={nodes.Pin001.geometry}
          material={materials["PinMaterial.003"]}
          position={[0.8, -0.07, 0.59]}
          rotation={[0, 0, 0.88]}
          scale={0.43}
        />
        <mesh
          geometry={nodes.Pin002.geometry}
          material={materials["PinMaterial.004"]}
          position={[0.85, 0.48, -0.05]}
          rotation={[0.27, 0.14, 0.88]}
          scale={0.43}
        />
        <mesh
          geometry={nodes.Pin003.geometry}
          material={materials["PinMaterial.005"]}
          position={[0.21, 0.33, 0.89]}
          rotation={[-1.51, 0.82, 0.53]}
          scale={0.43}
        />
        <mesh
          geometry={nodes.Pin004.geometry}
          material={materials["PinMaterial.006"]}
          position={[-0.3, 0.17, 0.91]}
          rotation={[-1.51, 0.82, 0.53]}
          scale={0.43}
        />
      </group>
      <CameraControls
        ref={camRef}
        makeDefault
        mouseButtons={3}
        // azimuthRotateSpeed={0.001}
        // polarRotateSpeed={0.001}
        // maxSpeed={0.00001}
      />
    </>
  );
}

//figure out what this does exactly
// useGLTF.preload("/earth1.glb");
