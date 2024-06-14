import SignedInLayout from "../layouts/SignedInLayout";
import { NextPageWithLayout } from "./_app";
import React, { ReactElement } from "react";
import Link from "next/link";
import Tile from "../components/Tile";
import { BiTargetLock } from "react-icons/bi";

const Settings = () => {
  return (
    <div className={"w-full"}>
      <div className={"flex flex-col lg:flex-row"}>
        <div
          className={
            "flex-1 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4"
          }
        >
          <div className={"min-h-16 bg-primary col-span-2 row-span-1"} />
          <div className={"min-h-16 bg-primary col-span-2 row-span-1"} />
          <div className={"min-h-16 bg-primary col-span-2 row-span-1"} />

          <div className={"min-h-16 bg-primary col-span-1 row-span-1"} />
          <div className={"min-h-16 bg-primary col-span-1 row-span-1"} />
          <div className={"min-h-16 bg-primary col-span-1 row-span-1"} />
          <div className={"min-h-16 bg-primary col-span-1 row-span-1"} />
          <div className={"min-h-16 bg-primary col-span-1 row-span-1"} />
          <div className={"min-h-16 bg-primary col-span-1 row-span-1"} />
        </div>

        <div className={"aspect-square w-full sm:w-36 bg-warning"} />
      </div>
    </div>
  );
};

Settings.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};

export default Settings;

const CounterTile = ({ title, value, colorClass }) => {
  return (
    <Tile size={"sm"}>
      <div
        className={
          "h-24 text-white w-full h-full px-4 py-3 flex flex-col items-start justify-center " +
          colorClass
        }
      >
        <div className="text-md font-bold">{title}</div>
        <div className="text-4xl font-bold">{value}</div>
      </div>
    </Tile>
  );
};

const CounterTileWide= ({ title, value, icon, iconBgColor }) => {
  return (
    <Tile width={"wide"} size={"md"}>
      <div className={"w-full h-24 px-4 py-3 flex items-center"}>
        <div
          className={"bg-[#FE6BBA] rounded-full p-4 m-2"}
          style={{
            backgroundColor: iconBgColor ?? "white",
          }}
        >
          {icon}
        </div>
        <div className={"ml-2 flex flex-col"}>
          <div className="text-2xs font-bold text-primaryFaded">{title}</div>
          <div className="text-3xl font-bold text-text-primary-enabled">
            {value}
          </div>
        </div>
      </div>
    </Tile>
  );
};
