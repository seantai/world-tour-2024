import React from "react";
import { motion as m } from "framer-motion";
import { useSnapshot } from "valtio";
import { currentName } from "../../data/state";

export default function Tickets() {
  const readCurrentName = useSnapshot(currentName);
  return (
    <>
      <div className="border-3 absolute bottom-0 left-0 z-10 h-[25%] w-full border-b-2 from-slate-500 bg-grid-slate-700">
        {/************************************/}
        <div className="flex h-full w-full flex-row bg-gradient-to-t from-transparent to-[#1d2a32] p-10 text-2xl">
          <div className="w-[24%] flex-col space-y-2">
            <div className="text-slate-400">{"Get your"}</div>
            <div className="text-slate-100">
              {readCurrentName.state || "Kenya"}
            </div>
            <div className="text-slate-400">concert tickets.</div>
          </div>
          <div className="">
            <button className="rounded-full border bg-transparent px-4 py-2 text-slate-200">
              Add to Cart ↪
            </button>
          </div>
        </div>
        {/************************************/}
      </div>
    </>
  );
}
