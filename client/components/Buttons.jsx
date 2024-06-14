import React from "react";
import { Button } from "@nextui-org/react";

export const Primary = (props) => {
  return <Button css={{ borderRadius: 8 }}>{props.children}</Button>;
};
