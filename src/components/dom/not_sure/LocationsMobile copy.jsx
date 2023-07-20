import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";

export const LocationsMobile = () => {
  const readLocationsArray = useSnapshot(locationsArray);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-[70] flex h-[25%] w-full">
        {/************************************/}
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="{/*snap-y*/} flex w-[200vw] items-center justify-center space-x-7 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800"
        >
          {/* <div className="w-full" /> */}
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
          {/* <div className="w-full" /> */}
        </m.div>

        {/************************************/}
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
        "w-full border-y-2 border-slate-50 border-opacity-0 p-2 py-4 text-center font-sans text-7xl font-light text-gray-50/80",
        hover && "text-slate-50",
        pointerDown && "border-dashed border-opacity-100 text-slate-400",
        isInView && "border-opacity-100 bg-gradient-linear text-slate-50"
      )}
      onClick={() => {
        currentPosition.state = position;

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
