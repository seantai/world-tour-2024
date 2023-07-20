import classNames from "classnames";
import { useInView, motion as m } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { locationData } from "../data/locations";
import { state, currentViewName, fooState } from "../data/state";
import { useSnapshot } from "valtio";

export const Locations = () => {
  return (
    <>
      <div className="absolute bottom-0 right-0 top-0 z-[70] mt-[0vh] flex h-full w-1/3">
        {/* <img src="./img/misfits11.png" width={200} height={"auto"} /> */}
        {/************************************/}
        <div className="flex w-full snap-y flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth py-[50vh] scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800">
          {locationData.map((location) => (
            <Location
              id={location.id}
              coords={location.coords}
              name={location.name}
              // className="font-angkor"
              key={location.id}
            >
              {location.name}
            </Location>
          ))}
        </div>
        {/************************************/}
      </div>
    </>
  );
};

const Location = ({ children, id, coords, name, ...props }) => {
  // const snapCurrentView = useSnapshot(currentViewName);
  const [hover, setHover] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const { locationRef } = useSnapshot(fooState);

  // const locationRef = useRef();
  const isInView = useInView(locationRef, {
    margin: "-50% 0px -50% 0px",
    amount: "all",
  });

  useEffect(() => {
    if (!isInView) return;
    state.currentView = coords;
    currentViewName.state = name;
    // animate(locationRef.current, { opacity: 1 });
    // get ref of oh I have it here
    console.log(locationRef);
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
        "w-full cursor-pointer border-y-2  border-slate-50 border-opacity-0 p-2 py-4 pr-16 text-right font-sans text-5xl font-light text-gray-50/80 ",
        hover && "text-slate-50",
        pointerDown && "border-dashed border-opacity-100 text-slate-400",
        isInView && "border-opacity-100 bg-gradient-linear text-slate-50"
      )}
      onClick={() => {
        state.currentView = coords;
        locationRef.current?.scrollIntoView({
          behavior: "smooth",
          // block: "center",
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
