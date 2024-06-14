import React, { PropsWithChildren } from "react";


const Tile= (props) => {
  return (
    <div
      className={`flex bg-white rounded-md overflow-hidden  
      ${props.width === "sq" && "aspect-square"} 
      ${props.size === "sm" ? "col-span-1" : "col-span-2"}`}
    >
      {props.children}
    </div>
  );
};

export default Tile;
