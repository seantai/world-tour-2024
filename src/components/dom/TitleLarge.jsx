import { motion as m } from "framer-motion";
import classNames from "classnames";
import { spin } from "../../data/state";

export default function TitleLarge() {
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
        className={classNames(
          "border-b-1 z-40 col-end-13 row-start-1 row-end-6 flex cursor-pointer flex-col items-center justify-evenly overflow-hidden border-2 border-b-slate-50/20 bg-gradient-to-r from-transparent from-45% to-[#2c7db350] max-md:border-b-2 sm:col-start-10  md:text-4xl lg:text-5xl xl:text-6xl"
        )}
        onClick={(e) => {
          spin.state = Math.random();
        }}
      >
        <m.div
          variants={textShadowVariant}
          initial="initial"
          animate="animate"
          transition={{
            ease: "easeInOut",
            repeatType: "reverse",
            duration: 5,
            delay: 2,
            repeat: Infinity,
          }}
          className={classNames("neonTextWorldTour font-angkor text-[#12172c]")}
        >
          World
        </m.div>
        <m.div
          className="neonTextWorldTour font-sans font-bold text-[#161637]"
          initial={{
            textShadow:
              " 0 0 2px #fff, 0 0 6px #accfd6, 0 0 12px #7fb8c9, 0 0 15px #96b8c9, 0px -7px 5px #96b8c9",
          }}
          animate={{
            textShadow:
              "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #96b8c9, -5px 20px 15px #96b8c9, 6px 2px 15px #96b8c9",
          }}
          transition={{
            ease: "easeInOut",

            repeatType: "reverse",
            duration: 10,

            delay: 0,
            repeat: Infinity,
          }}
        >
          Tour
        </m.div>
        <m.div
          variants={textShadowVariant}
          initial="initial"
          animate="animate"
          transition={{
            ease: "easeInOut",
            repeatType: "reverse",
            duration: 5,
            delay: 2,
            repeat: Infinity,
          }}
          className={classNames("neonTextWorldTour font-angkor text-[#12172c]")}
        >
          2024
        </m.div>
      </div>
    </>
  );
}
