import React from "react";
import { userLogout } from "@/features/userSlice";
import SignedInLayout from "@/layouts/SignedInLayout";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Loot = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle the logout procedure
  const handleSignOut = async () => {
    await dispatch(userLogout());
    router.push("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <div className={"flex flex-col w-full h-full"}>
      <div className={"text-text-primary-enabled"}>Nothing Here Yet</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

Loot.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};

export default Loot;
