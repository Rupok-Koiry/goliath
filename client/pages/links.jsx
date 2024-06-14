import React from "react";
import SignedInLayout from "../layouts/SignedInLayout";

const Links = (props) => {
  return (
    <div className={"flex flex-col w-full h-full"}>
      <div>Nothing Here Yet</div>
    </div>
  );
};

Links.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};

export default Links;
