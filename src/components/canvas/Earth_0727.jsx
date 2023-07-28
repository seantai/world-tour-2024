import React, { useRef, useEffect, createRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, useTexture } from "@react-three/drei";
import { ref } from "valtio";
import { SRGBColorSpace } from "three";

import earthVert from "../../glsl/earth.vert";
import earthFrag from "../../glsl/earth.frag";
import { Markers } from "./Markers";

import { locationsArray, markersArray } from "../../data/state";

export default function Earth(props) {
  const { nodes } = useGLTF("/Earth_0727_2.glb");
  const earthRef = useRef();
  const nodeArray = useMemo(() => Object.entries(nodes), [nodes]);

  useEffect(() => {
    if (nodes) {
      // console.log("nodes");
      const dummyArray = [];
      // const dummyArray1 = [];
      const nodeArray = Object.entries(nodes);
      nodeArray.map((marker) => {
        if (["Earth", "Scene"].includes(marker[1].name)) return;
        dummyArray.push({
          name: marker[1].name,
          position: marker[1].position,
          ref: ref(createRef()),
        });
        // dummyArray1.push({
        //   name: marker[1].name,
        //   position: marker[1].position,
        //   rotation: marker[1].rotation,
        //   ref: ref(createRef()),
        // });
      });
      locationsArray.arr = dummyArray;
      // markersArray.arr = dummyArray1;
    }
  }, [nodes]);

  const night = useTexture("./img/earth_night.webp", (t) => {
    t.flipY = false;
    t.colorSpace = SRGBColorSpace;
  });
  const neon = useTexture("./img/earth_neon_dark.webp", (t) => {
    t.flipY = false;
    t.colorSpace = SRGBColorSpace;
  });

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0,
      },
      u_neon: {
        value: neon,
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

  return (
    <>
      <Float
        speed={1}
        rotationIntensity={0.5}
        floatIntensity={0.6}
        floatingRange={[-0.05, 0.05]}
      >
        <group {...props} dispose={null} scale={1}>
          <mesh ref={earthRef} geometry={nodes.Earth.geometry}>
            <shaderMaterial
              vertexShader={earthVert}
              fragmentShader={earthFrag}
              uniforms={uniforms}
            />
          </mesh>

          <Markers nodes={nodes} nodeArray={nodeArray} />
        </group>
      </Float>
    </>
  );
}
