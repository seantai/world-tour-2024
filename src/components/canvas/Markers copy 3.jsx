import React, { useRef, useEffect, useState, useMemo } from "react";
import { Color, DynamicDrawUsage, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor, Instances, Instance, useGLTF } from "@react-three/drei";
import { useSnapshot, ref } from "valtio";

import {
  locationsArray,
  markersArray,
  currentName,
  currentMarkerHover,
  currentPosition,
} from "../../data/state";

import markerVert from "../../glsl/marker.vert";
import markerFrag from "../../glsl/marker.frag";

export const Markers = ({ nodes, nodeArray }) => {
  // const { nodes } = useGLTF("/Earth_0719_3-transformed.glb");
  // const [hovered, set] = useState();
  // useCursor(hovered);
  // // console.log(hovered);

  // const readLocationsArray = useSnapshot(locationsArray);
  // const readMarkersArray = useSnapshot(markersArray);
  // const readCurrentName = useSnapshot(currentName);
  // const readCurrentMarkerHover = useSnapshot(currentMarkerHover);

  // useEffect(() => {
  //   readMarkersArray.arr &&
  //     readMarkersArray.arr.forEach((marker, i) => {
  //       marker.ref.current.color.set("dodgerblue");
  //       if (readCurrentName.state == marker.name) {
  //         marker.ref.current.color.set("#2DE99C");
  //       }
  //     });
  // }, [readCurrentName.state]);

  // const neonMarker = useTexture("./img/brave_nnacNbK3MN.png", (t) => {
  //   t.flipY = false;
  // });

  // const [foo, setFoo] = useState();
  // console.log(readMarkersArray.arr);

  const readLocationsArray = useSnapshot(locationsArray);
  const readMarkersArray = useSnapshot(markersArray);
  const readCurrentName = useSnapshot(currentName);
  const readCurrentMarkerHover = useSnapshot(currentMarkerHover);

  // useEffect(() => {
  //   readMarkersArray.arr &&
  //     readMarkersArray.arr.forEach((marker, i) => {
  //       marker.ref.current.color.set("dodgerblue");
  //       if (readCurrentName.state == marker.name) {
  //         marker.ref.current.color.set("#2DE99C");
  //       }
  //     });
  // }, [readCurrentName.state]);
  // readLocationsArray.arr.forEach((location) => {
  // if (marker[1].name == location.name) {
  //   //"#2DE99C" cool green color
  //   e.eventObject.color = new Color("#2DE99C");
  //   location.ref.current?.scrollIntoView({
  //     behavior: "smooth",
  //     inline: "center",
  //   });
  // }
  // });

  // useEffect(() => {
  //   readMarkersArray.arr &&
  //     readMarkersArray.arr.forEach((marker, i) => {
  //       marker.ref.current.color.set("dodgerblue");
  //       if (readCurrentName.state == marker.name) {
  //         marker.ref.current.color.set("#2DE99C");
  //       }
  //     });
  // }, [readMarkersArray.arr]);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0,
      },
      // u_neon: {
      //   value: neon,
      // },
      // u_night: {
      //   value: night,
      // },
    }),
    []
  );

  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((marker) => {
        if (marker.name == "Jamaica") {
          // marker.color
          // marker.color = new Color([10, 7, 1]);
          // console.log(());
          // marker.color.emissiveIntensity = 0;
          // console.log((marker.instanceColor = new Color([10, 7, 1])));
          // marker.color = new Color("#beffd1");
          // marker.emissive = new Color([4, 2.5, 1]);
          // marker.emissiveIntensity = 4;
        }
      });
    }
  }, []);

  // const emissiveColors = new Float32Array(numInstances * 3);

  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360); // 0 to 359
    const saturation = Math.floor(Math.random() * 30) + 70; // 70 to 100
    const lightness = Math.floor(Math.random() * 30) + 70; // 70 to 100
    const color = new Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    return color;
  }

  const [a_color] = useMemo(() => {
    const a_color = new Float32Array(
      Array.from(
        { length: (nodeArray.length - 2) * 3 },
        () => Math.random() + 2
      )
    );

    return [a_color];
  }, []);
  // console.log();

  return (
    <>
      <Instances geometry={nodes.Korea.geometry}>
        {/* <meshStandardMaterial
          emissive={[4, 4.5, 1]}
          emissiveIntensity={0.2}
          toneMapped={false}
        /> */}
        {/* <meshNormalMaterial /> */}
        <shaderMaterial
          vertexShader={markerVert}
          fragmentShader={markerFrag}
          uniforms={uniforms}
          // emissive={[10, 4.5, 1]}
          // emissiveIntensity={0.2}
          // toneMapped={false}
        />
        <Instance
          // ref={marker.ref}
          // ref={instanceRef}
          // name={marker[1].name}
          position={nodes.Colombia.position}
          rotation={nodes.Colombia.rotation}
          // toneMapped={false}
          // emissive={"hotpink"}
          // emissiveIntensity={2}
        />

        {/* <group ref={groupRef}>
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
        </group> */}
        <instancedBufferAttribute
          attach={"geometry-attributes-a_color"}
          args={[a_color, 3]}
          count={nodeArray.length - 2}
          usage={DynamicDrawUsage}
        />
      </Instances>
    </>
  );
};

const Marker = ({ marker, readLocationsArray }) => {
  const [hovered, set] = useState();
  useCursor(hovered);

  const instanceRef = useRef();

  // const [clicked, setClicked] = useState(false);

  // useEffect(() => {
  //   if (hovered) {
  //     console.log(instanceRef.current);
  //   }
  // }, [hovered]);

  useFrame(({ clock }) => {
    // dummy.position.set(Math.sin(id + clock.getElapsedTime()), Math.cos(id + clock.getElapsedTime()), 0);
    // dummy.updateMatrix();
    // if (isHovered) {
    //   color.set(1, 0, 0);  // red
    // } else {
    //   color.set(Math.random(), Math.random(), Math.random());
    // }
    // material.attributes.emissiveColor.array.set(color.toArray(), id * 3);
    // material.attributes.emissiveColor.needsUpdate = true;
    // console.log(instanceRef.current.material);
    if (hovered) {
      console.log(instanceRef.current);
    }
  });

  return (
    <Instance
      // ref={marker.ref}
      ref={instanceRef}
      name={marker[1].name}
      position={marker[1].position}
      rotation={marker[1].rotation}
      onPointerOver={(e) => {
        set(true);
        // console.log((instanceRef.current.color = new Color([10, 2, 1])));
        // instanceRef.current.material.color = new Color([10, 2, 1]);
        // console.log(instanceRef.current);
        // instanceRef.current.material.emissive.setHex(0xff0000);
      }}
      onPointerOut={(e) => {
        set(false);
        // !clicked && (e.eventObject.color = new Color([10, 2, 1]));
      }}
      onClick={(e) => {
        readLocationsArray.arr.forEach((location) => {
          if (marker[1].name == location.name) {
            location.ref.current?.scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
          }
        });
      }}
    />
  );
};
