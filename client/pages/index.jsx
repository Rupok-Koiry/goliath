import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiTargetLock, BiScan } from "react-icons/bi";
import { BsPlusSquareDotted } from "react-icons/bs";

import ScansTable from "../components/ScansTable";
import RootLayout from "../layouts/RootLayout";
import CounterTile from "../components/CounterTile";
import CounterTileWide from "../components/CounterTileWide";
import ScansTracker from "../components/ScansTracker";

import { GeneralContext } from "../contexts/general";

import { getAllScans } from "@/features/scanSlice";
import { getAllMetadata } from "@/features/metadataSlice";
import withAuth from "@/utils/withAuth";
import ScanFilter from "@/components/ScanFilter";

const Home = () => {
  const dispatch = useDispatch();
  const { scans, loading } = useSelector((state) => state.scan);
  const { allMetadata } = useSelector((state) => state.metadata);
  const metadata = allMetadata[0] || {};
  const general = useContext(GeneralContext);

  const completed = scans.filter((scan) => scan.status === "completed").length;
  const uncompleted = scans.filter(
    (scan) => scan.status !== "completed"
  ).length;

  useEffect(() => {
    general.setTopBarTitle?.("Overview");
    general.setExtraComp?.(null);
  }, [general]);

  useEffect(() => {
    dispatch(getAllScans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllMetadata("sort=-insert_time&limit=1"));
  }, [dispatch]);

  const filterByScore = (min, max) =>
    scans.filter(
      (scan) => (scan?.score ?? 0) >= min && (scan?.score ?? 0) <= max
    );

  return (
    <div className="flex flex-col items-stretch w-full">
      <div className="flex flex-col xl:flex-row">
        <ScansTracker counter={uncompleted} />
        <div className="flex-[5] flex flex-col">
          <div className="col-span-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4 grid-flow-dense mb-4">
            {/* Counter Tiles Wide */}
            <CounterTileWide
              title="Total"
              value={scans.length ?? "Unknown"}
              icon={<BiTargetLock size={25} color="rgba(254, 107, 186, 1)" />}
              iconBgColor="rgba(254, 107, 186, 0.2)"
            />
            <CounterTileWide
              title="Scanned"
              value={completed ?? "Unknown"}
              icon={<BiScan size={25} color="rgba(58, 54, 219, 1)" />}
              iconBgColor="rgba(58, 54, 219, 0.2)"
            />
            <CounterTileWide
              title="New Unscanned"
              value={uncompleted ?? "Unknown"}
              icon={
                <BsPlusSquareDotted size={25} color="rgba(0, 144, 255, 1)" />
              }
              iconBgColor="rgba(0, 144, 255, 0.2)"
            />
            <CounterTileWide
              title="Vulnerable Hosts"
              value={metadata.vulnerable_hosts ?? "--"}
              icon={<BiTargetLock size={25} color="rgb(254,190,107)" />}
              iconBgColor="rgba(254,190,107, 0.2)"
            />
          </div>
          <div className="col-span-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-flow-dense">
            {/* Counter Tiles */}
            <CounterTile
              title={"CVSS - Score"}
              value={`${(
                ((metadata.high_score || 0) +
                  (metadata.medium_score || 0) +
                  (metadata.low_score || 0)) /
                3
              ).toFixed(2)}`}
              colorClass={"text-dash-score-end"}
            />
            <CounterTile
              title="CVSS - Critical"
              value={`${filterByScore(9, 10).length}`}
              colorClass="text-dash-critical-end"
            />
            <CounterTile
              title="CVSS - High"
              value={metadata.high_score ?? 0}
              colorClass="text-dash-high-end"
            />
            <CounterTile
              title="CVSS - Medium"
              value={metadata.medium_score ?? 0}
              colorClass="text-dash-medium-end"
            />
            <CounterTile
              title="CVSS - Low"
              value={metadata.low_score ?? 0}
              colorClass="text-dash-low-end"
            />
          </div>
        </div>
      </div>
      <ScanFilter />
      <ScansTable scans={scans} loading={loading} />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
export const getServerSideProps = withAuth(null, ["admin", "user"]);

export default Home;
