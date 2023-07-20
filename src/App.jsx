import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Bvh, Environment, Stars } from "@react-three/drei";
import { motion as m } from "framer-motion";
import { Perf } from "r3f-perf";

import Earth from "./components/canvas/Earth_0719";
import { LocationsHorizontal } from "./components/dom/LocationsHorizontal";
import Camera from "./components/canvas/Camera";
import WorldTourWords from "./components/dom/WorldTourWords";
// import BackdropWords from "./components/dom/BackdropWords";
// import Tickets from "./components/dom/Tickets";

import { useMediaQuery } from "@chakra-ui/media-query";

import {
  EffectComposer,
  Bloom,
  Vignette,
  TiltShift2,
} from "@react-three/postprocessing";

const Scene = () => (
  <>
    <Earth />
    <ambientLight intensity={0.2} />
    <Stars count={2000} depth={10} radius={20} fade={true} />
    <Camera />
    {/* <Perf /> */}
    <EffectComposer disableNormalPass>
      <Bloom mipmapBlur intensity={1} luminanceThreshold={1} />
      <Vignette offset={0.8} darkness={0.4} />
    </EffectComposer>
  </>
);

export default function App() {
  const [isLargerThan768] = useMediaQuery("(min-width:  768px)");

  return (
    <>
      {/************************************/}

      {isLargerThan768 && <WorldTourWords />}
      {/************************************/}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-0 top-0 h-4/5 w-full border-2 sm:w-[75%] "
      >
        <Canvas
          camera={{
            position: [0, 1, 3],
            fov: 90,
            zoom: 4,
          }}
        >
          <Bvh>
            <Scene />
          </Bvh>
        </Canvas>
      </m.div>
      {/************************************/}
      <LocationsHorizontal />
      {/* {<Tickets />} */}
      {/* {isLargerThan768 && <Tickets />} */}
      {/************************************/}
    </>
  );
}
