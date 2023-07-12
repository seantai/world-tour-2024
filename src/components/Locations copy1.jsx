import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { locationData } from "../data/locations";
import { state } from "../data/state";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";

const Location = ({ children, id, coords }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
  });

  const snap = useSnapshot(state);

  useEffect(() => {
    if (!isInView) return;
    state.view = coords;
  }, [isInView]);

  return (
    <motion.p
      // layoutId="alksdffsad"
      ref={ref}
      // initial={{ opacity: 1 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      className={classNames(
        "cursor-pointer border-2 py-4 text-3xl backdrop-blur-lg",
        isInView
          ? "border-2 bg-[#2c5f77] text-gray-100"
          : "border-transparent text-gray-400"
        // snap.clickedLocation == id ? "border-red-400" : "border-transparent"
      )}
      onClick={() => {
        state.view = coords;
        state.clickedLocation = id;
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
    >
      {children}
    </motion.p>
  );
};

export const Locations = () => {
  return (
    <>
      <div className="fixed left-0 top-0 z-40 m-0 w-1/3 bg-transparent p-0">
        <div className="flex">
          <div className="w-full ">
            <ul>
              {locationData.map((location) => (
                <li key={location.id}>
                  <Location id={location.id} coords={location.coords}>
                    {location.title}
                  </Location>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
