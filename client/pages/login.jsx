import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import anim from "@/public/41262-code-scanner.json";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { userLogin } from "@/features/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa6";
import withAuth from "@/utils/withAuth";
const Lottie = dynamic(() => import("lottie-react"), {
  suspense: true,
});

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loading } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  // Handles user login submission
  const onSubmit = async (data) => {
    const response = await dispatch(userLogin(data));
    if (response.error) return toast.error(response.payload);
    reset();
    toast.success("Login Successful!");
    router.push("/");
  };

  return (
    <div className="bg-black bg-[url('/background.svg')] bg-cover bg-center w-full h-screen flex justify-center">
      <div className="flex flex-col justify-center text-white w-full max-w-7xl m-12 mb-48">
        <div className="mb-12 ml-[-12px]">
          <div className="ml-[-0px]">
            <Image src="/logo.svg" alt="logo" width={300} height={120} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="relative max-w-[350px] w-full">
            <div className="absolute bg-primary inset-0 blur-xl opacity-20" />
            <div className="relative rounded-md bg-slate-800 p-8 m-4 flex flex-1 border-[1px] border-primary">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 flex-col items-center justify-center"
              >
                <h1 className="text-2xl font-black text-gray-200 mb-8">
                  Sign in
                </h1>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-semibold text-sm">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    className="bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    {...register("email", { required: true })}
                  />
                  {errors?.email && (
                    <span className="text-red-500 text-xs mt-1">
                      *Email is required!
                    </span>
                  )}
                </div>
                <div className="mt-4 form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-semibold text-sm">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    className="bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    {...register("password", { required: true })}
                  />
                  {errors?.password?.type === "required" && (
                    <p className="text-red-500 text-xs mt-1">
                      *Password is required!
                    </p>
                  )}
                </div>
                <div className="mt-8 form-control w-full max-w-xs">
                  <Button
                    key="scan"
                    className="w-full bg-primary rounded-md py-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <FaSpinner className="m-auto animate-spin" size={24} />
                    ) : (
                      <div className="flex">
                        Submit
                        <FiLogIn size={23} className="ml-2" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden md:flex">
            <Lottie
              animationData={anim}
              loop
              autoplay
              style={{ width: 300, height: 300 }}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export const getServerSideProps = withAuth(null, [], true);

export default Login;
