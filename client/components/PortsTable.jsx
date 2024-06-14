import React from "react";
import { Modal } from "@nextui-org/react";

const PortsTable = (props) => {
  return (
    <div
      className={
        "bg-white dark:bg-slate-700 p-4 mt-8 rounded-md flex-1 overflow-x-auto overflow-y-hidden"
      }
    >
      <table className="table-fixed whitespace-nowrap ">
        <thead className={"text-primaryFaded text-xs"}>
          <tr>
            <TableCell h={true} className={""}>
              State
            </TableCell>
            <TableCell h={true}>Number</TableCell>
            <TableCell h={true} className={"max-w-full"}>
              Banner
            </TableCell>
            <TableCell h={true}>Service</TableCell>
            <TableCell h={true}>Software</TableCell>
            <TableCell h={true}>CPE</TableCell>
            <TableCell h={true}>Version</TableCell>
            <TableCell h={true}>{"CVE's"}</TableCell>
          </tr>
        </thead>
        <tbody>
          {props.ports.map((port) => (
            <TableRow key={port.port} port={port} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortsTable;

const TableRow = (props) => {
  const [bannerModal, setBannerModal] = React.useState(false);

  return (
    <tr className={"pb-4"}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">{props.port.state}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">{props.port.port}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className={"max-w-md overflow-hidden"}>
        <Modal
          width={"800"}
          open={bannerModal}
          onClose={() => setBannerModal(false)}
          className={
            "m-4 p-4  bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
          }
        >
          <h3 className={"text-2xl font-bold w-full text-start mb-3"}>
            Banner
          </h3>
          <div className={"w-full text-start break-all"}>
            {props.port.banner}
          </div>
        </Modal>
        <div
          onClick={() => setBannerModal(true)}
          className="text-xs opacity-50 cursor-pointer"
        >
          {props.port.banner}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-xs opacity-50">{props.port.service}</div>
      </TableCell>
      <TableCell>
        <div className="text-xs opacity-50">{props.port.software}</div>
      </TableCell>
      <TableCell>
        <div className="text-xs opacity-50">{props.port.cpe}</div>
      </TableCell>
      <TableCell>
        <div className="text-xs opacity-50">{props.port.version}</div>
      </TableCell>
      <TableCell>
        <div className="text-xs flex">
          {props.port.cves?.map((cve) => (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve.CVE}`}
              key={cve.CVE}
              style={{ backgroundColor: colorForCve(cve.score_cve) }}
              className={`flex flex-col items-start px-2 py-2 text-white mx-1 rounded-md`}
            >
              <span className={"mb-1"}>
                ID: <strong>{cve.CVE}</strong>
              </span>
              <span className={"mb-1"}>
                score (cve): <strong>{cve.score_cve}</strong>
              </span>
              <span>
                score (cvss2): <strong>{cve.score_cvss2}</strong>
              </span>
            </a>
          ))}
        </div>
      </TableCell>
    </tr>
  );
};

const TableCell = (props) => {
  const classes = "px-4 pb-4 first:pl-0 text-left";
  return props.h ? (
    <th className={classes + " " + props.className}>{props.children}</th>
  ) : (
    <td className={classes + " " + props.className}>{props.children}</td>
  );
};

const Badge = ({ children }) => {
  return (
    <span className="badge rounded-md badge-outline border-primary text-primary m-1 first:ml-0 last:mr-0">
      {children}
    </span>
  );
};

function colorForCve(cve) {
  if (cve < 0.1) {
    return "rgba(118,182,231,0.7)";
  }
  if (cve < 4) {
    return "rgba(119,234,197,0.73)";
  }
  if (cve < 7) {
    return "rgba(239,194,118,0.71)";
  }
  if (cve < 9) {
    return "rgba(238,162,96,0.73)";
  }
  if (cve <= 10) {
    return "rgba(241,132,128,0.74)";
  }
  return "rgba(182,181,181,0.73)";
}
