import React, { useRef, useEffect, useMemo, useState, createRef } from "react";
import { Color } from "three";
import { useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Float,
  Html,
  Instances,
  Instance,
} from "@react-three/drei";
import { useCursor } from "@react-three/drei";
import { useSnapshot, ref } from "valtio";

import globeVert from "../../glsl/globe.vert";
import globeFrag from "../../glsl/globe.frag";

import {
  locationsArray,
  markersArray,
  currentName,
  currentMarkerHover,
  currentPosition,
} from "../../data/state";

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
    }
  }, [nodes]);

  const night = useTexture("./img/earth_night.jpg", (t) => {
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
  // console.log(hovered);

  const readLocationsArray = useSnapshot(locationsArray);
  const readMarkersArray = useSnapshot(markersArray);
  const readCurrentName = useSnapshot(currentName);
  const readCurrentMarkerHover = useSnapshot(currentMarkerHover);

  useEffect(() => {
    readMarkersArray.arr &&
      readMarkersArray.arr.forEach((marker, i) => {
        marker.ref.current.color.set("dodgerblue");
        if (readCurrentName.state == marker.name) {
          marker.ref.current.color.set("#2DE99C");
        }
      });
  }, [readCurrentName.state]);

  // const neonMarker = useTexture("./img/brave_nnacNbK3MN.png", (t) => {
  //   t.flipY = false;
  // });

  const [foo, setFoo] = useState();
  console.log(readMarkersArray.arr);

  return (
    <>
      <Instances geometry={nodes.Venezuela.geometry}>
        <meshStandardMaterial emissiveIntensity={0.2} emissive={"dodgerblue"} />

        {readMarkersArray.arr &&
          readMarkersArray.arr.map((marker, i) => {
            // console.log(marker)
            return (
              <Instance
                key={i}
                // color={"dodgerblue"}
                name={marker.name}
                ref={marker.ref}
                position={marker.position}
                rotation={marker.rotation}
                onPointerOver={(e) => {
                  set(true);
                  // console.log(e.eventObject.name);
                  // readMarkersArray.arr.forEach((marker) => {
                  //   if (marker.name == e.eventObject.name) {
                  //     setFoo(true);
                  //     currentMarkerHover.state = marker.name;
                  //   }
                  // });
                }}
                onPointerOut={() => set(false)}
                onClick={(e) => {
                  // readMarkersArray.arr.forEach((marker) => {
                  //   marker.ref.current.color.set("dodgerblue");
                  //   // currentPosition.state = position;
                  // });
                  console.log(e.eventObject.name);
                  readLocationsArray.arr.forEach((location) => {
                    if (marker.name == location.name) {
                      e.eventObject.color = new Color("#2DE99C");
                      location.ref.current?.scrollIntoView({
                        behavior: "smooth",
                        inline: "center",
                      });
                    }
                  });
                }}
              >
                {/* {foo && readCurrentMarkerHover.state && (
                  <Html
                    // key={i}
                    // occlude="blending"
                    occlude
                    onOcclude={set}
                    style={{
                      transition: "all 0.2s",
                      opacity: hovered ? 1 : 0,
                      transform: `scale(${hovered ? 0.5 : 1})`,
                    }}
                  >
                    <div className="font-angkor text-3xl text-slate-300">
                      {marker.name}
                    </div>
                  </Html>
                )} */}
                {/* {hovered &&
                  readLocationsArray.arr.map((location, i) => {
                    if (marker.name == location.name) {
                      console.log(marker.name);
                      return (
                        <Html
                          key={i}
                          occlude="blending"
                          // occlude
                          onOcclude={set}
                          style={{
                            transition: "all 0.2s",
                            opacity: hovered ? 1 : 0,
                            transform: `scale(${hovered ? 0.5 : 1})`,
                          }}
                        >
                          <div className="font-angkor text-3xl text-slate-300">
                            {marker.name}
                          </div>
                        </Html>
                      );
                    }
                  })} */}
                {/*   <Html
                  // occlude="blending"
                  onOcclude={set}
                  style={{
                    transition: "all 0.2s",
                    opacity: hovered ? 1 : 0,
                    transform: `scale(${hovered ? 0.5 : 1})`,
                  }}
                >
                  /~ <div className="font-angkor text-3xl text-slate-300">
                    {marker.name}
                  </div> ~/
                
                </Html>*/}
              </Instance>
            );
          })}
      </Instances>
    </>
  );
};
