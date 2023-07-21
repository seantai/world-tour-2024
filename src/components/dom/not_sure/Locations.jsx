import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";

export const Locations = () => {
  const readLocationsArray = useSnapshot(locationsArray);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger duration in seconds
      },
    },
  };

  return (
    <>
      <div className="absolute bottom-0 right-0 top-0 z-[70] flex h-full w-[30vw]">
        {/************************************/}
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="{/*snap-y*/} flex w-full flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth py-[50vh] scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800"
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
    margin: "-50% 0px -50% 0px",
  });

  useEffect(() => {
    if (!isInView) return;
    currentPosition.state = position;
    currentName.state = name;
  }, [isInView]);

  // useEffect(() => {
  //   readLocationsArray.arr.map((location, i) => {
  //     console.log(location);
  //   });
  // }, [pointerDown]);

  const listItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <m.p
      variants={listItem}
      initial="hidden"
      animate="show"
      {...props}
      ref={reference}
      className={classNames(
        "w-full cursor-pointer border-y-2 border-slate-50 border-opacity-0 p-2 py-4 pr-16 text-right font-sans text-5xl font-light text-gray-50/80",
        hover && "text-slate-50",
        pointerDown && "border-dashed border-opacity-100 text-slate-400",
        isInView && "bg-gradient-lisiar border-opacity-100 text-slate-50"
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

        // {
        //   readLocationsArray.arr.map((location, i) => {
        //     return (
        //       <Location
        //         key={i}
        //         position={location.position}
        //         reference={location.ref}
        //         name={location.name}
        //       >
        //         {location.name}
        //       </Location>
        //     );
        //   });
        // }
      }}
    >
      {children}
    </m.p>
  );
};
