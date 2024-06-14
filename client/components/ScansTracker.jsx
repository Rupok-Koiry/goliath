import React from "react";
import Lottie from "lottie-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import anim from "../public/anim2.json";
import IPScroll from "./IPScroll";

const ScansTracker = (props) => {
  const isDone = props.counter === 0;
  const ips = [
    "3.121.50.156",
    "3.121.50.122",
    "3.121.50.251",
    "3.121.50.224",
    "3.121.50.192",
    "3.121.50.170",
    "3.121.50.64",
    "3.121.50.148",
    "3.121.50.82",
    "3.121.50.9",
    "3.121.50.156",
    "3.121.50.122",
  ];

  return (
    <div
      className={`relative flex-1 mb-4 xl:mb-0 xl:mr-4 flex flex-col max-h-56 justify-center items-center rounded-md overflow-hidden bg-white dark:bg-slate-700`}
    >
      <IPScroll ips={ips} />

      {/* <Lottie animationData={anim} loop autoplay /> */}
      <div
        className={`absolute w-full h-full flex justify-center items-start rounded-md overflow-hidden transition-colors duration-300 bg-gradient-to-tr ${
          isDone ? "from-sky-400 via-cyan-400 to-sky-400" : ""
        }`}
      >
        <div
          className={`font-extrabold text-xs text-slate-800 dark:text-white bg-gray-100 dark:bg-slate-800 rounded-b-md shadow px-4 py-2 mt-0`}
        >
          {isDone ? "No Running Scans" : "Scans Running..."}
        </div>
      </div>
      <div className={"absolute"}>
        <p
          className={
            "p-4 bg-gray-100 dark:bg-slate-800 rounded-full shadow-lg font-bold text-2xl min-w-[4rem] flex justify-center"
          }
        >
          {isDone ? (
            <IoMdCheckmarkCircleOutline
              size={30}
              className="dark:bg-slate-800 bg-white"
            />
          ) : (
            props.counter
          )}
        </p>
      </div>
    </div>
  );
};

export default ScansTracker;
