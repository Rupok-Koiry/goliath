import React, { PropsWithChildren, useState } from "react";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import TableSkeleton from "./TableSkeleton";
import { deleteUser } from "@/features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa6";

const UsersTable = (props) => {
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
              <TableCell h={true}>ID</TableCell>
              <TableCell h={true}>username</TableCell>
              <TableCell h={true} className={"w-full"}>
                Is Admin
              </TableCell>
              <TableCell h={true}>Delete</TableCell>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user) => (
              <TableRow
                key={user._id}
                user={user}
                loggedUser={props.loggedUser}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;

const TableRow = (props) => {
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: `Do you want to delete the user?`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
      customClass: {
        popup: "bg-white dark:bg-slate-700",
        title: "text-gray-900 dark:text-white",
      },
    });
    if (result.isConfirmed) {
      setDeleting(true);
      await dispatch(deleteUser(userId));
      setDeleting(false);
      toast.success(`User deleted successfully`);
    }
  };

  return (
    <tr className={"pb-4"}>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">{props.user._id}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold">{props.user.username}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <div>
            <div className="text-xs font-bold capitalize">
              {props.user.role}
            </div>
          </div>
        </div>
      </TableCell>
      {props.loggedUser._id !== props.user._id && (
        <TableCell>
          <div className="flex items-center space-x-3">
            <div>
              <Button
                className={"bg-error rounded-md mr-2 py-2 w-20 text-sm"}
                auto
                onClick={() => handleDelete(props.user._id)}
                disabled={deleting}
              >
                {deleting ? (
                  <FaSpinner className="m-auto animate-spin" size={24} />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
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
