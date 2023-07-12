import "./App.css";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Earth from "./components/Earth";
import { Locations } from "./components/Locations";
import { OrbitControls, Stars } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Foo } from "./components/Foo";

const Scene = () => {
  return (
    <>
      <Earth />
      <ambientLight />
      <Stars depth={14} radius={1} fade={true} />
      <OrbitControls />
      {/* <Perf /> */}
    </>
  );
};

export default function App() {
  const ref = useRef();
  return (
    <>
      {/* <Locations /> */}
      {/* <div className="/~z-10 ~/ relative inset-0 h-full w-full overflow-hidden">
        <Canvas camera={{ position: [0, 2, 1], fov: 70 }}>
          <Scene />
        </Canvas>
      </div>
      <Locations />*/}
      <div
        ref={ref}
        style={{
          position: "relative",
          width: " 100%",
          height: "100%",
          overflow: "auto",
          touchAction: "auto",
        }}
        // className="fixed inset-0 z-50 flex items-start justify-center"
      >
        {/* <Foo /> */}
        <Locations />

        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
          }}
          eventSource={ref}
          eventPrefix="client"
          camera={{ position: [0, 2, 1], fov: 70 }}
        >
          <Scene />
        </Canvas>
      </div>
    </>
  );
}
