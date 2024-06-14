import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

const CounterTile = ({ title, value, colorClass }) => {
  return (
    <div
      className={`flex bg-white dark:bg-slate-700 rounded-md overflow-hidden col-span-1`}
    >
      <div
        className={
          "w-full h-full px-4 py-3 flex flex-col items-center justify-center"
        }
      >
        <div className={colorClass}>
          <AiOutlineClockCircle size={25} />
        </div>
        <div className="mt-2 text-3xl font-bold font-Roboto">{value}</div>
        <div className="mt-1 text-xs font-bold brightness-75">{title}</div>
        {/*<div className="text-xs opacity-70">21% more than last month</div>*/}
      </div>
    </div>
  );
};

export default CounterTile;
