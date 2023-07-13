import "./App.css";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Locations } from "./components/Locations";
import { LocationsMobile } from "./components/LocationsMobile";
import { Stars, Text, Billboard, Center } from "@react-three/drei";
import Earth from "./components/Earth_0711";
import { Perf } from "r3f-perf";
import { suspend } from "suspend-react";
import { motion as m } from "framer-motion";
import classNames from "classnames";
import { useSnapshot } from "valtio";
import { currentViewName } from "./data/state";

// const inter = import("@pmndrs/assets/fonts/inter_regular.woff");
const inter = import("@pmndrs/assets/fonts/inter_regular.woff");

const Scene = () => (
  <>
    <Earth />
    <ambientLight />
    <Stars count={3000} depth={5} radius={4} fade={true} />

    {/* <Billboard lockX={false} lockY={false} lockZ={false}>
      <Center position={[0, 0.9, 0]} top left>
        <Text
          fontSize={0.7}
          letterSpacing={-0.025}
          font={suspend(inter).default}
          color="black"
          // {...props}
        >
          {"WORLD"}
        </Text>
        /~ <Text
          fontSize={1}
          letterSpacing={-0.025}
          font={suspend(inter).default}
          color="black"
          // {...props}
        >
          {"TOUR"}
        </Text> ~/
      </Center>
    </Billboard>*/}
    {/* <Perf /> */}
  </>
);

// const
export default function App() {
  const snapCurrentView = useSnapshot(currentViewName);
  return (
    <>
      {/************************************/}
      {/* <div className="pointer-events-none fixed inset-0 z-50 h-full w-full border-y-4" /> */}
      <m.div
        initial={{ blur: "12px" }}
        animate={{ blur: "0px" }}
        // transition={{ duration: 3, type: "spring" }}
        className="blur-[0px] filter"
      />
      <div className="inset-0 left-0 top-0 z-0 h-[75%]">
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className={classNames(
            "-mb-36 ml-20 font-angkor text-[175px] text-slate-950"
            // `blur-${blurMotionValue}px`
          )}
        >
          World
        </m.div>
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", delay: 0.5 }}
          className="m-6 text-[200px] text-slate-950/70"
        >
          Tour
        </m.div>
      </div>
      {/************************************/}
      {/* <div className="absolute bottom-0 left-24 z-[60] w-full">
        <div className="grid grid-cols-6 grid-rows-6">
          /~ <div className="col-span-3">Purchase your</div> ~/
          <div className="col-span-3 text-8xl">Get your</div>
        </div>
      </div>*/}
      <div className="m-10 flex">
        <div className="flex h-[25%] w-2/3 flex-col text-2xl">
          {/* <div className=""></div> */}
          <div className="">{`Get your ${snapCurrentView.state}`}</div>
          <div>concert tickets</div>

          <button className="max-w-sm rounded-full border-opacity-30 bg-gradient-radial px-4 py-2 font-angkor outline hover:text-lg">
            here
          </button>
          <div className="-inset-full top-0 z-[60] block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 hover:animate-shine hover:bg-auto" />
        </div>
        {/* <div className="flex h-[25%] w-2/3 flex-col items-start text-3xl">
          <div> .</div>
          <div> .</div>
          <button className="rounded-full bg-transparent px-4 py-2 outline">
            here
          </button>
          <div> .</div>
        </div> */}
      </div>

      {/************************************/}

      {/************************************/}
      {/************************************/}

      <m.div className="absolute inset-0 h-[75%] w-full border-2">
        <Canvas
          // orthographic
          camera={{
            position: [0, 1, 4],
            fov: 90,
            zoom: 3,
          }}
          // className="z-20"
        >
          <Scene />
        </Canvas>
      </m.div>
      {/************************************/}
      {/* <LocationsMobile /> */}
      <Locations />
      {/* </m.div> */}
      {/************************************/}
    </>
  );
}
