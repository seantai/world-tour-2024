import { motion as m } from "framer-motion";
import classNames from "classnames";
import { currentName } from "../../data/state";
import { useSnapshot } from "valtio";
import { useState } from "react";

export default function Title() {
  return (
    <>
      <div
        className=" col-span-3
       row-span-7 flex select-none flex-col items-center justify-center space-y-8 border-2 border-l-0  from-transparent to-[#454e67] bg-grid-slate-700"
      >
        {/* <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className=""
        > */}
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className={classNames(
            "neonTextWorldTour font-angkor text-5xl text-[#12172c] sm:text-[60px]"
          )}
        >
          World
        </m.div>
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", delay: 0.5 }}
          className="neonTextWorldTour text-6xl font-bold text-[#0f0a1c] "
        >
          Tour
        </m.div>
        <m.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", delay: 2.2 }}
          className={classNames(
            "neonTextWorldTour font-angkor text-5xl text-[#12172c] sm:text-[60px]"
          )}
        >
          2023
        </m.div>
        {/* </m.div> */}
      </div>
    </>
  );
}
