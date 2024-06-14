import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Paginator = (props) => {
  const changePage = (page) => {
    if (page >= 0 && page < props.total) {
      props.onPageChanged?.(page);
    }
  };
  return (
    <div
      className={
        "m-2 min-w-fit h-12 overflow-hidden flex bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      }
    >
      <PageNum onClick={() => changePage(props.current - 1)}>
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </PageNum>
      <input
        className={
          "input-arrows-none flex flex-1 text-center w-12 bg-transparent"
        }
        value={props.current + 1}
        type={"number"}
        onChange={(e) => changePage(Number(e.target.value) - 1)}
      />
      <PageNum onClick={() => changePage(props.current + 1)}>
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </PageNum>
    </div>
  );
};

export default Paginator;

const PageNum = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`flex-1 relative inline-flex items-center px-4 text-sm font-medium hover:bg-gray-500 dark:hover:text-gray-900 focus:z-20`}
    >
      {props.children}
    </button>
  );
};
