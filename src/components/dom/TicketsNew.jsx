import classNames from "classnames";
import { useState, useEffect } from "react";
import { currentName } from "../../data/state";
import { useSnapshot } from "valtio";
import { motion as m } from "framer-motion";
import { Apple } from "../svg/Apple";
import { Spotify } from "../svg/Spotify";
import { Youtube } from "../svg/Youtube";
import { Github } from "../svg/Github";
import { spin } from "../../data/state";
import { useToast } from "@/components/use-toast";

export default function TicketsNew() {
  //
  const [pointerDown, setPointerDown] = useState();

  const readCurrentName = useSnapshot(currentName);

  const { toast } = useToast();

  return (
    <>
      <div
        className={classNames(
          "col-start-1 col-end-10 row-start-14 row-end-17 flex  items-center justify-between space-x-0 border-2 border-t-0 px-10 sm:space-x-16 sm:border-r-0",
          "bg-gradient-to-l from-transparent from-40% to-[#2c7db350]"
        )}
        onPointerDown={() => {
          setPointerDown(true);
        }}
        onPointerUp={() => {
          setPointerDown(false);
        }}
      >
        <div
          className="group flex cursor-pointer items-center justify-center"
          variant="outline"
          onClick={() => {
            toast({
              title: `${readCurrentName.state}`,
              description: "Friday, Sept 8, 2024 at 6 PM",
              duration: 4000,
            });
          }}
        >
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
          >
            BUY
          </m.div>
          <m.div
            className={classNames(
              "neonTicketBorder cursor-pointer rounded-br-lg rounded-tr-lg border-l-0 bg-slate-700/70 px-4 py-2 font-sans text-4xl tracking-wide text-[#749492]"
            )}
          >
            <m.div
              initial={{ textShadow: " 1px 0px 2px #000000" }}
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
        <div className="justify-space flex cursor-pointer items-center space-x-4 ">
          <Github fill={"#26727a"} />
          <Apple fill={"#26727a"} />
          <Spotify fill={"#26727a"} />
          <Youtube fill={"#26727a"} />
        </div>
      </div>
    </>
  );
}
