import React, { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Float } from "@react-three/drei";
import { useCursor } from "@react-three/drei";

import globeVert from "../../glsl/globe.vert";
import globeFrag from "../../glsl/globe.frag";

import { fooArr } from "../../data/state";
import { useSnapshot } from "valtio";
import { locationData } from "../../data/locations";

import { ref } from "valtio";
import { createRef } from "react";

export default function Earth(props) {
  const { nodes, materials } = useGLTF("/Earth_0715.glb");

  const readFooArr = useSnapshot(fooArr);

  useEffect(() => {
    if (nodes) {
      const dummyArray = [];
      nodes.Scene.children.map((marker) => {
        if (marker.name == "Globe") return;
        dummyArray.push({
          name: marker.name,
          position: marker.position,
          ref: ref(createRef()),
        });
      });
      fooArr.arr = dummyArray;
    }
  }, [nodes]);

  // useEffect(() => {
  //   if (readFooArr.arr) console.log(readFooArr.arr);
  // }, [readFooArr.arr]);

  const earthRef = useRef();

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
          <mesh ref={earthRef} geometry={nodes.Globe.geometry}>
            <shaderMaterial
              vertexShader={globeVert}
              fragmentShader={globeFrag}
              uniforms={uniforms}
              // wireframe
            />
          </mesh>
          <Markers />
        </group>
      </Float>
    </>
  );
}

const Markers = (props) => {
  const { nodes, materials } = useGLTF("/Earth_0715.glb");
  const [hovered, set] = useState();
  useCursor(hovered);

  return (
    <>
      {nodes.Scene.children.map((marker, i) => {
        if (marker.name == "Globe") return;
        return (
          <mesh
            key={i}
            geometry={nodes[`${marker.name}`].geometry}
            // material={materials["Material.003"]}
            position={marker.position}
            rotation={marker.rotation}
            // scale={0.04}
            onPointerOver={() => set(true)}
            onPointerOut={() => set(false)}
            onClick={(e) => {
              // console.log(e.eventObject);
              locationData.forEach((location) => {
                if (marker.name == location.name) {
                  console.log(location.name, marker.name);
                }
              });
            }}
          />
        );
      })}
    </>
  );
};
