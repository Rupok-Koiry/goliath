import React, { useCallback } from "react";
import { Address4 } from "ip-address";
import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";

const FileUpload = (props) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = (event) => {
        const data = event.target?.result;
        if (data) {
          const list = data
            .trim()
            .split("\n")
            .map((i) => i.trim());
          let isAllValid = true;
          list.forEach((ip) => {
            const addr = new Address4(ip);
            if (!addr.isCorrect()) {
              isAllValid = false;
            }
          });

          if (isAllValid) {
            props.onIPs?.(list);
          }
        }
      };

      reader.readAsText(file);
    },
    [props]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dropzone flex-col items-center justify-center border-dashed cursor-pointer"
    >
      <input type="file" accept=".txt" {...getInputProps()} />
      <div className="flex justify-center text-4xl">
        <IoMdCloudUpload color="#9ca3af" />
      </div>
      <p className="font-bold text-[#9ca3af] text-[14px]">
        Drop text file here or click to upload.
      </p>
    </div>
  );
};

export default FileUpload;
