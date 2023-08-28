import { motion as m } from "framer-motion";
import classNames from "classnames";
import { spin } from "../../data/state";

export default function TitleNew() {
  return (
    <>
      <m.div
        className={classNames(
          "border-b-1 z-[70] col-end-13 row-start-1 row-end-6 flex cursor-pointer flex-col items-center justify-evenly overflow-hidden border-2 border-b-slate-50/20 bg-gradient-to-r from-transparent from-45% to-[#2c7db350] max-md:border-b-2 sm:col-start-10  md:text-4xl lg:text-5xl xl:text-6xl"
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
          className="neonTextWorldTour font-sans font-bold text-[#161637]"
          whileHover={{
            textShadow:
              "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 15px #96b8c9",
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30,
            },
          }}
        >
          Tour
        </m.div>
        <m.div
          className={classNames("neonTextWorldTour font-angkor text-[#12172c]")}
          whileHover={{
            textShadow:
              "0 0 2px #000, 0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 15px #96b8c9",
            transition: { type: "spring", stiffness: 400, damping: 30 },
          }}
        >
          2024
        </m.div>
      </m.div>
    </>
  );
}
