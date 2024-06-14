import SignedInLayout from "../layouts/SignedInLayout";
import React, { useEffect } from "react";
import { GeneralContext } from "../contexts/general";
import UsersTable from "../components/UsersTable";
import NewUserHeader from "../components/NewUserHeader";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getAllUsers, getMe } from "@/features/userSlice";
import withAuth from "@/utils/withAuth";

const Users = () => {
  const general = React.useContext(GeneralContext);
  React.useEffect(() => {
    general.setTopBarTitle?.("Users");
    general.setExtraComp?.(null);
  }, []);
  const dispatch = useDispatch();
  const { loading, users, user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getMe());
  }, []);

  const onCreate = (email, password, role) =>
    dispatch(createUser({ email, password, role }));

  return (
    <div className={"flex flex-col w-full h-full"}>
      <NewUserHeader loading={loading} onCreate={onCreate} />
      <UsersTable users={users} loggedUser={user} />
    </div>
  );
};

Users.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};

export const getServerSideProps = withAuth(null, ["admin"]);
export default Users;
