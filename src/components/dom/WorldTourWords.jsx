import { motion as m } from "framer-motion";
import classNames from "classnames";

export default function WorldTourWords() {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute
      right-0 top-0 z-0 flex h-4/5 flex-col items-center   border-2 border-l-0 from-transparent to-[#454e67] bg-grid-slate-700  sm:w-[25%]"
      >
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className={classNames(
            "neonTextWorldTour pt-12 font-angkor text-5xl text-[#12172c] sm:text-[60px]"
            // `blur-${blurMotionValue}px`
          )}
        >
          World
        </m.div>
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", delay: 0.5 }}
          className="neonTextWorldTour pt-12 text-3xl font-bold text-[#0f0a1c] sm:text-[60px]"
        >
          Tour
        </m.div>
      </m.div>
    </>
  );
}
