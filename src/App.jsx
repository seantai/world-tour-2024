import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Bvh, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import classNames from "classnames";
import { motion as m } from "framer-motion";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Toaster } from "./components/dom/Toaster";

import Camera from "./components/canvas/Camera";
import Earth from "./components/canvas/Earth";

import { LocationsHorizontal } from "./components/dom/LocationsHorizontal";
import { LocationsVertical } from "./components/dom/LocationsVertical";
import Title from "./components/dom/Title";
import TitleLarge from "./components/dom/TitleLarge";
import Tickets from "./components/dom/Tickets";
import TicketsLarge from "./components/dom/TicketsLarge";

const Scene = () => (
  <>
    <Earth />
    <Stars count={2000} depth={10} radius={20} fade={true} />
    <Camera />
    {/* <Perf /> */}
    {/* <StatsGl /> */}
    <EffectComposer disableNormalPass>
      <Bloom intensity={1} luminanceThreshold={1} />
      <Vignette offset={0.8} darkness={0.4} />
    </EffectComposer>
  </>
);

export default function App() {
  //
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  return (
    <m.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, type: "spring" }}
      className="grid h-full grid-cols-12 grid-rows-16 xl:text-clip"
    >
      {/************************************/}
      <div
        className={classNames(
          "col-start-1 col-end-13 row-start-3 row-end-12 cursor-grab border-2 border-t-2 sm:col-start-1 sm:col-end-10 sm:row-start-1 sm:row-end-14 md:border-r-0"
        )}
      >
        <Canvas
          camera={{
            position: [0, 1, 30],
            fov: 90,
            zoom: 4,
            near: 0.001,
          }}
          className="bg-slate-900"
        >
          <Bvh>
            <Scene />
          </Bvh>
        </Canvas>
      </div>
      {/************************************/}
      {!isLargerThan1024 && (
        <>
          <Title />
          <Tickets />
          <LocationsHorizontal />
        </>
      )}
      {/************************************/}
      {isLargerThan1024 && (
        <>
          <TitleLarge />
          <LocationsVertical />
          <TicketsLarge />
        </>
      )}
      {/************************************/}
      <Toaster />
      {/************************************/}
    </m.div>
  );
}
