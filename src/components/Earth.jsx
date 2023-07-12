import React, { useRef, useEffect } from "react";
import { useGLTF, CameraControls, useTexture, Float } from "@react-three/drei";
import { state } from "../data/state";
import { useSnapshot } from "valtio";
import { degToRad } from "three/src/math/MathUtils";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import fooVert from "../glsl/globe.vert";
import fooFrag from "../glsl/globe.frag";
// import fooFrag from "../glsl/foo.frag";
// import fooFrag from "../glsl/foo.frag";

export default function Earth(props) {
  // const { nodes, materials } = useGLTF("/earth_0508.glb");
  const { nodes, materials } = useGLTF("/earth_0508.glb");

  const camRef = useRef();
  const earthRef = useRef();

  const snap = useSnapshot(state);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // camRef.current?.fitToBox(earthRef.current, true, {
      //   paddingLeft: 3,
      //   paddingRight: 2,
      // });
      camRef.current?.lookInDirectionOf(
        snap.view[0],
        snap.view[1],
        snap.view[2],
        true
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [state.view]);

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

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.material.uniforms.u_time.value = clock.elapsedTime * 1;
    }
  });

  useEffect(() => {
    if (camRef.current) {
      camRef.current;
      camRef.current.mouseButtons.wheel = 3;
    }
  });

  return (
    <>
      {/* <Float> */}
      <group {...props} dispose={null} scale={1}>
        <mesh
          ref={earthRef}
          geometry={nodes.Sphere.geometry}
          rotation={[degToRad(0), degToRad(150), 0]}
          // rotation={[degToRad(180), degToRad(33), 0]}
          scale={[-1, 1, 1]}
        >
          <shaderMaterial
            vertexShader={fooVert}
            fragmentShader={fooFrag}
            uniforms={uniforms}
            wireframe
          />
        </mesh>
      </group>
      {/* </Float> */}
      <CameraControls
        ref={camRef}
        makeDefault
        // mouseButtons={1}
        // mouseButtons={3}
        // azimuthRotateSpeed={0.001}
        // polarRotateSpeed={0.001}
        // maxSpeed={0.00001}
      >
        {/* <mesh position={[0, 0, -3]}>
          <boxGeometry />
        </mesh> */}
      </CameraControls>
    </>
  );
}

//figure out what this does exactly
// useGLTF.preload("/earth1.glb");
