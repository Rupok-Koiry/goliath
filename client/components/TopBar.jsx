import React from "react";
import { HiMenu } from "react-icons/hi";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import Dropdown from "./Dropdown";

const TopBar = (props) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center px-6 pt-8 pb-2 w-full">
      <button
        className="mr-4 swap swap-rotate drawer-button lg:hidden"
        onClick={props.onMenu}
      >
        <HiMenu size={40} />
      </button>
      <h2 className={"text-2xl font-bold"}>{props.title}</h2>
      {props.extra}
      <div className={"flex-1"} />
      <div className={"flex items-center"}>
        {/*<div className={"p-4 mt-1"}>*/}
        {/*  <Button auto className={"rounded-md"} icon={<FiSearch size={25} />} />*/}
        {/*</div>*/}
        <Switch
          className={"mr-4 theme-switch"}
          checked={theme === "dark"}
          onChange={(event) => setTheme(theme === "light" ? "dark" : "light")}
          size="md"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? <FiSun color={"black"} /> : <FiMoon color={"black"} />
          }
        />

        <Dropdown />
      </div>
    </div>
  );
};

export default TopBar;
