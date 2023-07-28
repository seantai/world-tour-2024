import classNames from "classnames";
import { useState } from "react";
import { currentName } from "../../data/state";
import { useSnapshot } from "valtio";
import TicketSVG from "./TicketSVG";

import { useMediaQuery } from "@chakra-ui/media-query";

export default function Tickets() {
  const [pointerEnter, setPointerEnter] = useState();
  const readCurrentName = useSnapshot(currentName);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div
        className="col-start-1 col-end-13 row-start-12 row-end-14 flex  select-none items-center justify-center space-x-0 border-2 border-t-0 sm:col-span-3 sm:col-start-10 sm:col-end-13 sm:row-start-8 sm:row-end-14 sm:flex-col sm:space-x-0 sm:space-y-3 sm:border-l-0"
        onClick={() => {
          alert(`Purchased ${readCurrentName.state} tickets!`);
        }}
      >
        <div
          className={classNames(
            "neonText -mr-3 cursor-pointer rounded-lg border-2 bg-[#0f1629] px-4 text-3xl text-gray-50/80 sm:mr-0 sm:px-6 sm:text-7xl",
            pointerEnter && "sm:neonText text-slate-50/90"
          )}
          onPointerEnter={() => {
            setPointerEnter(true);
          }}
          onPointerLeave={() => {
            setPointerEnter(false);
          }}
        >
          BUY
        </div>
        {isLargerThan768 ? (
          <TicketSVG className="h-full w-[44%] sm:h-[44%]" />
        ) : (
          <div
            className={classNames(
              "neonTicketBorder select-none rounded-br-lg rounded-tr-lg bg-slate-700 px-4 text-4xl text-gray-300/80 "
            )}
          >
            Tickets
          </div>
        )}
      </div>
    </>
  );
}
