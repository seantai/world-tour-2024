import "./App.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Locations } from "./components/Locations";
import { LocationsMobile } from "./components/LocationsMobile";
import { Stars } from "@react-three/drei";
import Earth from "./components/Earth_0711";
import { Perf } from "r3f-perf";

const Scene = () => (
  <>
    <Earth />
    <ambientLight />
    <Stars count={3000} depth={5} radius={4} fade={true} />
    {/* <Perf /> */}
  </>
);

export default function App() {
  return (
    <>
      {/************************************/}
      {/* <div className="pointer-events-none fixed inset-0 z-50 h-full w-full border-y-4" /> */}
      {/************************************/}
      <div className="fixed inset-0 h-full w-full">
        <Canvas
          // orthographic
          camera={{
            position: [0, 1, 4],
            fov: 90,
            zoom: 3,
          }}
          className="z-10"
        >
          <Scene />
        </Canvas>
      </div>
      {/************************************/}
      {/* <LocationsMobile /> */}
      <Locations />
      {/************************************/}
    </>
  );
}
