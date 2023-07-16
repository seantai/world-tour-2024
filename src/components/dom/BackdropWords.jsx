import { motion as m } from "framer-motion";
import classNames from "classnames";
// import { useSnapshot } from "valtio";
// import { currentViewName } from "../../data/state";

export default function BackdropWords() {
  // const snapCurrentView = useSnapshot(currentViewName);
  return (
    <>
      <m.div className="absolute left-0 top-0 z-0 h-[75%] w-full">
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className={classNames(
            "-mb-36 ml-20 font-angkor text-[175px] text-[#4d718785]"
            // `blur-${blurMotionValue}px`
          )}
        >
          World
        </m.div>
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring", delay: 0.5 }}
          className="m-6 text-[200px] text-slate-600/90"
        >
          Tour
        </m.div>
      </m.div>
    </>
  );
}
