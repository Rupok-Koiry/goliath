import React from "react";
import { useCSVDownloader } from "react-papaparse";

const ExportTargetsCSV = (props) => {
  const { CSVDownloader } = useCSVDownloader();
  return (
    <CSVDownloader
      filename={props.fileName}
      data={() =>
        props.targets.map((target) => {
          let parsed = {};
          Object.keys(target).forEach((key) => {
            parsed[key] = JSON.stringify(target[key]);
          });
          return parsed;
        })
      }
    >
      <div
        className={
          "bg-primary text-white rounded-md px-3 py-1.5 hover:opacity-90 transition-all text-sm font-semibold"
        }
      >
        Export to CSV
      </div>
    </CSVDownloader>
  );
};

export default ExportTargetsCSV;
