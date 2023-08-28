import { motion as m } from "framer-motion";
import classNames from "classnames";
import { spin } from "../../data/state";

export default function Title() {
  const textShadowVariant = {
    initial: {
      textShadow:
        "0 0 2px #fff, 0 0 6px #accfd6, 0 0 12px #7fb8c9, 0 0 15px #96b8c9, 0px 0px 0px #fff",
    },
    animate: {
      textShadow:
        "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 15px #96b8c9, 1px -2px 50px #fff",
    },
  };

  return (
    <>
      <div
        className="col-start-1 col-end-13 row-start-1 row-end-3
        -mb-2 flex h-full cursor-pointer items-center justify-center space-x-5 border-2 border-x-0 border-b-0 bg-grid-slate-700 sm:col-start-10 sm:col-end-13 sm:row-start-1 sm:row-end-8 sm:flex-col sm:space-x-0 sm:space-y-4 sm:border-x-2"
        onClick={() => {
          spin.state = Math.random();
        }}
      >
        <m.div
          variants={textShadowVariant}
          initial="initial"
          animate="animate"
          className={classNames(
            "neonTextWorldTour font-angkor text-3xl text-[#12172c] sm:text-[2.3rem] md:text-[3rem] lg:text-[60px]"
          )}
          transition={{
            ease: "easeInOut",
            repeatType: "reverse",
            duration: 7,
            delay: 2,
            repeat: Infinity,
          }}
        >
          World
        </m.div>
        <m.div className="neonTextWorldTour font-angkor text-3xl text-[#0f0a1c] sm:font-sans sm:text-6xl sm:font-bold">
          Tour
        </m.div>
        <m.div
          variants={textShadowVariant}
          initial="initial"
          animate="animate"
          className={classNames(
            "neonTextWorldTour font-angkor text-3xl text-[#12172c] sm:text-5xl"
          )}
          transition={{
            ease: "easeInOut",
            repeatType: "reverse",
            duration: 7,
            delay: 0,
            repeat: Infinity,
          }}
        >
          2024
        </m.div>
      </div>
    </>
  );
}
