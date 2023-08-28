// import classNames from "classnames";
// import { useInView } from "framer-motion";
// import React, { useEffect, useState, useRef } from "react";
// import { locationsArray, currentName, currentPosition } from "../../data/state";
// import { useSnapshot } from "valtio";
// import { motion as m } from "framer-motion";
// import TitleNew from "./TitleNew";

// export const LocationsHorizontalNew = () => {
//   const readLocationsArray = useSnapshot(locationsArray);
//   const containerRef = useRef();

//   // useEffect(() => {
//   //   const middleLocation = "Korea";

//   //   if (containerRef.current) {
//   //     {
//   //       readLocationsArray.arr &&
//   //         readLocationsArray.arr.forEach((location, i) => {
//   //           if (location.name == middleLocation) {
//   //             location.ref.current?.scrollIntoView({
//   //               behavior: "smooth",
//   //               block: "center",
//   //               // for horizontal scroll
//   //               // inline: "center",
//   //             });
//   //           }
//   //         });
//   //     }
//   //   }
//   // }, [readLocationsArray]);

//   // const [startX, setStartX] = useState(0);
//   // const [scrollLeft, setScrollLeft] = useState(0);

//   // const startSwipe = (event) => {
//   //   setStartX(event.pageX);
//   //   setScrollLeft(event.target.scrollLeft);
//   // };

//   // const swipe = (event) => {
//   //   const walk = (event.pageX - startX) * 3; // scroll-fast
//   //   event.target.scrollLeft = scrollLeft - walk;
//   // };

//   return (
//     <>
//       <div
//         className="col-span-full row-span-4 flex snap-proximity items-center justify-center overflow-y-hidden overflow-x-scroll scroll-smooth whitespace-nowrap border-2 border-b-0 border-r-0 scrollbar scrollbar-track-slate-500 scrollbar-thumb-[#ebebeb9e] bg-grid-slate-700"
//         ref={containerRef}
//         // onMouseDown={startSwipe}
//         // onMouseMove={swipe}
//         // flex h-full w-full snap-x items-center overflow-x-scroll scroll-smooth whitespace-nowrap border-0 pr-44 scrollbar-track-slate-500 scrollbar-thumb-slate-800 bg-grid-slate-700 sm:space-x-16 sm:py-4 sm:scrollbar
//       >
//         {/********************************************/}
//         {/* <TitleNew /> */}
//         {/********************************************/}
//         {/* <div className="h-[2rem]" /> */}
//         {/* <div className="shrink-0"> */}
//         {/* <div className="h-full w-[140vw] shrink-0" /> */}
//         {/* </div> */}
//         {/********************************************/}
//         <div className="{/*w-[-140vw]*/} flex h-full items-center justify-between space-x-6">
//           {readLocationsArray.arr &&
//             readLocationsArray.arr.map((location, i) => {
//               return (
//                 <Location
//                   key={i}
//                   position={location.position}
//                   reference={location.ref}
//                   name={location.name}
//                   readLocationsArray={readLocationsArray}
//                   index={i}
//                 >
//                   {location.name}
//                 </Location>
//               );
//             })}
//         </div>
//         <div className="h-full pr-[25vw]" />
//         {/********************************************/}
//         {/* <div className="h-full w-[45rem] shrink-0" /> */}
//         {/********************************************/}
//         {/* {readLocationsArray.arr && <TitleNew bottom={true} />} */}
//         {/********************************************/}
//         {/********************************************/}
//         {/* <div className="h-[50%] w-full shrink-0" /> */}
//         {/********************************************/}
//       </div>
//       {/********************************************/}
//     </>
//   );
// };

// const Location = ({
//   children,
//   reference,
//   name,
//   position,
//   readLocationsArray,
//   index,
//   ...props
// }) => {
//   const [hover, setHover] = useState(false);
//   const [pointerDown, setPointerDown] = useState(false);

//   const isInView = useInView(reference, {
//     margin: "0px -49% 0px -49%",
//   });

//   useEffect(() => {
//     if (!isInView) return;

//     const timeout = setTimeout(() => {
//       currentName.state = name;
//       currentPosition.state = position;
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [isInView]);

//   const handlePointerUp = () => {
//     setPointerDown(false);
//   };

//   useEffect(() => {
//     if (pointerDown) {
//       window.addEventListener("pointerup", handlePointerUp);
//     }
//     return () => {
//       window.removeEventListener("pointerup", handlePointerUp);
//     };
//   }, [pointerDown]);

//   const listItem = {
//     hidden: { opacity: 0, translateY: -100 },
//     show: { opacity: 1, translateY: 0 },
//   };

//   return (
//     <m.div
//       variants={listItem}
//       initial="hidden"
//       animate="show"
//       transition={{ duration: 0.6, delay: index * 0.08 }}
//       {...props}
//       ref={reference}
//       className={classNames(
//         "cursor-pointer text-center font-sans text-5xl font-bold tracking-wide text-gray-50/80 text-slate-400 decoration-2 underline-offset-8 ",
//         hover && "text-slate-50/90",
//         pointerDown && "sm:neonText",
//         isInView && "neonText text-slate-50/90 underline"
//       )}
//       onClick={() => {
//         currentPosition.state = position;
//         currentName.state = name;
//         reference.current?.scrollIntoView({
//           behavior: "smooth",
//           block: "center",
//         });
//       }}
//       onPointerEnter={() => {
//         setHover(true);
//       }}
//       onPointerLeave={() => {
//         setHover(false);
//       }}
//       onPointerDown={() => {
//         setPointerDown(true);
//       }}
//       onPointerUp={() => {
//         setPointerDown(false);
//       }}
//     >
//       {children}
//     </m.div>
//   );
// };

import classNames from "classnames";
import { useInView } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { locationsArray, currentName, currentPosition } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";

export const LocationsHorizontalNew = () => {
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
