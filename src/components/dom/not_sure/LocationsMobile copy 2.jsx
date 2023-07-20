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
      {/* <div className="fixed bottom-0 flex h-[25vh] w-full space-x-4 overflow-x-auto scroll-smooth p-4 px-[50vw] scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800">
        /~**********************************~/
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="/~snap-y~/ flex w-[200px] flex-shrink-0 items-center justify-center space-x-7"
        >
          /~ <div className="w-full" /> ~/
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
          /~ <div className="w-full" /> ~/
        </m.div>

        /~**********************************~/
      </div>*/}

      <div className="fixed bottom-0 top-[75%] flex h-[25vh] w-full snap-x items-center space-x-12 overflow-x-auto pl-[50vw] pr-[50vw] scrollbar-track-slate-500 scrollbar-thumb-slate-800 sm:py-4 sm:scrollbar md:space-x-16">
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

  const onPointerDown = () => {
    setPointerDown(true);
    setTimeout(() => {
      setPointerDown(false);
    }, "1000");
  };

  return (
    <m.div
      variants={listItem}
      initial="hidden"
      animate="show"
      {...props}
      ref={reference}
      className={classNames(
        "flex h-full grow-0 cursor-pointer snap-center items-center border-y-2 border-t-0 border-slate-50 border-opacity-0 p-2 py-4 text-center font-sans text-4xl font-light text-gray-50/80 sm:text-7xl",
        hover && "text-slate-50",
        pointerDown && "border-dashed border-opacity-100 text-slate-400",
        isInView && "border-opacity-100 bg-gradient-linear text-slate-50"
      )}
      onClick={() => {
        currentPosition.state = position;

        console.log(reference.current);
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
        onPointerDown();
        // pointerDown()
        // setPointerDown(true);
      }}
      onPointerUp={() => {
        setPointerDown(false);
      }}
    >
      {children}
    </m.div>
  );
};
