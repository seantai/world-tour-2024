import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";

export const LocationsVertical = () => {
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
      className="z-50 col-start-10 col-end-13 row-start-6 row-end-17 flex h-full flex-col overflow-y-auto overflow-x-hidden scroll-smooth whitespace-nowrap border-2 border-r-0 border-t-0 scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800 bg-grid-slate-700"
      ref={containerRef}
    >
      <div className="snap-y snap-mandatory bg-gradient-to-r from-transparent from-40% to-[#2c7db350]">
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
      </div>
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

  const isInView = useInView(reference, {
    root: containerRef,
    margin: "-45% 0px -55% 0px",
  });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      currentName.state = name;
      currentPosition.state = position;
    }, 300);

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <m.div
      layout
      {...props}
      ref={reference}
      className={classNames(
        "shadow2 cursor-pointer snap-center px-4 py-[2vh] text-start font-sans text-4xl font-bold tracking-wider text-slate-400 decoration-1 underline-offset-4 first:pt-[30vh] first:before:block first:before:pb-16 first:before:content-['▼▲▼'] last:pb-[35vh] last:after:block last:after:pt-16 last:after:content-['▲▼▲'] lg:text-[2.rem] xl:text-5xl",
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
      {children}
    </m.div>
  );
};
