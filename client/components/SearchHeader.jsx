import React from "react";
import Paginator from "./Paginator";
import { Checkbox } from "@nextui-org/react";
import InputTags from "./InputTags";

const Header = (props) => {
  return (
    <div
      className={`flex flex-wrap flex-col md:flex-row items-start md:items-center bg-white dark:bg-slate-700 rounded-md overflow-scroll no-scrollbar p-2 mb-4`}
    >
      <input
        type={"text"}
        onChange={(event) => {
          props.onIpFilter?.(event.target.value);
        }}
        className="h-12 m-2 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder="Enter IP"
        required
      />
      <InputTags onTagsChanged={props.onOpenPorts} />
      <input
        type={"text"}
        onChange={(event) => {
          props.onAsnFilter?.(event.target.value);
        }}
        className="min-w-[128px] h-12 m-2 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder="Enter ASN"
        required
      />
      <input
        type={"text"}
        onChange={(event) => {
          props.onFreeText?.(event.target.value);
        }}
        className="min-w-[128px] h-12 m-2 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        placeholder="Free text"
        required
      />
      <div>
        <div className={"h-6 flex mx-4 items-center"}>
          <Checkbox
            onChange={(isSelected) => props.onIsUp?.(isSelected.target.checked)}
            radius="lg"
            className="search-checkbox"
          />

          <div className={"ml-2 text-sm"}>Up</div>
        </div>
        <div className={"h-6 flex mx-4 items-center"}>
          <Checkbox
            onChange={(isSelected) =>
              props.onIsVulnerable?.(isSelected.target.checked)
            }
            className="search-checkbox"
          />
          <div className={"ml-2 text-sm"}>Vulnerable</div>
        </div>
      </div>
      <div className={"flex-1"}></div>
      <span
        className={"h-12 flex items-center mx-4 text-xs  whitespace-nowrap"}
      >
        <span className={"font-bold mx-1"}>{`${props.currentOffset + 1} - ${
          props.currentOffset + props.pageSize <= props.totalTargets
            ? props.currentOffset + props.pageSize
            : props.totalTargets
        }`}</span>{" "}
        out of <span className={"font-bold mx-1"}>{props.totalTargets}</span>
        hosts
      </span>
      <Paginator
        total={Math.ceil(props.totalTargets / props.pageSize)}
        current={Math.ceil(props.currentOffset / 10)}
        onPageChanged={(e) => props.onPage?.(e)}
      />
    </div>
  );
};

export default Header;
