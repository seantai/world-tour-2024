import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, CameraControls, useTexture, Float } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";

import globeVert from "../glsl/globe.vert";
import globeFrag from "../glsl/globe.frag";

import { state } from "../data/state";
import { useSnapshot } from "valtio";

export default function Earth(props) {
  const { nodes } = useGLTF("/Earth_0711.glb");

  const earthRef = useRef();
  const camRef = useRef();
  const snap = useSnapshot(state);

  const night = useTexture("./img/earth_night.jpg", (t) => {
    t.flipY = false;
  });
  // const day = useTexture("./img/earth_day.jpg", (t) => {
  //   t.flipY = false;
  // });
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
      // u_day: {
      //   value: day,
      // },
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
  }, []);

  useEffect(() => {
    if (snap.currentView == null) return;
    console.log("clicked");
    const timeout = setTimeout(() => {
      const direction = new Vector3();
      direction
        .subVectors(
          new Vector3(
            snap.currentView[0],
            snap.currentView[1],
            snap.currentView[2]
          ),
          new Vector3(0, 0, 0)
        )
        .normalize();
      const offset = new Vector3();
      offset.copy(direction).multiplyScalar(4);
      camRef.current.setLookAt(offset.x, offset.y, offset.z, 0, 0, 0, true);
    }, 500);
    return () => clearTimeout(timeout);
  }, [state.currentView]);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.material.uniforms.u_time.value = clock.elapsedTime * 1;
    }
  });

  return (
    <>
      <Float
        speed={1}
        rotationIntensity={0.5}
        floatIntensity={0.6}
        floatingRange={[-0.05, 0.05]}
      >
        <group {...props} dispose={null} scale={1}>
          <mesh
            ref={earthRef}
            geometry={nodes.Globe.geometry}
            // rotation={[0, MathUtils.DEG2RAD(30), 0]}
          >
            <shaderMaterial
              vertexShader={globeVert}
              fragmentShader={globeFrag}
              uniforms={uniforms}
              side={1}
              // wireframe
            />
          </mesh>
        </group>
      </Float>
      <CameraControls ref={camRef} makeDefault />
    </>
  );
}
