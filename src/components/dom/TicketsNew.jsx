import classNames from "classnames";
import { useState, useEffect } from "react";
import { currentName } from "../../data/state";
import { useSnapshot } from "valtio";
import TicketSVG from "./TicketSVG";
import { motion as m } from "framer-motion";
import { Apple } from "../svg/Apple";
import { Spotify } from "../svg/Spotify";
import { Youtube } from "../svg/Youtube";

import { useMediaQuery } from "@chakra-ui/media-query";

export default function TicketsNew() {
  const [pointerDown, setPointerDown] = useState();
  const readCurrentName = useSnapshot(currentName);

  const handlePointerUp = () => {
    setPointerDown(false);
  };

  useEffect(() => {
    if (pointerDown) {
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [pointerDown]);

  return (
    <>
      <div
        className={classNames(
          "col-start-1 col-end-10 row-start-14 row-end-17 flex items-center justify-between space-x-0 border-2 border-t-0 px-10 sm:space-x-16 sm:border-r-0"
        )}
        onPointerDown={() => {
          setPointerDown(true);
        }}
        onPointerUp={() => {
          setPointerDown(false);
        }}
      >
        <div className="group flex items-center justify-center">
          <m.div
            className={classNames(
              "neonBuy -mr-3 cursor-pointer rounded-lg border-2 bg-transparent px-4 py-2 text-3xl text-slate-900/80 sm:mr-0 sm:px-6 sm:text-6xl",
              pointerDown && "neonText"
            )}
            whileHover={{
              color: "#ffffff",
              textShadow:
                "0 0 15px #2cb39d, 0 0 20px #2ca6b3, 0 0 30px #10647e, 0 0 40px #000101",
              transition: { type: "spring", stiffness: 400, damping: 30 },
            }}
            onClick={() => {
              alert(`Purchased ${readCurrentName.state} tickets!`);
            }}
          >
            BUY
          </m.div>
          <m.div
            className={classNames(
              "neonTicketBorder cursor-pointer rounded-br-lg rounded-tr-lg border-l-0 bg-slate-700/70 px-4 py-2 font-angkor text-3xl tracking-wide text-[#749492]"
            )}
            onClick={() => {
              alert(`Purchased ${readCurrentName.state} tickets!`);
            }}
          >
            <m.div
              whileHover={{
                color: "#ddffee",
                textShadow:
                  "0 0 15px #2cb39d, 0 0 20px #2ca6b3, 0 0 30px #10647e, 0 0 40px #000101",
                transition: { type: "spring", stiffness: 400, damping: 30 },
              }}
              className="-mb-1"
            >
              Tickets
            </m.div>
          </m.div>
        </div>
        <div className="flex items-center justify-center space-x-10">
          {/* className={'text-[#2a8d98]'} */}
          <Apple fill={"#2a8d98"} />
          <Spotify fill={"#2a8d98"} />
          <Youtube fill={"#2a8d98"} />
        </div>
      </div>
    </>
  );
}
