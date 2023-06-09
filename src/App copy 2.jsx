import "./App.css";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Earth from "./components/Earth1";
import { Locations } from "./components/Locations";

const Scene = () => {
  return (
    <>
      <Earth />
      <ambientLight />
    </>
  );
};

export default function App() {
  const parentRef = useRef();

  return (
    <>
      <Locations />
      <div className="fixed m-0 h-full w-full overflow-hidden p-0">
        <Canvas
          // eventSource={parentRef}
          // eventPrefix="client"
          // className="pointer-events-none fixed"
          camera={{ position: [0, 0, 0.01] }}
        >
          <Scene />
        </Canvas>
      </div>
      {/* <div className="relative m-0 h-full w-full p-0" ref={parentRef}>
        <Canvas
          eventSource={parentRef}
          eventPrefix="client"
          className="pointer-events-none fixed"
          camera={{ position: [0, 0, 0.01] }}
        >
          <Scene />
        </Canvas>
        /~ <div className=" absolute inset-6 z-50 border-4 border-[#fe7f2d]" /> ~/
      </div>*/}
    </>
  );
}
