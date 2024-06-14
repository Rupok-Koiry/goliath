// Importing React and necessary hooks
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

// Importing components and icons
import SignedInLayout from "../../layouts/SignedInLayout";
import CounterTileWide from "../../components/CounterTileWide";
import TargetsTable from "../../components/TargetsTable";
import SearchHeader from "../../components/SearchHeader";
import ExportTargetsCSV from "../../components/ExportTargetsCSV";
import { BiScan, BiTargetLock } from "react-icons/bi";
import { BsPlusSquareDotted } from "react-icons/bs";

// Importing utilities, context, and features
import { GeneralContext } from "../../contexts/general";
import { getScan } from "@/features/scanSlice";
import api from "@/utils/api";
import withAuth from "@/utils/withAuth";

const Scan = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const general = useContext(GeneralContext);

  // State management
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState([]);
  const [stats, setStats] = useState({});
  const [ipFilter, setIpFilter] = useState("");
  const [asnFilter, setAsnFilter] = useState("");
  const [portsFilter, setPortsFilter] = useState([]);
  const [isUpOnly, setIsUpOnly] = useState(false);
  const [isVulnOnly, setIsVulnOnly] = useState(false);
  const [page, setPage] = useState(0);

  // Fetching data on component mount and when dependencies change
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/targets/stats?scanId=${id}&limit=10&offset=${10 * page}`
        );
        const { targets, stats } = response.data.data;
        setTargets(targets);
        setStats(stats);
      } catch (error) {
        console.error("Failed to fetch targets stats:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, page]);

  // Setting up the top bar title and extra components
  useEffect(() => {
    if (!id) return;
    const updateTopBar = async () => {
      const { payload } = await dispatch(getScan(id));
      general.setTopBarTitle?.(payload?.scan_name ?? "");
      general.setExtraComp?.(
        <div className={"flex ml-8"}>
          <ExportTargetsCSV
            fileName={general.topBarTitle ?? "results"}
            targets={targets}
          />
        </div>
      );
    };
    updateTopBar();
  }, [dispatch, id, targets]);

  // Component render
  return (
    <div className={"flex flex-col w-full h-full"}>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4 mb-4">
        {/* Counter tiles */}
        <CounterTileWide
          title="Hosts Count"
          value={stats.total ?? "--"}
          icon={<BiTargetLock size={25} />}
          iconBgColor="rgba(254, 107, 186, 0.2)"
        />
        <CounterTileWide
          title="Hosts Up"
          value={stats.hosts_up ?? "--"}
          icon={<BiScan size={25} />}
          iconBgColor="rgba(58, 54, 219, 0.2)"
        />
        <CounterTileWide
          title="Hosts Down"
          value={stats.hosts_down ?? "--"}
          icon={<BsPlusSquareDotted size={25} />}
          iconBgColor="rgba(0, 144, 255, 0.2)"
        />
        <CounterTileWide
          title="Vulnerable Hosts"
          value={stats.hosts_vuln ?? "--"}
          icon={<BiTargetLock size={25} />}
          iconBgColor="rgba(254,190,107, 0.2)"
        />
      </div>
      {/* Search header */}
      <SearchHeader
        totalTargets={Math.ceil(stats?.total ?? 0)}
        pageSize={10}
        currentOffset={10 * page}
        onPage={setPage}
        onIsUp={setIsUpOnly}
        onIsVulnerable={setIsVulnOnly}
        onIpFilter={(text) => setIpFilter(text.trim())}
        onAsnFilter={setAsnFilter}
        onOpenPorts={setPortsFilter}
      />
      {/* Targets table */}
      <TargetsTable targets={targets} loading={loading} />
    </div>
  );
};

// Layout wrapper for the Scan page
Scan.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};
export const getServerSideProps = withAuth(null, ["user",'admin']);
export default Scan;
