import { motion as m } from "framer-motion";
import classNames from "classnames";
import { useMediaQuery } from "@chakra-ui/media-query";
import { launch } from "../../data/state";
import { spin } from "../../data/state";

export default function Title() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div
        className="z-20 col-start-1 col-end-13 row-start-1 row-end-3
        -mb-2 flex h-full cursor-pointer items-center justify-center space-x-5 border-2 border-x-0 border-b-0 bg-grid-slate-700 sm:col-start-10 sm:col-end-13 sm:row-start-1 sm:row-end-8 sm:flex-col sm:space-x-0 sm:space-y-4 sm:border-x-2"
        onClick={(e) => {
          spin.state = Math.random();
        }}
      >
        <m.div
          // initial={{
          //   y: isLargerThan768 ? 100 : 0,
          //   opacity: isLargerThan768 ? 0 : 1,
          // }}
          // animate={{ y: 0, opacity: 1 }}
          initial={{
            textShadow:
              " 0 0 2px #fff, 0 0 6px #accfd6, 0 0 12px #7fb8c9, 0 0 15px #96b8c9, 0px 0px 0px #fff",
          }}
          animate={{
            textShadow:
              "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 15px #96b8c9, 1px -2px 50px #fff",
          }}
          // transition={{ duration: 2, type: "spring" }}
          className={classNames(
            "neonTextWorldTour font-angkor text-3xl text-[#12172c]  sm:text-[2.3rem] md:text-[3rem] lg:text-[60px]"
          )}
          transition={{
            ease: "easeInOut",
            // type: "spring",
            // stiffness: 400,
            // damping: 30,
            repeatType: "reverse",
            duration: 5,
            // loop: Infinity,
            delay: 2,
            repeat: Infinity,
          }}
        >
          World
        </m.div>
        <m.div
          initial={{
            y: isLargerThan768 ? 100 : 0,
            opacity: isLargerThan768 ? 0 : 1,
          }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", delay: 0.5 }}
          className="neonTextWorldTour font-angkor text-3xl text-[#0f0a1c] sm:font-sans sm:text-6xl sm:font-bold"
        >
          Tour
        </m.div>
        <m.div
          initial={{
            y: isLargerThan768 ? 100 : 0,
            opacity: isLargerThan768 ? 0 : 1,
          }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", delay: 2.2 }}
          className={classNames(
            "neonTextWorldTour font-angkor text-3xl text-[#12172c] sm:text-5xl"
          )}
        >
          2024
        </m.div>
      </div>
    </>
  );
}
