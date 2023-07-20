import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";

export const LocationsMobile = () => {
  const readLocationsArray = useSnapshot(locationsArray);

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.05,
  //     },
  //   },
  // };

  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      containerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  return (
    <>
      <div
        className="{/*pr-[100vw]*/} fixed bottom-0 flex h-[25vh] w-full snap-x items-center space-x-6 overflow-x-auto whitespace-nowrap px-[50%] scrollbar-track-slate-500 scrollbar-thumb-slate-800 sm:py-4 sm:scrollbar md:space-x-16"
        ref={containerRef}
      >
        {readLocationsArray.arr &&
          readLocationsArray.arr.map((location, i) => {
            return (
              <Location
                key={i}
                position={location.position}
                reference={location.ref}
                name={location.name}
                readLocationsArray={readLocationsArray}
              >
                {location.name}
              </Location>
            );
          })}
        <div className="w-[200px]" />
      </div>
    </>
  );
};

const Location = ({
  children,
  reference,
  name,
  position,
  readLocationsArray,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const isInView = useInView(reference, {
    margin: "0px -50% 0px -50% ",
  });

  useEffect(() => {
    if (!isInView) return;
    currentPosition.state = position;
    currentName.state = name;
  }, [isInView]);

  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <m.div
      variants={listItem}
      initial="hidden"
      animate="show"
      {...props}
      ref={reference}
      className={classNames(
        "flex h-full grow-0 snap-center items-center border-y-2 border-t-0 border-slate-50 border-opacity-0 p-2 py-4 text-center font-sans text-4xl font-light text-gray-50/80 sm:text-7xl",
        hover && "flex-shrink-0 text-slate-50",
        pointerDown &&
          "sm:border-dashed sm:border-opacity-100 sm:text-slate-400",
        isInView && "border-opacity-100 bg-gradient-linear text-slate-50"
      )}
      onClick={() => {
        currentPosition.state = position;

        reference.current?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
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
