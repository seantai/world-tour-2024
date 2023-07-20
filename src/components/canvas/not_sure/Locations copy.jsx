import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { locationData } from "../data/locations";
import { state } from "../data/state";
// import { useSnapshot } from "valtio";
import { motion } from "framer-motion";

const Location = ({ children, id, coords }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
  });

  const [hover, setHover] = useState(false);
  // const snap = useSnapshot(state);

  useEffect(() => {
    if (!isInView) return;
    state.view = coords;
  }, [isInView]);

  return (
    <motion.p
      // layoutId="alksdffsad"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
      className={classNames(
        "z-40 cursor-pointer border-2 bg-opacity-50 py-4 text-7xl",
        isInView
          ? "border-2 bg-[#2c5f77] text-gray-100"
          : "border-transparent text-gray-400",
        hover && "border-2 bg-[#2c5f77] text-gray-100"
        // snap.clickedLocation == id ? "border-red-400" : "border-transparent"
      )}
      onClick={() => {
        state.view = coords;
        state.clickedLocation = id;
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {children}
    </motion.p>
  );
};

export const Locations = () => {
  return (
    <>
      {/* <div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{
        //   duration: 1,
        //   ease: "easeInOut",
        // }}
        // className="container mx-auto flex h-[88%] w-full flex-col overflow-hidden rounded-b-xl pb-1 text-2xl  shadow-xl backdrop-blur-xl sm:mt-4 sm:rounded-xl sm:border-2 sm:border-slate-900/80 sm:text-3xl"
        className="fixed left-0 top-0 z-20 flex h-full w-full items-center
        justify-center"
      >
         */}
      <div className="absolute top-0 z-20 w-full overflow-y-auto overflow-x-hidden blur-[.6px]  ">
        <div className="right-20 flex flex-col items-end justify-center">
          <div className="absolute mx-auto">
            <img src="./img/misfits.png" />
          </div>
          <div className="w-auto bg-[#3b5278d4] pb-[30vh] ">
            <ul>
              {locationData.map((location) => (
                <li key={location.id} className="font-sans">
                  <Location id={location.id} coords={location.coords}>
                    {location.title}
                  </Location>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="h-1/2" /> */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
