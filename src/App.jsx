import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Bvh, Stars, StatsGl } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import Camera from "./components/canvas/Camera";
// import Earth from "./components/canvas/Earth_0719";
import Earth from "./components/canvas/Earth_0727";

import { LocationsHorizontal } from "./components/dom/LocationsHorizontal";
import Title from "./components/dom/Title";
import TitleMobile from "./components/dom/TitleMobile";
import Tickets from "./components/dom/Tickets";

import { useMediaQuery } from "@chakra-ui/media-query";
import classNames from "classnames";
import { useSnapshot } from "valtio";

import { markerHovered } from "./data/state";
// import { Perf } from "r3f-perf";

const Scene = () => (
  <>
    <Earth />
    <ambientLight intensity={0.2} />
    <Stars count={2000} depth={10} radius={20} fade={true} />
    <Camera />
    <EffectComposer disableNormalPass>
      <Bloom intensity={1} luminanceThreshold={1} />
      <Vignette offset={0.8} darkness={0.4} />
    </EffectComposer>
  </>
);

export default function App() {
  //
  const [isLargerThan768] = useMediaQuery("(min-width:  768px)");
  const readMarkerHovered = useSnapshot(markerHovered);

  return (
    <>
      <div className="grid h-full w-full grid-cols-12 grid-rows-16">
        {/************************************/}
        <div
          className={classNames(
            "col-span-full row-span-9 cursor-grab border-2 sm:col-span-9 sm:row-span-13",
            readMarkerHovered.state && "cursor-pointer"
          )}
        >
          <Canvas
            camera={{
              position: [0, 1, 30],
              fov: 90,
              zoom: 4,
            }}
            className="bg-slate-900/40"
          >
            <Bvh>
              <Scene />
            </Bvh>
            <color attach="background" args={["#00001a"]} />
          </Canvas>
        </div>
        {/************************************/}
        {isLargerThan768 ? <Title /> : <TitleMobile />}
        <Tickets />
        {/************************************/}
        <LocationsHorizontal />
        {/************************************/}
      </div>
    </>
  );
}
