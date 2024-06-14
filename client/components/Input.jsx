import React from "react";

const Input = (props) => {
  return (
    <input
      type={props.type}
      onChange={(event) => {
        props.onChange?.(event.target.value);
      }}
      id={props.id}
      className="bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
      required
    />
  );
};

export default Input;
