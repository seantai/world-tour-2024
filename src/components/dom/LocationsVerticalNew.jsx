import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import {
  locationsArray,
  currentName,
  currentPosition,
  scrolling,
} from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m, useScroll } from "framer-motion";

export const LocationsVerticalNew = () => {
  const readLocationsArray = useSnapshot(locationsArray);
  const containerRef = useRef();

  useEffect(() => {
    const middleLocation = "Mongolia";

    if (containerRef.current) {
      {
        readLocationsArray.arr &&
          readLocationsArray.arr.forEach((location, i) => {
            if (location.name == middleLocation) {
              location.ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                // for horizontal scroll
                // inline: "center",
              });
            }
          });
      }
    }
  }, [readLocationsArray]);

  return (
    <div
      className="z-50 col-start-10 col-end-13 row-start-6 row-end-17 flex h-full flex-col overflow-y-auto overflow-x-hidden scroll-smooth whitespace-nowrap border-2 border-r-0 border-t-0 scrollbar scrollbar-track-slate-500 scrollbar-thumb-[#020039] bg-grid-slate-700"
      ref={containerRef}
    >
      {/* <m.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="flex place-content-center pt-[1vh] text-3xl text-slate-50/80"
      >
        {"▲scroll▼"}
      </m.div> */}
      {/********************************************/}
      <div className="{/*md:mb-[140%] xl:mb-[100%]*/} snap-y snap-mandatory bg-gradient-to-r from-transparent from-40% to-[#2c7db350]">
        {readLocationsArray.arr &&
          readLocationsArray.arr.map((location, i) => {
            return (
              <Location
                key={i}
                position={location.position}
                reference={location.ref}
                name={location.name}
                readLocationsArray={readLocationsArray}
                index={i}
                containerRef={containerRef}
              >
                {location.name}
              </Location>
            );
          })}
        {/* <m.div
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="flex place-content-center text-3xl text-slate-50/80"
        >
          {"▲scroll▼"}
        </m.div> */}
      </div>
      {/* <div className="absolute bottom-0 h-1 bg-red-500 py-12">.</div> */}
    </div>
  );
};

const Location = ({
  children,
  reference,
  name,
  position,
  readLocationsArray,
  index,
  containerRef,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const { scrollYProgress } = useScroll();

  const isInView = useInView(reference, {
    root: containerRef,
    margin: "-45% 0px -55% 0px",
    // margin: "-55.8% 0px -40% 0px",
  });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      currentName.state = name;
      currentPosition.state = position;
    }, 300);

    return () => clearTimeout(timeout);
  }, [isInView]);

  const handlePointerUp = () => {
    setPointerDown(false);
  };

  useEffect(() => {
    if (pointerDown) {
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [pointerDown]);

  // window.addEventListener("scroll", () => {
  //   console.log("Scroll progress:", scrollYProgress.get());
  // });

  // const scrolling = proxy({
  //   state: false,
  // });

  // const handleScroll = () => {
  //   console.log("hi");
  //   // console.log(scrollYProgress.get());
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const listItem = {
    hidden: { opacity: 0, translateY: -20 },
    show: { opacity: 1, translateY: 0 },
  };

  const textShadow =
    "0 0 0px #000000, 0 0 0px #000000, 0 0 0px #000000, 0 0 0px #000000";

  const textShadowInView =
    "0 0 15px #2cb39d, 0 0 20px #2ca6b3, 0 0 30px #10647e, 0 0 40px #000101";

  const odd = index % 2 === 0;

  // scrollYProgress.get((progress) => {
  //   console.log("Scroll progress:", progress);
  // });

  return (
    <m.div
      // variants={listItem}
      // initial="hidden"
      // animate="show"
      // initial={{ textShadow }}
      // layoutId="sdfsd"
      // layout
      // // initial={{ t }} // initial position outside viewport
      // // exit={{ textShadow }}
      // whileInView={{
      //   textShadow: textShadowInView,
      //   // color: "rgb(248 250 252 / 0.9)",
      // }}
      // transition={{ duration: 0.5 }}
      // viewport={{ margin: "-59.8% 0px -40% 0px" }}
      //       transition={{ duration: 0.6,  }}
      layout
      {...props}
      ref={reference}
      className={classNames(
        "shadow1 cursor-pointer snap-center px-4 py-[2vh] text-start font-sans text-4xl font-bold tracking-wider text-slate-400 decoration-1 underline-offset-4 first:pt-[30vh] first:before:block first:before:pb-16 first:before:content-['▼▲▼'] last:pb-[35vh] last:after:block last:after:pt-16 last:after:content-['▲▼▲'] lg:text-[2.rem] xl:text-5xl",
        // "origin-bottom",
        pointerDown && "sm:neonText",
        isInView && "neonText text-slate-50 underline",
        hover && "text-slate-200/80"
      )}
      onClick={() => {
        currentPosition.state = position;
        currentName.state = name;
        reference.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }}
      onPointerEnter={() => {
        setHover(true);
      }}
      onPointerLeave={() => {
        setHover(false);
      }}
      onPointerDown={() => {
        setPointerDown(true);
      }}
      onPointerUp={() => {
        setPointerDown(false);
      }}
    >
      {/* <m.div
        // layout
        // variants={listItem}
        // initial="hidden"
        // animate="show"
        // transition={{ duration: 0.4 }}

        // initial={{ textShadow }}
        // // layoutId="sdfsjdlfksjdfl"
        // // initial={{ color: "#646464" }} // initial position outside viewport
        // exit={{ textShadow }}
        // whileInView={{
        //   textShadow: textShadowInView,
        //   // color: "rgb(248 250 252 / 0.9)",
        // }}
        // className={
        //   classNames(isInView && "underline")
        //   // odd ? "text-slate-500" : "text-slate-600",
        // }
      > */}
      {children}
      {/* </m.div> */}
    </m.div>
  );
};
