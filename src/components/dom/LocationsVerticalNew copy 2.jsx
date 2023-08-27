import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";
import TitleNew from "./TitleNew";

export const LocationsVerticalNew = () => {
  const readLocationsArray = useSnapshot(locationsArray);
  const containerRef = useRef();

  // useEffect(() => {
  //   const middleLocation = "Korea";

  //   if (containerRef.current) {
  //     {
  //       readLocationsArray.arr &&
  //         readLocationsArray.arr.forEach((location, i) => {
  //           if (location.name == middleLocation) {
  //             location.ref.current?.scrollIntoView({
  //               behavior: "smooth",
  //               block: "center",
  //               // for horizontal scroll
  //               // inline: "center",
  //             });
  //           }
  //         });
  //     }
  //   }
  // }, [readLocationsArray]);

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
    <>
      <div
        className="col-start-10 col-end-13 row-start-1 row-end-17 flex h-full snap-proximity flex-col overflow-x-hidden overflow-y-scroll scroll-smooth whitespace-nowrap border-2 border-b-0 border-r-0 scrollbar  scrollbar-track-slate-500  scrollbar-thumb-[#020039] bg-grid-slate-700"
        ref={containerRef}
        // onMouseDown={startSwipe}
        // onMouseMove={swipe}
      >
        {/********************************************/}
        <TitleNew />
        {/********************************************/}
        {/* <div className="h-[2rem]" /> */}
        {/* <div className="shrink-0"> */}
        {/* </div> */}
        {/********************************************/}
        <div className="h-[20%] w-full shrink-0" />
        {/********************************************/}
        <div className="neonTextBlack mt-4 flex place-content-center text-4xl text-slate-50/90">
          {"▲"}
        </div>
        <div className="flex place-content-center pb-4 text-3xl text-slate-50/80">
          {"scroll"}
        </div>
        {/********************************************/}
        <div className="space-y-5">
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
        {/********************************************/}
        {/* {readLocationsArray.arr && <TitleNew bottom={true} />} */}

        {/********************************************/}
        {/********************************************/}
        {/* <div className="h-[50%] w-full shrink-0" /> */}
        {/********************************************/}
      </div>
      {/********************************************/}
    </>
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
    margin: "-49% 0px -49% 0px",
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
    hidden: { opacity: 0, translateY: -100 },
    show: { opacity: 1, translateY: 0 },
  };

  return (
    <m.div
      variants={listItem}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.6, delay: index * 0.08 }}
      {...props}
      ref={reference}
      className={classNames(
        "cursor-pointer pl-2 text-start font-sans text-3xl font-bold tracking-wide text-gray-50/80 text-slate-400 decoration-2 underline-offset-8 lg:text-4xl xl:text-5xl",
        hover && "text-slate-50/90",
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
