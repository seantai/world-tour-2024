import "./App.css";
import React, { useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Stars, Effects } from "@react-three/drei";
import { motion as m } from "framer-motion";
import { Perf } from "r3f-perf";

import Earth from "./components/canvas/Earth_0715";
import { Locations } from "./components/dom/Locations";
import Tickets from "./components/dom/Tickets";
// import { LocationsMobile } from "./components/LocationsMobile";
import Camera from "./components/canvas/Camera";
import BackdropWords from "./components/dom/BackdropWords";

import { UnrealBloomPass } from "three-stdlib";
extend({ UnrealBloomPass });

import {
  EffectComposer,
  N8AO,
  TiltShift2,
  Bloom,
  // UnrealBloomPass,
} from "@react-three/postprocessing";
// import { UnrealBloomPass } from "three-stdlib";
// extend({ UnrealBloomPass });

const Scene = () => (
  <>
    <Earth />
    <ambientLight />
    <Stars count={2000} depth={5} radius={4} fade={true} />
    <Camera />
    {/* <Perf /> */}
  </>
);

// const
export default function App() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger duration in seconds
        duration: 2,
      },
    },
  };

  return (
    <>
      {/************************************/}
      {/* <Locations /> */}
      {/************************************/}
      <m.div
        // variants={container}
        // initial="hidden"
        // animate="show"
        className="border-t-3 absolute left-0 top-0 h-[75%] w-full border-2 border-x-0 bg-gradient-to-b from-slate-900/80 via-30%"
        // className="border-t-3 absolute left-0 top-0 h-[75%] w-full border-2 border-x-0 bg-gradient-to-b from-slate-900/80 via-30%"
      >
        {/* <BackdropWords /> */}
        <Canvas
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
      <Tickets />
      {/************************************/}
    </>
  );
}
