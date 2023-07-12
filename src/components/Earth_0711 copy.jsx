import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useGLTF, CameraControls, useTexture, Float } from "@react-three/drei";
import { state } from "../data/state";
import { useSnapshot } from "valtio";
import { degToRad } from "three/src/math/MathUtils";
import { useThree } from "@react-three/fiber";

import { useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import globeVert from "../glsl/globe.vert";
import globeFrag from "../glsl/globe.frag";

import { locationsArray } from "../data/state";
import { Vector3, Box3 } from "three";

export default function Earth(props) {
  const { nodes } = useGLTF("/Earth_0711.glb");

  // useEffect(() => {
  //   let arr = [];
  //   let foo = Object.entries(nodes);

  //   // foo.forEach((node) => {
  //   //   if (node[0] == "Scene") {
  //   //     if (node[0] == "Globe") return;
  //   //     console.log(node[1]);
  //   //   }
  //   // });
  // }, []);

  const earthRef = useRef();
  const camRef = useRef();
  const venRef = useRef();
  const snap = useSnapshot(state);

  const night = useTexture("./img/earth_night.jpg", (t) => {
    t.flipY = false;
  });

  const day = useTexture("./img/earth_day.jpg", (t) => {
    t.flipY = false;
  });

  const neon = useTexture("./img/earth_neon.jpg", (t) => {
    t.flipY = false;
  });

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0,
      },
      u_neon: {
        value: neon,
      },
      u_day: {
        value: day,
      },
      u_night: {
        value: night,
      },
    }),
    []
  );

  useEffect(() => {
    if (camRef.current) {
      camRef.current.mouseButtons.wheel = 3;
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      // const direction = new Vector3();
      // console.log(snap.view);
      // direction
      //   .subVectors(
      //     snap.view[0],
      //     snap.view[1],
      //     snap.view[2],
      //     new Vector3(0, 0, 0)
      //   )
      //   .normalize();
      // // console.log(direction);
      // const offset = new Vector3();
      // offset.copy(direction).multiplyScalar(4);
      // camRef.current.setLookAt(offset.x, offset.y, offset.z, 0, 0, 0, true);
      // camRef.current?.lookInDirectionOf(
      //   snap.view[0],
      //   snap.view[1],
      //   snap.view[2],
      //   true
      // );
    }, 500);
    return () => clearTimeout(timeout);
  }, [state.view]);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.material.uniforms.u_time.value = clock.elapsedTime * 1;
    }
  });

  return (
    <>
      <Float>
        <group {...props} dispose={null} scale={1}>
          <mesh
            ref={earthRef}
            geometry={nodes.Globe.geometry}
            onClick={() => {
              const direction = new Vector3();
              console.log(snap.view);
              direction
                .subVectors(
                  snap.view.x,
                  snap.view.y,
                  snap.view.z,
                  new Vector3(0, 0, 0)
                )
                .normalize();
              // console.log(direction);
              const offset = new Vector3();
              offset.copy(direction).multiplyScalar(4);

              camRef.current.setLookAt(
                offset.x,
                offset.y,
                offset.z,
                0,
                0,
                0,
                true
              );
            }}
          >
            <shaderMaterial
              vertexShader={globeVert}
              fragmentShader={globeFrag}
              uniforms={uniforms}
              side={1}
              // wireframe
            />
          </mesh>
          <mesh
            ref={venRef}
            geometry={nodes.Venezuela.geometry}
            material-transparent
            material-opacity={0}
            position={[0.42, 0.12, 0.95]}
            rotation={[1.26, -0.31, -0.42]}
          >
            {/* <meshNormalMaterial side={2} /> */}
          </mesh>
        </group>
      </Float>
      <CameraControls ref={camRef} makeDefault />
    </>
  );
}
