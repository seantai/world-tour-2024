import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState } from "react";
import { state, fooArr } from "../../data/state";
import { useSnapshot } from "valtio";

export const Locations = () => {
  const readFooArr = useSnapshot(fooArr);

  return (
    <>
      <div className="absolute bottom-0 right-0 top-0 z-[70] mt-[0vh] flex h-full w-1/3">
        {/************************************/}
        <div className="flex w-full snap-y flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth py-[50vh] scrollbar scrollbar-track-slate-500 scrollbar-thumb-slate-800">
          {readFooArr.arr &&
            readFooArr.arr.map((location, i) => {
              return (
                <Location
                  key={i}
                  reference={location.ref}
                  // name={location.name}
                  position={location.position}
                >
                  {location.name}
                </Location>
              );
            })}
        </div>
        {/************************************/}
      </div>
    </>
  );
};

const Location = ({ children, reference, name, position, ...props }) => {
  const [hover, setHover] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  const isInView = useInView(reference, {
    margin: "-50% 0px -50% 0px",
  });

  useEffect(() => {
    if (!isInView) return;
    console.log(isInView);
    state.currentName = name;
    // console.log(name);
    // console.log((state.currentView = position));
    // state.currentView = position;
    // currentViewName.state = name;
    // animate(scope.current, { opacity: 1 })
    // console.log(locationRef);
    // get ref of oh
  }, [isInView]);

  return (
    <p
      {...props}
      ref={reference}
      className={classNames(
        "w-full cursor-pointer border-y-2  border-slate-50 border-opacity-0 p-2 py-4 pr-16 text-right font-sans text-5xl font-light text-gray-50/80 ",
        hover && "text-slate-50",
        pointerDown && "border-dashed border-opacity-100 text-slate-400",
        isInView && "border-opacity-100 bg-gradient-linear text-slate-50"
      )}
      // onClick={() => {
      //   state.currentView = position;
      //   locationRef.current?.scrollIntoView({
      //     behavior: "smooth",
      //     block: "center",
      //   });
      // }}
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
    </p>
  );
};
