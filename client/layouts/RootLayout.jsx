import React from "react";
import SignedInLayout from "./SignedInLayout";

const RootLayout = ({ children }) => {
  return <SignedInLayout>{children}</SignedInLayout>;
};

export default RootLayout;
