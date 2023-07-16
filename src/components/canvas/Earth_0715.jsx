import React, { useRef, useEffect, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Float } from "@react-three/drei";
import { useCursor } from "@react-three/drei";
import { Instances, Instance } from "@react-three/drei";

import globeVert from "../../glsl/globe.vert";
import globeFrag from "../../glsl/globe.frag";

import { locationsArray } from "../../data/state";
import { useSnapshot } from "valtio";

import { ref } from "valtio";
import { createRef } from "react";

import { MarkerInstances, Marker } from "./EarthInstances";
import { Color } from "three";

import { markersArray } from "../../data/state";

// import { useSnapshot } from "valtio";
import { currentName } from "../../data/state";

export default function Earth(props) {
  const { nodes } = useGLTF("/Earth_0715.glb");

  const earthRef = useRef();

  useEffect(() => {
    if (nodes) {
      const dummyArray = [];
      const dummyArray1 = [];
      nodes.Scene.children.map((marker) => {
        if (marker.name == "Globe") return;
        dummyArray.push({
          name: marker.name,
          position: marker.position,
          ref: ref(createRef()),
        });
        dummyArray1.push({
          name: marker.name,
          position: marker.position,
          rotation: marker.rotation,
          ref: ref(createRef()),
        });
      });
      locationsArray.arr = dummyArray;
      markersArray.arr = dummyArray1;
      // console.log(markersArray);
    }
  }, [nodes]);

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
            />
          </mesh>
          <Markers nodes={nodes} />
        </group>
      </Float>
    </>
  );
}

const Markers = ({ nodes }) => {
  const [hovered, set] = useState();
  useCursor(hovered);

  const readLocationsArray = useSnapshot(locationsArray);
  const readMarkersArray = useSnapshot(markersArray);

  const readCurrentName = useSnapshot(currentName);

  useEffect(() => {
    readMarkersArray.arr &&
      readMarkersArray.arr.map((marker, i) => {
        marker.ref.current.color.set("dodgerblue");
        if (readCurrentName.state == marker.name) {
          marker.ref.current.color.set("#2DE99C");
        }
      });
  }, [readCurrentName.state]);

  // const neonMarker = useTexture("./img/brave_nnacNbK3MN.png", (t) => {
  //   t.flipY = false;
  // });

  return (
    <>
      <Instances geometry={nodes.Venezuela.geometry}>
        <meshStandardMaterial emissiveIntensity={0.2} emissive={"dodgerblue"} />

        {readMarkersArray.arr &&
          readMarkersArray.arr.map((marker, i) => {
            return (
              <Instance
                key={i}
                // color={"dodgerblue"}
                ref={marker.ref}
                position={marker.position}
                rotation={marker.rotation}
                onPointerOver={() => set(true)}
                onPointerOut={() => set(false)}
                onClick={(e) => {
                  readMarkersArray.arr.forEach((marker) => {
                    marker.ref.current.color.set("dodgerblue");
                  });
                  readLocationsArray.arr.forEach((location) => {
                    if (marker.name == location.name) {
                      e.eventObject.color = new Color("#2DE99C");
                      location.ref.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  });
                }}
              />
            );
          })}
      </Instances>
    </>
  );
};
