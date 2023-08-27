import React, { useRef, useEffect, useMemo } from "react";
import { Color } from "three";
import { Instances, Instance } from "@react-three/drei";
import { useSnapshot } from "valtio";

import { locationsArray, currentName, markerHovered } from "../../data/state";

import markerVert from "../../glsl/marker.vert";
import markerFrag from "../../glsl/marker.frag";

export const Markers = ({ nodes, nodeArray }) => {
  //
  const readLocationsArray = useSnapshot(locationsArray);
  //
  const groupRef = useRef();
  //
  // const uniforms = useMemo(
  //   () => ({
  //     u_hoverIntensity: {
  //       value: 1,
  //     },
  //   }),
  //   []
  // );
  //

  return (
    <>
      <Instances geometry={nodes.Korea.geometry}>
        <shaderMaterial
          vertexShader={markerVert}
          fragmentShader={markerFrag}
          // uniforms={uniforms}
        />
        {/* <meshStandardMaterial toneMapped={false} /> */}
        <group ref={groupRef}>
          {nodeArray.map((marker, i) => {
            if (["Earth", "Scene"].includes(marker[1].name)) return;
            return (
              <Marker
                key={i}
                marker={marker}
                readLocationsArray={readLocationsArray}
              />
            );
          })}
        </group>
      </Instances>
    </>
  );
};

const Marker = ({ marker, readLocationsArray }) => {
  const instanceRef = useRef();

  const readCurrentName = useSnapshot(currentName);

  useEffect(() => {
    const green = new Color(0.2, 1.4, 1);
    const yellow = new Color(3, 3, 1);

    if (readCurrentName.state == instanceRef.current.name) {
      instanceRef.current.color = yellow;
    } else {
      instanceRef.current.color = green;
    }
  }, [readCurrentName.state]);

  return (
    <Instance
      color={[0.2, 1.4, 1]}
      ref={instanceRef}
      name={marker[1].name}
      position={marker[1].position}
      rotation={marker[1].rotation}
      // onPointerEnter={(e) => {
      //   markerHovered.state = true;
      // }}
      // onPointerLeave={(e) => {
      //   markerHovered.state = false;
      // }}
      // onClick={(e) => {
      //   currentName.state = instanceRef.current.name;

      //   readLocationsArray.arr.forEach((location) => {
      //     if (marker[1].name == location.name) {
      //       location.ref.current?.scrollIntoView({
      //         behavior: "smooth",
      //         inline: "center",
      //       });
      //     }
      //   });
      // }}
    />
  );
};
