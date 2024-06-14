import React from "react";
import { Button, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import TableSkeleton from "./TableSkeleton";
import { LuCheckCircle } from "react-icons/lu";
import { FaCircleXmark } from "react-icons/fa6";
import { TbProgressBolt } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { updateScan } from "@/features/scanSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ScansTable = (props) => {
  const dispatch = useDispatch();
  const rescan = async (id) => {
    dispatch(
      updateScan({ id, scanData: { status: "in_progress", rescan: true } })
    );
    toast.success("Rescan started successfully!");
  };
  return (
    <div
      className={
        "bg-white dark:bg-slate-700 p-4 mt-4 rounded-md flex-1 overflow-x-auto overflow-y-hidden"
      }
    >
      {props.loading ? (
        <TableSkeleton />
      ) : (
        <table className="table-fixed whitespace-nowrap ">
          <thead className={"text-primaryFaded text-xs"}>
            <tr>
              <TableCell h={true} className={""}>
                Name
              </TableCell>
              <TableCell h={true} className={"w-full"}>
                Target
              </TableCell>
              <TableCell h={true}>Status</TableCell>
              <TableCell h={true}>Risk</TableCell>
              <TableCell h={true}>Details</TableCell>
            </tr>
          </thead>
          <tbody>
            {props.scans.map((scan) => (
              <TableRow
                key={scan._id}
                scan={scan}
                rescan={rescan}
                selectPdf={props.selectPdf}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScansTable;

function getColorClass(score) {
  if (score < 0) return "dark:text-white text-[#9f9f9f]"; // Assuming 'None' is gray
  if (score <= 3.9) return "text-[#60ffcc]"; // Low is green
  if (score <= 6.9) return "text-[#ffc059]"; // Medium is yellow
  if (score <= 8.9) return "text-[#ffa957]"; // High is orange
  if (score <= 10.0) return "text-[#ff7672]"; // Critical is red
  return "dark:text-white text-[#9f9f9f]"; // Default color if score is out of range
}

const TableRow = (props) => {
  const targets = props.scan.scan_targets;
  return (
    <tr className={"pb-4"}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">{props.scan.scan_name}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">
              {targets.slice(0, 2).join(", ") +
                (targets.length > 3 ? ` (+${targets.length - 2})` : "")}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-xs font-bol">
          {props.scan.status === "completed" && (
            <LuCheckCircle
              className="dark:text-white text-[#1e293b]"
              size={20}
            />
          )}

          {props.scan.status === "in_progress" && (
            <FiSettings className="dark:text-white text-[#1e293b]" size={20} />
          )}
          {props.scan.status === "failed" && (
            <FaCircleXmark
              className="dark:text-white text-[#1e293b]"
              size={20}
            />
          )}
        </div>
      </TableCell>
      <TableCell className={`${getColorClass(props.scan.score)} font-bold`}>
        {props.scan.score}
      </TableCell>
      {props.selectPdf ? (
        <TableCell>
          <div className="flex gap-2 items-center">
            <Checkbox
              onChange={(event) => props.selectPdf(event, props.scan._id)}
              className="search-checkbox"
            >
              {" "}
            </Checkbox>
          </div>
        </TableCell>
      ) : (
        <TableCell>
          <div className="flex gap-2 items-center">
            <Button
              className={"bg-primary rounded-md py-2 w-16 text-xs text-white"}
              auto
              size="xs"
            >
              <Link href={`/scan/${props.scan._id}`}>Explore</Link>
            </Button>

            {props.scan.status === "in_progress" ? (
              <Button
                rounded-md
                mr-2
                py-2
                w-20
                text-sm
                className={"bg-error rounded-md mr-2 py-2 w-16 text-xs"}
                auto
                size="xs"
              >
                Stop
              </Button>
            ) : (
              <Button
                className={"bg-info rounded-md py-2 w-16 text-xs text-white"}
                auto
                size="xs"
                onClick={() => props.rescan(props.scan._id)}
              >
                Rescan
              </Button>
            )}
          </div>
        </TableCell>
      )}
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
