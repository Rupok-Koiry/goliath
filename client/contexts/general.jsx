import React from "react";

const defaultValue = {};

export const GeneralContext = React.createContext(defaultValue);

export const GeneralProvider = ({ children }) => {
  const [topBarTitle, setTopBarTitle] = React.useState("Overview");
  const [extraComp, setExtraComp] = React.useState(null);

  return (
    <GeneralContext.Provider
      value={{
        topBarTitle,
        setTopBarTitle,
        extraComp,
        setExtraComp,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
