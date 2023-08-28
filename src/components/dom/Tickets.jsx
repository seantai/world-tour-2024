import classNames from "classnames";
import { useState } from "react";
import { currentName } from "../../data/state";
import { useSnapshot } from "valtio";
import TicketSVG from "./TicketSVG";
import { motion as m } from "framer-motion";

import { useToast } from "@/components/use-toast";

export default function Tickets() {
  const [pointerEnter, setPointerEnter] = useState();
  const readCurrentName = useSnapshot(currentName);
  const { toast } = useToast();

  return (
    <>
      <div className="col-start-1 col-end-13 row-start-12 row-end-14 flex  select-none items-center justify-center space-x-0 border-2 border-t-2 bg-gradient-to-r from-transparent from-40% to-[#2c7db350] sm:col-span-3 sm:col-start-10 sm:col-end-13 sm:row-start-8 sm:row-end-14 sm:flex-col sm:space-x-0 sm:space-y-3 sm:border-l-2">
        <div
          variant="outline"
          onClick={() => {
            toast({
              title: `${readCurrentName.state}`,
              description: "Friday, Sept 8, 2024 at 6 PM",
              duration: 4000,
            });
          }}
          className="flex cursor-pointer items-center justify-center space-y-2 sm:flex-col"
        >
          <div
            className={classNames(
              "neonText -mr-2 rounded-lg border-2 bg-[#0f1629] px-4 text-3xl text-gray-50/80 sm:mr-0 sm:px-6 sm:text-7xl",
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
          <m.div
            initial={{ textShadow: " 1px 0px 2px #000000" }}
            whileHover={{
              color: "#ddffee",
              textShadow:
                "0 0 15px #2cb39d, 0 0 20px #2ca6b3, 0 0 30px #10647e, 0 0 40px #000101",
              transition: { type: "spring", stiffness: 400, damping: 30 },
            }}
            className={classNames(
              "neonTicketBorder rounded-lg bg-slate-700 px-4 text-center text-4xl text-[#749492] text-gray-300/80"
            )}
          >
            Tickets
          </m.div>
        </div>
      </div>
    </>
  );
}
