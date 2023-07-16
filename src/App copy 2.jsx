import "./App.css";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion as m } from "framer-motion";
import { Perf } from "r3f-perf";

import Earth from "./components/canvas/Earth_0715";
import { Locations } from "./components/dom/Locations";
import Tickets from "./components/dom/Tickets";
// import { LocationsMobile } from "./components/LocationsMobile";
import Camera from "./components/canvas/Camera";
import BackdropWords from "./components/dom/BackdropWords";

const Scene = () => (
  <>
    <Earth />
    <ambientLight />
    <Stars count={3000} depth={5} radius={4} fade={true} />
    <Camera />
  </>
);

// const
export default function App() {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      {/************************************/}
      {/* <div className="pointer-events-none fixed inset-0 z-50 h-full w-full border-y-4" /> */}
      {/* <m.div
        initial={{ filter: "blur(100px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 3, type: "spring" }}
        className="fixed inset-0 z-[70] h-full w-full"
      /> */}
      {/* {!clicked && (
        <div className="inset-0 left-0 top-0 z-[80] h-full items-center justify-center">
          <div
            className="w-auto cursor-pointer border bg-transparent text-7xl"
            onClick={() => {
              setClicked(true);
            }}
          >
            CLACK ME
          </div>
        </div>
      )} */}
      <m.div
        initial={{ filter: "blur(24px)" }}
        // animate={{ clicked ? "filter: blur(0px)" : "filter:blur(12px)"}}
        animate={clicked ? { filter: "blur(0px)" } : { filter: "blur(0px)" }}
        transition={{ duration: 2 }}
        // transition={{ duration: 2, type: "spring" }}
        className="inset-0 left-0 top-0 z-[70] h-full w-full"
      >
        {/************************************/}
        {/* <BackdropWords /> */}
        {/************************************/}
        {/* <Tickets /> */}
        {/************************************/}

        <m.div
          // initial={{ filter: "blur(12px)" }}
          // animate={{ filter: "blur(12px)" }}
          // transition={{ duration: 4, type: "spring" }}
          className="absolute inset-0 h-[75%] w-full border-2 "
        >
          <Canvas
            // orthographic
            camera={{
              position: [0, 1, 4],
              fov: 90,
              zoom: 4,
            }}
          >
            <Scene />
          </Canvas>
        </m.div>
        {/************************************/}
        {/* <LocationsMobile /> */}
        <Locations />
        {/************************************/}
      </m.div>
    </>
  );
}
