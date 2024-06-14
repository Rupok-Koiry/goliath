import { getAllScans } from "@/features/scanSlice";
import { Button } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const ScanFilter = () => {
  const { loading } = useSelector((state) => state.scan);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = ({ scan_name, scan_targets, status, score }) => {
    const queryParams = {};

    if (scan_name) queryParams.scan_name = scan_name;
    if (scan_targets) queryParams.scan_targets = scan_targets;
    if (status) queryParams.status = status;
    if (score) queryParams["score[lte]"] = score;

    const queryStr = new URLSearchParams(queryParams).toString();
    dispatch(getAllScans(queryStr));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-between items-center bg-white dark:bg-slate-700 rounded-md overflow-hidden p-4 mt-4 "
    >
      <input
        {...register("scan_name")}
        type="search"
        placeholder="Search by Name"
        className="h-12 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
      />

      <input
        {...register("scan_targets")}
        type="search"
        placeholder="Search by Targets"
        className="h-12 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
      />

      <select
        {...register("status")}
        className=" h-12  bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
      >
        <option value="">Select Status</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>

      <select
        {...register("score")}
        className=" h-12 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
      >
        <option value="">Select Risk</option>
        <option value="3.9">Low</option>
        <option value="6.9">Medium</option>
        <option value="8.9">High</option>
        <option value="10">Critical</option>
      </select>
      <Button
        className={
          "col-span-2 md:col-span-1 bg-primary rounded-md py-2  text-md text-white hover:bg-blue-500 transition ease-in duration-300"
        }
        auto
        size="md"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <FaSpinner className="m-auto animate-spin" size={24} />
        ) : (
          "Apply Filter"
        )}
      </Button>
    </form>
  );
};

export default ScanFilter;
