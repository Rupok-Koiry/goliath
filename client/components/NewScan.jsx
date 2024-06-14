import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Input from "./Input";
import FileUpload from "./FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { createScan } from "@/features/scanSlice";
import { FaSpinner } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";

const NewScan = (props) => {
  const [scan_name, setScan_name] = useState("");
  const [scan_targets, setScan_targets] = useState([]);

  const { loading } = useSelector((state) => state.scan);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createScan({ scan_name, scan_targets, user_id: user._id }));
    toast.success("Scan created successfully");
    props.onClosed();
  };
  return (
    <form
      className={"flex flex-col p-4 font-bold"}
      onSubmit={(e) => handleSubmit(e)}
    >
      <h3 className="font-bold text-lg mb-4">New Scan</h3>
      <div className="form-control w-full max-w-xs">
        <div className="flex mb-2">
          <span className={"text-sm"}>Name</span>
        </div>
        <Input onChange={(text) => setScan_name(text)} />
      </div>

      <div className="my-4 form-control w-full max-w-xs">
        <div className="flex flex-col items-start mb-2">
          <span className={"text-sm"}>Addresses</span>
          <span className={"mt-1 mb-2 text-xs text-gray-400 text-left"}>
            Please provide a valid IP address or range. The following are
            accepted: 8.8.8.0-8.8.8.254, 8.8.8.0/24, 8.8.8.8.
          </span>
        </div>
        <Input onChange={(text) => setScan_targets(text.trim().split(","))} />
      </div>

      <div className="my-4 form-control w-full max-w-xs">
        <div className="flex flex-col items-start mb-2">
          <span className={"text-sm"}>Upload file</span>
          <span className={"mt-1 mb-2 text-xs text-gray-400 text-left"}>
            Upload text files only, each ip in a new line
          </span>
        </div>
        <FileUpload onIPs={(list) => setScan_targets(list)} />
      </div>

      <div className={"mt-8 flex justify-end"}>
        <Button
          auto
          light
          className={
            "border-primary text-primary rounded-md mr-2 min-w-[5.5rem]"
          }
          onClick={props.onClosed}
        >
          Cancel
        </Button>
        <Button
          auto
          className={"bg-primary rounded-md min-w-[5.5rem] py-2 text-white"}
          type="submit"
        >
          {loading ? (
            <FaSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
};

export default NewScan;
