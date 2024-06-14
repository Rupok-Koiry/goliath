import React, { useState, useEffect } from "react";

const InputTags = (props) => {
  const [tags, setTags] = useState([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    props.onTagsChanged?.(tags);
  }, [props, tags]);

  return (
    <div className="m-2 min-h-[3.0rem] flex-1 min-w-[158px] max-w-fit bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus-within:ring-blue-500 focus-within:border-blue-500 block dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus-within:ring-blue-500 dark:focus-within:border-blue-500 flex items-center flex-wrap">
      {tags.map((tag) => (
        <Tag
          key={tag.toString()}
          onRemove={() => {
            setTags(tags.filter((value) => value !== tag));
          }}
        >
          {tag}
        </Tag>
      ))}
      <input
        type="number"
        min={1}
        max={65000}
        value={current}
        placeholder={"Enter Port"}
        className={"w-24 flex-1 bg-transparent m-2.5 outline-none"}
        onChange={(event) => setCurrent(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && current === "") {
            setTags(tags.slice(0, tags.length - 1));
          }
          if (e.key === "Enter") {
            const num = Number(current);
            if (!isNaN(num) && tags.indexOf(num) === -1) {
              setTags([...tags, num]);
              setCurrent("");
            }
          }
        }}
      />
    </div>
  );
};

export default InputTags;

const Tag = (props) => {
  return (
    <span className="m-1.5 h-6 inline-flex items-center py-1 px-1 mr-2 text-sm text-white bg-primary rounded">
      {props.children}
      <button
        type="button"
        className="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-300 dark:hover:text-blue-900"
        aria-label="Remove"
        onClick={props.onRemove}
      >
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Remove badge</span>
      </button>
    </span>
  );
};
