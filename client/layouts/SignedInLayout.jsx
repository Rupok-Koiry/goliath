import React, { useContext, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { GeneralContext } from "../contexts/general";

const SignedInLayout = ({ children }) => {
  const [openMobile, setOpenMobile] = useState(false);
  const general = useContext(GeneralContext);
  return (
    <SideBar openMobile={openMobile} onClose={() => setOpenMobile(false)}>
      <main className={"flex flex-col max-w-7xl m-auto min-h-full"}>
        <TopBar
          title={general.topBarTitle ?? ""}
          extra={general.extraComp}
          onMenu={() => setOpenMobile(!openMobile)}
        />
        <div className={`flex-1 m-6`}>{children}</div>
        <footer className="footer footer-center p-4 text-base-content">
          <div>
            {/*<p>Copyright © 2022 - All right reserved by GOLIAT Ltd</p>*/}
          </div>
        </footer>
      </main>
    </SideBar>
  );
};

export default SignedInLayout;
