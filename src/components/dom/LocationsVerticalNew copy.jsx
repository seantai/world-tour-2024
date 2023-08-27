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

  return (
    <>
      <div
        className="col-start-10 col-end-13 row-start-1 row-end-17 flex  snap-proximity flex-col  overflow-y-scroll scroll-smooth whitespace-nowrap border-2 border-b-0 scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800 bg-grid-slate-700 "
        ref={containerRef}
      >
        {/********************************************/}
        <TitleNew />
        {/********************************************/}
        <div className="h-[2rem]" />
        {/********************************************/}
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
        {/********************************************/}
        <div className="h-[22rem]" />
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
        " cursor-pointer py-3 pr-2 text-start font-sans text-5xl font-bold tracking-wide text-gray-50/80 text-slate-400 decoration-2 underline-offset-8 ",
        hover && "text-slate-50/90",
        pointerDown && "sm:neonText",
        isInView && "neonText text-slate-50/90 underline",
        ""
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
