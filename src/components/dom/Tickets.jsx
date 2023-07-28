import classNames from "classnames";
import { useState } from "react";
import { currentName } from "../../data/state";
import { useSnapshot } from "valtio";

export default function Tickets() {
  const [pointerDown, setPointerDown] = useState();
  const readCurrentName = useSnapshot(currentName);
  return (
    <>
      <div className="col-span-full row-span-2 flex select-none items-center justify-center space-x-4 border-2 border-t-0 sm:col-span-3 sm:row-span-6 sm:flex-col sm:space-y-8 sm:border-l-0">
        <div
          className={classNames(
            "neonText cursor-pointer rounded-lg border-2 bg-[#0f1629] px-4 text-3xl text-gray-50/80 sm:px-6 sm:text-7xl",
            pointerDown && "sm:neonText text-slate-50/90"
          )}
          onPointerDown={() => {
            setPointerDown(true);
          }}
          onPointerUp={() => {
            setPointerDown(false);
          }}
          onClick={() => {
            alert(`Purchased ${readCurrentName.state} tickets!`);
          }}
        >
          Buy
        </div>
        <div
          className={classNames(
            "select-none text-3xl text-gray-300/80 sm:px-6 sm:text-7xl"
          )}
        >
          Tickets
        </div>
      </div>
    </>
  );
}
