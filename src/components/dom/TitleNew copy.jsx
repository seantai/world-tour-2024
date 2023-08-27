import { motion as m } from "framer-motion";
import classNames from "classnames";
import { useMediaQuery } from "@chakra-ui/media-query";
import { spin } from "../../data/state";
import { useSnapshot } from "valtio";

export default function TitleNew(props) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  // const readSpin = useSnapshot(spin);
  return (
    <>
      <m.div
        initial={{
          y: isLargerThan768 && props.bottom ? 100 : 0,
          opacity: isLargerThan768 ? 0 : 1,
        }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className={classNames(
          "col-start-1 col-end-13 row-start-1 row-end-3 flex cursor-pointer items-center justify-center border-b-2 py-10 sm:col-start-10 sm:col-end-13 sm:row-start-1 sm:row-end-8 sm:flex-col sm:space-y-10",
          props.bottom && "mt-8 border-t-2"
        )}
        whileInView={{ opacity: 1, y: 0 }}
        onClick={(e) => {
          // console.log(spin.state);
          // console.log(readSpin.state);
          // // console.log(e);
          spin.state = Math.random();
          // console.log(spin.state);
          // console.log(readSpin.state);
        }}
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
            "neonTextWorldTour font-angkor text-3xl text-[#12172c] sm:text-5xl sm:text-[60px]"
          )}
        >
          2024
        </m.div>
      </m.div>
    </>
  );
}
