import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Bvh, Stars, StatsGl } from "@react-three/drei";
import { motion as m } from "framer-motion";
import { Perf } from "r3f-perf";

import Earth from "./components/canvas/Earth_0719";
import { LocationsHorizontal } from "./components/dom/LocationsHorizontal";
import Camera from "./components/canvas/Camera";
import Sidebar from "./components/dom/Sidebar";
import SidebarMobile from "./components/dom/SidebarMobile";

import { useMediaQuery } from "@chakra-ui/media-query";

import {
  EffectComposer,
  Bloom,
  Vignette,
  TiltShift2,
} from "@react-three/postprocessing";
import { useState } from "react";
import classNames from "classnames";
import { useSnapshot } from "valtio";

import { markerHovered } from "./data/state";

const Scene = () => (
  <>
    <Earth />
    <ambientLight intensity={0.2} />
    <Stars count={2000} depth={10} radius={20} fade={true} />
    <Camera />
    {/* <Perf />
    <StatsGl /> */}
    <EffectComposer disableNormalPass>
      <Bloom intensity={1} luminanceThreshold={1} />
      <Vignette offset={0.8} darkness={0.4} />
    </EffectComposer>
  </>
);

export default function App() {
  //
  const [isLargerThan768] = useMediaQuery("(min-width:  768px)");

  const [hovered, set] = useState();

  const readMarkerHovered = useSnapshot(markerHovered);

  return (
    <>
      {/************************************/}
      {isLargerThan768 ? <Sidebar /> : <SidebarMobile />}
      {/************************************/}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={classNames(
          "absolute left-0 top-0 h-3/5 w-full border-2 sm:w-[75%]",
          hovered && !readMarkerHovered.state && "cursor-grab"
        )}
      >
        <Canvas
          camera={{
            position: [0, 1, 3],
            fov: 90,
            zoom: 4,
          }}
          onPointerMove={(e) => {
            set(true);
          }}
        >
          <Bvh>
            <Scene />
          </Bvh>
        </Canvas>
      </m.div>
      {/************************************/}
      <LocationsHorizontal />
      {/************************************/}
    </>
  );
}
