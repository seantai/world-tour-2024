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
  return (
    <>
      <Locations />
      <div className="fixed m-0 h-full w-full overflow-hidden p-0">
        <Canvas camera={{ position: [0, 0, 0.01] }}>
          <Scene />
        </Canvas>
      </div>
    </>
  );
}
