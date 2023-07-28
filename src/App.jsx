import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Bvh, Stars, StatsGl } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

import Camera from "./components/canvas/Camera";
import Earth from "./components/canvas/Earth_0727";

import { LocationsHorizontal } from "./components/dom/LocationsHorizontal";
import Title from "./components/dom/Title";
import Tickets from "./components/dom/Tickets";

import classNames from "classnames";
import { useSnapshot } from "valtio";

import { markerHovered } from "./data/state";
import { Perf } from "r3f-perf";
import { motion as m } from "framer-motion";

const Scene = () => (
  <>
    <Earth />
    <ambientLight intensity={0.2} />
    <Stars count={2000} depth={10} radius={20} fade={true} />
    <Camera />
    {/* <Perf /> */}
    <EffectComposer disableNormalPass>
      <Bloom intensity={1} luminanceThreshold={1} />
      <Vignette offset={0.8} darkness={0.4} />
    </EffectComposer>
  </>
);

export default function App() {
  //
  const readMarkerHovered = useSnapshot(markerHovered);

  return (
    <>
      <m.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="grid h-full w-full grid-cols-12 grid-rows-16"
      >
        {/************************************/}
        <div
          className={classNames(
            "col-start-1 col-end-13 row-start-3 row-end-12 cursor-grab border-2 border-t-0 sm:col-start-1 sm:col-end-10 sm:row-start-1 sm:row-end-14 sm:border-t-2",
            readMarkerHovered.state && "cursor-pointer"
          )}
        >
          <Canvas
            camera={{
              position: [0, 1, 30],
              fov: 90,
              zoom: 4,
              near: 0.001,
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
        <Title />
        {/************************************/}
        <Tickets />
        {/************************************/}
        <LocationsHorizontal />
        {/* <HorizontalScroll /> */}
        {/* <CountriesSlider /> */}
        {/* <Carousel /> */}
        {/************************************/}
      </m.div>
    </>
  );
}

const countries = ["France", "Italy", "Spain", "Germany", "Sweden"];

function Carousel() {
  return (
    <div className="col-span-full row-span-4 flex snap-x snap-mandatory overflow-x-scroll sm:row-span-4">
      {countries.map((country) => (
        <motion.div
          key={country}
          drag="x"
          dragConstraints={{ right: 0, left: -300 }}
          transition={{ duration: 0.5 }}
          whileTap={{ cursor: "grabbing" }}
        >
          <div className="flex w-64 shrink-0 items-center justify-center bg-gray-300 text-lg">
            {country}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

import { motion } from "framer-motion";

function CountriesSlider() {
  const countries = ["USA", "Canada", "Mexico", "Brazil", "Argentina"];

  return (
    <div className="relative">
      <motion.div
        className=" col-span-full row-span-4 flex space-x-2 sm:row-span-4"
        initial={{ x: 0 }}
        animate={{ x: -100 }}
        transition={{ duration: 0.5 }}
      >
        {countries.map((country, i) => (
          <div key={i} className="text-2xl font-bold">
            {country}
          </div>
        ))}
      </motion.div>

      <button className="absolute left-2 top-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button className="absolute right-2 top-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

// const HorizontalScroll = () => {
//   const motionStyles = {
//     display: "flex",
//   };
//   const countries = [
//     "USA",
//     "Canada",
//     "Mexico",
//     "France",
//     "Germany",
//     "China",
//     "Australia",
//   ];

//   return (
//     <m.div
//       className="no-scrollbar col-span-full row-span-4 overflow-x-scroll sm:row-span-4"
//       style={motionStyles}
//       drag="x"
//     >
//       {countries.map((country, ind) => (
//         <m.div
//           key={ind}
//           className="m-2 rounded-md border border-gray-300 bg-white p-4"
//         >
//           {country}
//         </m.div>
//       ))}
//     </m.div>
//   );
// };
