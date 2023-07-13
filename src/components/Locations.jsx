import classNames from "classnames";
import { useInView, motion as m } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { locationData } from "../data/locations";
import { state } from "../data/state";

export const Locations = () => {
  return (
    <>
      <div className="absolute bottom-0 right-0 top-0 z-40 mt-[0vh] flex h-full w-1/3 justify-end">
        {/* <img src="./img/misfits11.png" width={200} height={"auto"} /> */}
        {/************************************/}
        <div className="flex w-full snap-y scroll-mr-6 flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth py-[50vh] backdrop-blur-md scrollbar scrollbar-track-slate-300/60 scrollbar-thumb-slate-800">
          {locationData.map((location) => (
            <Location
              id={location.id}
              coords={location.coords}
              className="font-sans"
              key={location.id}
            >
              {location.title}
            </Location>
          ))}
        </div>
        {/************************************/}
      </div>
    </>
  );
};

const Location = ({ children, id, coords, ...props }) => {
  const [hover, setHover] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const locationRef = useRef();
  const isInView = useInView(locationRef, {
    margin: "-50% 0px -50% 0px",
    // amount: "all",
  });

  useEffect(() => {
    if (!isInView) return;
    console.log("hi");
    state.currentView = coords;
  }, [isInView]);

  return (
    <p
      {...props}
      ref={locationRef}
      // layoutId="alksdffsad"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 1.6 }}
      className={classNames(
        "w-full cursor-pointer border-2 border-slate-50 border-opacity-0 p-2 py-4 text-5xl text-gray-50/80",
        hover && "text-slate-50",
        pointerDown && "border-dashed border-opacity-100 text-slate-400",
        isInView && "border-opacity-100  bg-[#2c5f77] text-slate-50"
      )}
      onClick={() => {
        state.currentView = coords;
        locationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }}
      onPointerEnter={() => {
        setHover(true);
      }}
      onPointerLeave={() => {
        setHover(false);
      }}
      onPointerDown={() => {
        setPointerDown(true);
      }}
      onPointerUp={() => {
        setPointerDown(false);
      }}
    >
      {children}
    </p>
  );
};
