import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";
import TitleNew from "./TitleNew";
import { ReactLenis } from "@studio-freight/react-lenis";

export const LocationsVerticalNew = () => {
  const readLocationsArray = useSnapshot(locationsArray);
  const containerRef = useRef();

  useEffect(() => {
    const middleLocation = "Korea";

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

  // const [startX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  // const startSwipe = (event) => {
  //   setStartX(event.pageX);
  //   setScrollLeft(event.target.scrollLeft);
  // };

  // const swipe = (event) => {
  //   const walk = (event.pageX - startX) * 3; // scroll-fast
  //   event.target.scrollLeft = scrollLeft - walk;
  // };

  return (
    <div
      className="{/*scroll-smooth*/} z-50 col-start-10 col-end-13 row-start-1 row-end-17 flex h-full flex-col overflow-x-hidden overflow-y-scroll whitespace-nowrap border-2 border-r-0  scrollbar scrollbar-track-slate-500 scrollbar-thumb-[#020039] bg-grid-slate-700"
      ref={containerRef}
      // onMouseDown={startSwipe}
      // onMouseMove={swipe}
    >
      {/* <ReactLenis> */}
      {/********************************************/}
      <TitleNew />
      {/********************************************/}
      {/* <div className="h-[2rem]" /> */}
      {/* <div className="shrink-0"> */}
      {/* <div className="h-[2rem] w-full shrink-0" /> */}
      {/* </div> */}
      {/********************************************/}
      {/* <div className="neonTextBlack mt-4 flex place-content-center text-4xl text-slate-50/90">
        {"▲▼"}
      </div> */}
      {/* <div className="w-full" /> */}
      <m.div
        initial={{
          // y: 100,
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="flex place-content-center text-3xl text-slate-50/80"
      >
        {"▲scroll▼"}
      </m.div>
      {/********************************************/}
      <div className="{/*md:mb-[140%] xl:mb-[100%]*/} snap-y snap-mandatory">
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
              >
                {location.name}
              </Location>
            );
          })}
      </div>
      {/* <div className="h-1 w-full xl:mt-[130%] 2xl:mt-[120%]"></div> */}
      {/* <m.div
        initial={{
          // y: 100,
          opacity: 0,
        }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, type: "spring" }}
        className="flex place-content-center text-3xl text-slate-50/80"
      >
        {"▲scroll▼"}
      </m.div> */}
      {/* <div className="w-full xl:pb-40" /> */}
      {/********************************************/}
      {/* {readLocationsArray.arr && <TitleNew bottom={true} />} */}
      {/********************************************/}
      {/* <TitleNew bottom /> */}
      {/********************************************/}
      {/********************************************/}
      {/* <div className="h-[50%] w-full shrink-0" /> */}
      {/********************************************/}
      {/* </ReactLenis> */}
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
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const isInView = useInView(reference, {
    margin: "-50% 0px -50% 0px",
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

  const listItem = {
    hidden: { opacity: 0, translateY: -20 },
    show: { opacity: 1, translateY: 0 },
  };

  const textShadow =
    "0 0 15px #2cb39d, 0 0 20px #2ca6b3, 0 0 30px #10647e, 0 0 40px #000101";

  return (
    <m.div
      layout
      // layoutId="sdfsjdlfksjdfl"
      variants={listItem}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.4 }}
      whileInView={{ textShadow }}
      viewport={{ margin: "-50% 0px -50% 0px" }}
      {...props}
      ref={reference}
      className={classNames(
        "{/*scroll-pt-10*/} {/*text-shadow-[0_0_0_#000000_0_0_0_#000000_0_0_0_#000000_0_0_0_#000000]*/} cursor-pointer py-3 pl-2 text-start font-sans text-3xl font-bold tracking-wide text-gray-50/80 text-slate-400 decoration-2 underline-offset-8 md:text-4xl lg:text-[2.7rem] xl:text-5xl",
        hover && !isInView && "z-[35] text-slate-300/90",
        pointerDown && "sm:neonText",
        isInView && "neonText text-slate-50/90 underline"
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
      {children}
    </m.div>
  );
};
