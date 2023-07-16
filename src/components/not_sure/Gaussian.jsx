import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";
import fooVert from "../glsl/gaussian.vert";
import fooFrag from "../glsl/gaussian.frag";
import { useControls } from "leva";
import * as THREE from "three";

export const Foo = (props) => {
  // const geometryRef = useRef();
  // const fooTexture = useTexture("./img/favicon.ico");

  // const fooRef = useRef();

  // const { progress } = useControls({
  //   progress: {
  //     value: 0,
  //     min: 0,
  //     max: 1,
  //     step: 0.01,
  //     onChange: (v) => {
  //       fooRef.current.material.uniforms.u_progress.value = v;
  //       console.log(fooRef.current.material.uniforms.u_progress);
  //       // console.log(v);
  //     },
  //   },
  // });

  // const uniforms = useMemo(
  //   () => ({
  //     u_progress: {
  //       value: 0,
  //     },
  //     // u_texture: {
  //     //   value: fooTexture,
  //     // },
  //     // u_height: {
  //     //   value: fooTexture,
  //     // },
  //   }),
  //   []
  // );
  // const { nodes, materials } = useGLTF("/silo_ui.glb");
  // const { nodes } = useGLTF("/Suz.glb");

  // // const modelRef = useRef();
  // const [modelHeight, setModelHeight] = useState(0);

  // useEffect(() => {
  //   if (fooRef.current) {
  //     const bbox = new THREE.Box3().setFromObject(fooRef.current);
  //     const size = new THREE.Vector3();
  //     bbox.getSize(size);
  //     setModelHeight(size.y);
  //     console.log(size);
  //   }
  // }, [fooRef]);

  // const boundingBox = new THREE.Box3();
  // const boundingBoxSize = new THREE.Vector3();

  // useFrame(() => {
  //   if (fooRef.current) {
  //     boundingBox.setFromObject(fooRef.current);
  //     boundingBox.getSize(boundingBoxSize);

  //     console.log(boundingBox.getSize(boundingBoxSize));
  //     // ref.current.position.set(
  //     //   fooRef.current.position.x + (boundingBoxSize.x * anchor[0]) / 2,
  //     //   fooRef.current.position.y + (boundingBoxSize.y * anchor[1]) / 2,
  //     //   fooRef.current.position.z + (boundingBoxSize.z * anchor[2]) / 2
  //     // )
  //   }
  // });

  return (
    <>
      <group {...props} dispose={null}>
        <mesh>
          {/* <cylinderGeometry /> */}
          <boxGeometry />
          {/* <planeGeometry /> */}
          <shaderMaterial
            vertexShader={fooVert}
            fragmentShader={fooFrag}
            // uniforms={uniforms}
          />
        </mesh>
      </group>
    </>
  );
};
