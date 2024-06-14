import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";

const NewUserHeader = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await props.onCreate(data.email, data.password, data.role);
    setLoading(false);
    if (response.error) return toast.error(response.payload);
    toast.success("User created successfully!");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-baseline bg-white dark:bg-slate-700 rounded-md overflow-scroll no-scrollbar p-2 mb-4"
    >
      <div className="m-2">
        <input
          {...register("email", {
            required: "*Email is required!",
          })}
          className="h-12 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="m-2">
        <input
          {...register("password", {
            required: "*Password is required!",
            minLength: {
              value: 5,
              message: "*Minimum 5 characters for password!!",
            },
          })}
          type="password"
          className=" h-12 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <select
        {...register("role")}
        className="min-w-[185px] h-12 m-2 bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <Button
        className="bg-primary rounded-md mr-2 ml-auto py-2 w-20 text-sm"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <FaSpinner className="m-auto animate-spin" size={24} />
        ) : (
          "Create"
        )}
      </Button>
    </form>
  );
};

export default NewUserHeader;
