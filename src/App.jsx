import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Bvh, Stars, StatsGl } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import Camera from "./components/canvas/Camera";
import Earth from "./components/canvas/Earth_0727";

import { LocationsHorizontal } from "./components/dom/LocationsHorizontal";
import { LocationsHorizontalNew } from "./components/dom/LocationsHorizontalNew";
import { LocationsVerticalNew } from "./components/dom/LocationsVerticalNew";
import Title from "./components/dom/Title";
import TitleNew from "./components/dom/TitleNew";
import Tickets from "./components/dom/Tickets";
import TicketsNew from "./components/dom/TicketsNew";

import classNames from "classnames";
import { useSnapshot } from "valtio";

import { markerHovered } from "./data/state";
import { Perf } from "r3f-perf";
import { motion as m } from "framer-motion";
import { useMediaQuery } from "@chakra-ui/media-query";
import { ReactLenis } from "@studio-freight/react-lenis";

const Scene = () => (
  <>
    <Earth />
    <ambientLight intensity={0.2} />
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
  const readMarkerHovered = useSnapshot(markerHovered);
  const [isLargerThan1200] = useMediaQuery("(min-width: 1000px)");

  return (
    // <ReactLenis root>
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
          // readMarkerHovered.state && "cursor-pointer"
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
          {/* <color attach="background" args={["#00001a"]} /> */}
        </Canvas>
      </div>
      {/************************************/}
      {!isLargerThan1200 && (
        <>
          <Title />
          {/************************************/}
          <Tickets />
          {/************************************/}
          {/* <div className=""> */}
          <LocationsHorizontalNew />
          {/* </div> */}
        </>
      )}

      {/************************************/}
      {isLargerThan1200 && (
        <>
          {/* <ReactLenis> */}
          <TitleNew />

          <LocationsVerticalNew top={true} />
          <TicketsNew />

          {/* </ReactLenis> */}
        </>
      )}
      {/************************************/}

      {/************************************/}
    </m.div>
    // </ReactLenis>
  );
}
