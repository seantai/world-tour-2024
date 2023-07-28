import classNames from "classnames";

export default function TitleMobile() {
  return (
    <>
      <div
        className="col-span-full
       row-span-2 flex select-none items-center justify-center space-x-5 border-2 border-y-0 text-[#12172c] bg-grid-slate-700"
      >
        <div
          className={classNames(
            "neonTextWorldTour font-angkor text-3xl text-[#12172c]"
          )}
        >
          World
        </div>
        <div className="neonTextWorldTour font-angkor text-3xl text-[#0f0a1c] ">
          Tour
        </div>
        <div
          className={classNames(
            "neonTextWorldTour font-angkor text-3xl text-[#12172c]"
          )}
        >
          2023
        </div>
      </div>
    </>
  );
}
