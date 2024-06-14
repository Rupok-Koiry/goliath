import React from "react";

const CounterTileWide = ({ title, value, icon, iconBgColor }) => {
  return (
    <div
      className={`bg-white dark:bg-slate-700 flex rounded-md overflow-hidden col-span-2`}
    >
      <div className={"w-full h-24 px-4 py-3 flex items-center"}>
        <div
          className={"bg-[#FE6BBA] rounded-full p-4 m-2"}
          style={{
            backgroundColor: iconBgColor || "white",
          }}
        >
          {icon}
        </div>
        <div className={"ml-2 flex flex-col"}>
          <div className="text-xs font-bold brightness-75">{title}</div>
          <div className="text-3xl font-bold font-Roboto">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default CounterTileWide;
