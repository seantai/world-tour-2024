import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  createRef,
} from "react";
import { Color } from "three";
import { useCursor, Instances, Instance, useGLTF } from "@react-three/drei";
import { useSnapshot, ref } from "valtio";

import {
  locationsArray,
  markersArray,
  currentName,
  currentMarkerHover,
  currentPosition,
} from "../../data/state";

// export const Markers = () => {
//   const { nodes, materials } = useGLTF("/Earth_0719_2.glb");
//   const readLocationsArray = useSnapshot(locationsArray);
//   const readCurrentName = useSnapshot(currentName);
//   const readCurrentMarkerHover = useSnapshot(currentMarkerHover);

//   // console.log(nodes.Algeria.geometry);
//   // useEffect(() => {
//   //   readMarkersArray.arr &&
//   //     readMarkersArray.arr.forEach((marker, i) => {
//   //       marker.ref.current.color.set("dodgerblue");
//   //       if (readCurrentName.state == marker.name) {
//   //         marker.ref.current.color.set("#2DE99C");
//   //       }
//   //     });
//   // }, [readCurrentName.state]);

//   // const neonMarker = useTexture("./img/brave_nnacNbK3MN.png", (t) => {
//   //   t.flipY = false;
//   // });

//   // const [foo, setFoo] = useState();
//   // const markersRef = useRef();
//   // console.log(readMarkersArray.arr);

//   // useLayoutEffect(() => {
//   //   if (markersRef.current) {
//   //     markersRef.current.children.forEach((marker) => {
//   //       marker.material.toneMapped = false;
//   //       marker.material.color = new Color(8, 4, 2);
//   //     });
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   if (markersRef.current) {
//   //     markersRef.current.children.forEach((marker) => {
//   //       marker.addEventListener("onPointerOver", (event) => {
//   //         set(true);
//   //       });
//   //       // onPointerOver={(e) => {
//   //       //   set(true);
//   //       //   // console.log(e.eventObject.name);
//   //       //   // readMarkersArray.arr.forEach((marker) => {
//   //       //   //   if (marker.name == e.eventObject.name) {
//   //       //   //     setFoo(true);
//   //       //   //     currentMarkerHover.state = marker.name;
//   //       //   //   }
//   //       //   // });
//   //       // }}
//   //       // onPointerOut={() => set(false)}
//   //       // console.log((marker.material.toneMapped = false));
//   //       // marker.material.color = new Color(8, 4, 2);
//   //     });
//   //   }
//   // }, [readCurrentName.state]);

//   return (
//     <>
//       {/*<group dispose={null}>
//         <mesh
//           geometry={nodes.Algeria.geometry}
//           material={materials.Algeria}
//           position={[-0.88, 0.47, 0.01]}
//           rotation={[-0.74, 0.34, 1.28]}
//         />
//         <mesh
//           geometry={nodes.Algeria001.geometry}
//           material={materials["Algeria.001"]}
//           position={[-0.92, -0.02, 0.38]}
//           rotation={[-0.82, 0.28, 1.92]}
//         />
//         <mesh
//           geometry={nodes.Algeria002.geometry}
//           material={materials["Algeria.002"]}
//           position={[-0.49, 0.54, 0.67]}
//           rotation={[-1.16, 0.97, 2.02]}
//         />
//         <mesh
//           geometry={nodes.Algeria003.geometry}
//           material={materials["Algeria.003"]}
//           position={[0.34, 0.2, 0.9]}
//           rotation={[-2.48, 1.09, -2.33]}
//         />
//         <mesh
//           geometry={nodes.Algeria005.geometry}
//           material={materials["Algeria.005"]}
//           position={[0.86, 0.25, 0.39]}
//           rotation={[3.1, 0.45, -1.8]}
//         />
//         <mesh
//           geometry={nodes.Algeria006.geometry}
//           material={materials["Algeria.006"]}
//           position={[0.74, 0.65, -0.12]}
//           rotation={[2.9, 0.08, -2.31]}
//         />
//         <mesh
//           geometry={nodes.Algeria007.geometry}
//           material={materials["Algeria.007"]}
//           position={[0.45, 0.37, -0.8]}
//           rotation={[2.26, -0.48, -2.56]}
//         />
//         <mesh
//           geometry={nodes.Algeria008.geometry}
//           material={materials["Algeria.008"]}
//           position={[0.26, 0.68, -0.68]}
//           rotation={[2.44, -0.4, -2.87]}
//         />
//         <mesh
//           geometry={nodes.Algeria009.geometry}
//           material={materials["Algeria.009"]}
//           position={[-0.39, 0.13, -0.9]}
//           rotation={[1.58, -0.32, 2.68]}
//         />
//       </group>*/}
//       <Instances geometry={nodes.Algeria007.geometry}>
//         <meshStandardMaterial />
//         {readMarkersArray.arr &&
//           readMarkersArray.arr.map((marker, i) => {
//             console.log(marker);
//             return <Marker key={i} marker={marker} />;
//           })}
//       </Instances>
//     </>
//   );
// };

// const Marker = ({ marker, i }) => {
//   // const [hovered, set] = useState();
//   // useCursor(hovered);

//   // const readLocationsArray = useSnapshot(locationsArray);
//   // const readMarkersArray = useSnapshot(markersArray);
//   // const readCurrentName = useSnapshot(currentName);
//   // const readCurrentMarkerHover = useSnapshot(currentMarkerHover);

//   console.log(marker.position);
//   return (
//     <Instance
//       key={i}
//       // color={"dodgerblue"}
//       name={marker.name}
//       ref={marker.ref}
//       position={marker.position}
//       rotation={marker.rotation}
//       // onPointerOver={(e) => {
//       //   set(true);
//       // }}
//       // onPointerOut={() => set(false)}
//       // onClick={(e) => {
//       //   readLocationsArray.arr.forEach((location) => {
//       //     if (marker.name == location.name) {
//       //       e.eventObject.color = new Color("#2DE99C");
//       //       location.ref.current?.scrollIntoView({
//       //         behavior: "smooth",
//       //         inline: "center",
//       //       });
//       //     }
//       //   });
//       // }}
//     />
//   );
// };

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

  useEffect(() => {
    readMarkersArray.arr &&
      readMarkersArray.arr.forEach((marker, i) => {
        // marker.ref.current.color.set("dodgerblue");
        if (readCurrentName.state == marker.name) {
          // marker.ref.current.color.set("#2DE99C");
          console.log(marker.ref.current.color.set("#2DE99C"));
        }
      });
  }, [readCurrentName.state]);

  const groupRef = useRef();

  // useEffect(() => {
  //   if (groupRef.current) {
  //     groupRef.current.children.forEach((marker) => {
  //       if (marker.name == "Jamaica") {
  //         // marker.color.emissiveIntensity = 0.19;
  //         // marker.color = new Color([10, 7, 1]);
  //         // console.log(());
  //         // marker.color.emissiveIntensity = 0;
  //         // console.log((marker.instanceColor = new Color([10, 7, 1])));
  //         // marker.color = new Color("#beffd1");
  //         // marker.emissive = new Color([4, 2.5, 1]);
  //         // marker.emissiveIntensity = 4;
  //       }
  //     });
  //   }
  // }, []);

  return (
    <>
      <Instances geometry={nodes.Korea.geometry}>
        <meshStandardMaterial
          emissiveIntensity={0.2}
          // emissive={[4, 4, 2]}
          // color={"hotpink"}
          // color={0x10102}
          emissive={[4, 4.5, 1]}
          toneMapped={false}
        />
        <group ref={groupRef}>
          {readMarkersArray.arr &&
            readMarkersArray.arr.map((marker, i) => {
              if (["Earth", "Scene"].includes(marker.name)) return;
              return (
                <Marker
                  key={i}
                  marker={marker}
                  readLocationsArray={readLocationsArray}
                  // ref={marker.ref}
                />
              );
            })}
        </group>
      </Instances>
    </>
  );
};

const Marker = ({ marker, readLocationsArray }) => {
  // console.log(marker);
  const [hovered, set] = useState();
  useCursor(hovered);

  const [clicked, setClicked] = useState(false);
  return (
    <Instance
      ref={marker.ref}
      name={marker.name}
      position={marker.position}
      rotation={marker.rotation}
      onPointerOver={(e) => {
        set(true);
        e.eventObject.color = new Color("#dcb982");
        // !clicked && (e.eventObject.color = new Color("#dcb982"));
      }}
      onPointerOut={(e) => {
        set(false);
        // !clicked && (e.eventObject.color = new Color([10, 2, 1]));
      }}
      onClick={(e) => {
        setClicked(true);
        readLocationsArray.arr.forEach((location) => {
          if (marker[1].name == location.name) {
            // console.log((e.eventObject.emissiveIntensity = 4));
            // console.log((e.eventObject.emissive = new Color([5, 7.4, 1])));
            // console.log(e.eventObject.color);
            // marker.emissiveIntensity = 2;
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
