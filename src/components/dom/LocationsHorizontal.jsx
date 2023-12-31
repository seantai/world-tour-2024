import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";

export const LocationsHorizontal = () => {
  //
  const readLocationsArray = useSnapshot(locationsArray);
  const containerRef = useRef();

  //
  useEffect(() => {
    const middleLocation = "Korea";

    if (containerRef.current) {
      {
        readLocationsArray.arr &&
          readLocationsArray.arr.forEach((location, i) => {
            if (location.name == middleLocation) {
              location.ref.current?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
              });
            }
          });
      }
    }
  }, [readLocationsArray]);

  return (
    <>
      <div className="col-span-full row-span-4 sm:row-span-4">
        <div
          className="flex h-full w-full snap-x items-center overflow-x-scroll scroll-smooth whitespace-nowrap border-0 pr-44 scrollbar-track-slate-500 scrollbar-thumb-slate-800 bg-grid-slate-700 sm:space-x-16 sm:py-4 sm:scrollbar"
          ref={containerRef}
        >
          <div className="neonText text-5xl text-slate-50/90">
            {"← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←"}
          </div>

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
          <div className="h-full pr-[25vw]" />
        </div>
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

    const timeout = setTimeout(() => {
      currentName.state = name;
      currentPosition.state = position;
    }, 300);

    return () => clearTimeout(timeout);
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
        "shadow2 flex h-full grow-0 cursor-pointer snap-center items-center border-y-2 border-t-0 border-slate-50 border-opacity-0 p-2 text-center font-sans text-5xl font-light text-gray-50/80 text-slate-400 decoration-2 underline-offset-8 sm:text-7xl",
        hover && "text-slate-50/90",
        pointerDown && "sm:neonText",
        isInView && "neonText text-slate-50/90 underline"
      )}
      onClick={() => {
        currentPosition.state = position;
        currentName.state = name;
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
