import { motion as m } from "framer-motion";
import classNames from "classnames";
import { useMediaQuery } from "@chakra-ui/media-query";
import { spin } from "../../data/state";
import { useSnapshot } from "valtio";
import { useScroll, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function TitleNew(props) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  // const readSpin = useSnapshot(spin);

  // const motionValue = useMotionValue()
  const { scrollYProgress } = useScroll();
  const fontSize = useTransform(scrollYProgress, [0, 0.1], ["10rem", "1rem"]);

  useEffect(() => {
    const handleScroll = () => {
      // console.log(fontSize);
      // if scrollYProgress.current < 0.01 then ?STICKY?
      // console.log(window.scrollY);
      // console.log(scrollY.current);
      // console.log(targetRef.current.offsetTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fontSize]);

  return (
    <>
      {/*   <div
        // className="/~scroll-smooth~/ z-50 col-start-10 col-end-13 row-start-1 row-end-17 flex h-full flex-col overflow-x-hidden overflow-y-scroll whitespace-nowrap border-2 border-r-0  scrollbar scrollbar-track-slate-500 scrollbar-thumb-[#020039] bg-grid-slate-700"
        className="z-[60] col-start-10 col-end-13 row-start-1 row-end-2 flex h-full flex-col"
        // ref={containerRef}
      >*/}
      {/* <div className={classNames(!props.bottom && "")}> */}
      <m.div
        // initial={{
        //   y: isLargerThan768 && props.bottom ? 100 : 0,
        //   opacity: isLargerThan768 ? 0 : 1,
        // }}
        // animate={{ y: 0, opacity: 1 }}
        // transition={{ duration: 2, type: "spring" }}
        className={classNames(
          "z-40 col-start-1 col-end-13 row-start-1 row-end-3 flex cursor-pointer items-center justify-center overflow-hidden border-b-2 bg-[#031a20] sm:col-start-10 sm:col-end-13 sm:row-start-1 sm:row-end-3 sm:flex-col md:text-5xl"
          // props.bottom && "mt-8 border-t-2"
        )}
        onClick={(e) => {
          spin.state = Math.random();
        }}
      >
        <m.div
          className={classNames("neonTextWorldTour font-angkor text-[#12172c]")}
          whileHover={{
            textShadow:
              "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 15px #96b8c9",
            transition: { type: "spring", stiffness: 400, damping: 30 },
          }}
        >
          World
        </m.div>
        <m.div
          // initial={{
          //   y: isLargerThan768 ? 100 : 0,
          //   opacity: isLargerThan768 ? 0 : 1,
          // }}
          // animate={{ y: 0, opacity: 1 }}
          // transition={{ duration: 2, type: "spring", delay: 0.5 }}
          className="neonTextWorldTour font-angkor  text-[#0f0a1c] sm:font-sans sm:font-bold"
          whileHover={{
            textShadow:
              "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 15px #96b8c9",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30,
              // duration: 0.051,
            },
          }}
        >
          Tour
        </m.div>
        <m.div
          // initial={{
          //   y: isLargerThan768 ? 100 : 0,
          //   opacity: isLargerThan768 ? 0 : 1,
          // }}
          // animate={{ y: 0, opacity: 1 }}
          // transition={{ duration: 2, type: "spring", delay: 2.2 }}
          className={classNames("neonTextWorldTour font-angkor text-[#12172c]")}
          whileHover={{
            textShadow:
              "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 15px #96b8c9",
            transition: { type: "spring", stiffness: 400, damping: 30 },
          }}
          // style={{ fontSize: fontSize }}
          // style={{ fontSize: `${fontSize}rem` }}
        >
          2024
        </m.div>
      </m.div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
