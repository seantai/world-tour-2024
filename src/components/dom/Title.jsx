import { motion as m } from "framer-motion";
import classNames from "classnames";
import { useMediaQuery } from "@chakra-ui/media-query";
import { launch } from "../../data/state";

export default function Title() {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div
        className="col-start-1 col-end-13 row-start-1
        row-end-3 flex select-none items-center
       justify-center space-x-5 border-2 border-x-0 bg-grid-slate-700 sm:col-start-10 sm:col-end-13 sm:row-start-1 sm:row-end-8 sm:flex-col sm:space-x-0 sm:space-y-8 sm:border-r-2"
        // onClick={() => {
        //   launch.state = !launch.state;
        // }}
      >
        <m.div
          initial={{
            y: isLargerThan768 ? 100 : 0,
            opacity: isLargerThan768 ? 0 : 1,
          }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className={classNames(
            "neonTextWorldTour font-angkor text-3xl text-[#12172c] sm:text-5xl sm:text-[60px]"
          )}
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
          className="neonTextWorldTour text-3xl text-[#0f0a1c] sm:font-sans sm:text-6xl sm:font-bold"
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
            "neonTextWorldTour font-angkor text-3xl text-[#12172c] sm:text-5xl sm:text-[60px]"
          )}
        >
          2023
        </m.div>
      </div>
    </>
  );
}
