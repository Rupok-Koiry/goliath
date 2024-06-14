// React and Next.js imports
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

// Redux imports for state management
import { useDispatch, useSelector } from "react-redux";
import { getTarget } from "@/features/targetSlice";

// Component and icon imports
import SignedInLayout from "../../layouts/SignedInLayout";
import CounterTileWide from "../../components/CounterTileWide";
import PortsTable from "../../components/PortsTable";
import Whois from "../../components/Whois";
import { BiScan, BiTargetLock } from "react-icons/bi";
import { BsPlusSquareDotted } from "react-icons/bs";
import loadable from "@loadable/component";
const ReactJson = loadable(() => import("react-json-view"));

// JSON view component and styles for Web Scan section
import { JsonView, darkStyles, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

// Context import for global state
import { GeneralContext } from "../../contexts/general";
import withAuth from "@/utils/withAuth";

const Target = () => {
  const { setTopBarTitle, setExtraComp } = useContext(GeneralContext);
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  // Redux state selector
  const { target } = useSelector((state) => state.target);

  // Fetch target data on id change
  useEffect(() => {
    if (id) {
      dispatch(getTarget(id));
    }
  }, [id, dispatch]);

  // Update top bar title and extra components on target change
  useEffect(() => {
    setTopBarTitle?.(
      (target?.ip ?? "") + (target?.hostname ? ` (${target?.hostname})` : "")
    );
    setExtraComp?.(null);
  }, [target, setTopBarTitle, setExtraComp]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="col-span-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4 grid-flow-dense mb-4">
        {/* Counter tiles for various port states */}
        <CounterTileWide
          title="Ports Count"
          value={target?.vuln?.ports.length ?? "--"}
          icon={<BiTargetLock size={25} />}
          iconBgColor="rgba(254, 107, 186, 0.2)"
        />
        <CounterTileWide
          title="Ports Open"
          value={
            target?.vuln?.ports.filter((port) => port.state === "open")
              .length ?? "--"
          }
          icon={<BiScan size={25} />}
          iconBgColor="rgba(58, 54, 219, 0.2)"
        />
        <CounterTileWide
          title="Ports Closed"
          value={
            target?.vuln?.ports.filter((port) => port.state === "closed")
              .length ?? "--"
          }
          icon={<BsPlusSquareDotted size={25} />}
          iconBgColor="rgba(0, 144, 255, 0.2)"
        />
        <CounterTileWide
          title="Vulnerable Ports"
          value={target?.vuln?.ports.filter((port) => port.vuln).length ?? "--"}
          icon={<BiTargetLock size={25} />}
          iconBgColor="rgba(254,190,107, 0.2)"
        />
      </div>
      <PortsTable ports={target?.vuln?.ports ?? []} />
      <Whois whois={target?.whois ?? {}} />
      <h3 className="text-2xl font-bold mt-12">Screenshots</h3>
      {target?.screenshots?.map((screenshot) => (
        <div key={screenshot.port} className="mt-6">
          {screenshot.port}
          <img
            className="w-4/5"
            src={`data:image/png;base64,${screenshot.screenshot}`}
            alt={`Screenshot for port ${screenshot.port}`}
          />
        </div>
      ))}
      <div className="mt-24">
        <h3 className="text-2xl font-bold mb-2">Web Scan</h3>

        <ReactJson
          src={target?.web_scan ?? {}}
          theme={theme === "dark" ? "flat" : "bright:inverted"}
          style={{
            fontSize: "1.2rem",
          }}
        />
      </div>
    </div>
  );
};

Target.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};
export const getServerSideProps = withAuth(null, ["user", "admin"]);

export default Target;
