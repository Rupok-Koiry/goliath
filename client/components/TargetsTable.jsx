import React from "react";
import { Button } from "@nextui-org/react";
import TableSkeleton from "./TableSkeleton";
import Link from "next/link";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

const TargetsTable = (props) => {
  return (
    <div
      className={
        "bg-white dark:bg-slate-700 p-4 rounded-md flex-1 overflow-x-auto overflow-y-hidden"
      }
    >
      {props.loading ? (
        <TableSkeleton />
      ) : (
        <table className="table-auto whitespace-nowrap w-full">
          <thead className={"text-primaryFaded text-xs"}>
            <tr>
              <TableCell h={true} className={""}>
                Is Up
              </TableCell>
              <TableCell h={true}>Address</TableCell>
              <TableCell h={true}>Status</TableCell>
              <TableCell h={true}>Ports</TableCell>
              <TableCell h={true}>Services</TableCell>
              <TableCell h={true}>Scanned At</TableCell>
              <TableCell className={"flex justify-end"} h={true}>
                <div className={"pr-12"}>Details</div>
              </TableCell>
            </tr>
          </thead>
          <tbody>
            {props.targets.map((target) => (
              <TableRow key={target._id} target={target} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TargetsTable;

const TableRow = (props) => {
  const portsNumbers = props.target.vuln?.ports?.map((port) => port.port) ?? [];
  const portList = formatTagList(portsNumbers);
  const servicesList = formatTagList(props.target.services ?? []);

  const timestamp = new Date(props.target.timestamp * 1000).toDateString();

  return (
    <tr className={"pb-4"}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">
              {props.target.is_up ? (
                <BsFillArrowUpCircleFill size={20} color={"#82e1cb"} />
              ) : (
                <BsFillArrowDownCircleFill size={20} color={"#e3bf8e"} />
              )}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">{props.target.ip}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-xs opacity-50">{props.target.status}</div>
      </TableCell>
      <TableCell>
        {portList.list.map((port) => (
          <span
            key={port}
            className="bg-primary text-white text-sm mr-2 px-1.5 py-0.5 rounded"
          >
            {port}
          </span>
        ))}
        {
          <span className="text-primary text-sm mr-2 px-1.5 py-0.5 rounded">
            {portList.suffix}
          </span>
        }
      </TableCell>
      <TableCell>
        {[...new Set(servicesList.list.map((n) => n.name))].map((name) => (
          <Badge key={name}>{name}</Badge>
        ))}
      </TableCell>
      <TableCell className={"text-xs"}>{timestamp}</TableCell>
      <TableCell className={"flex justify-end"}>
        <Button
          className={"bg-primary rounded-md py-2 px-5  text-sm text-white"}
          size="sm"
          auto
        >
          <Link href={`/target/${props.target._id}`}>Explore</Link>
        </Button>
      </TableCell>
    </tr>
  );
};

const formatTagList = (list) => {
  return {
    list: list.slice(0, 2),
    ...(list.length > 2 && { suffix: `+ ${list.length - 2}` }),
  };
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
    <span className="rounded-md border-[1px] border-primary text-primary m-1 px-1.5 py-0.5 first:ml-0 last:mr-0">
      {children}
    </span>
  );
};
