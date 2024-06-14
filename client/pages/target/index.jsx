// React core imports
import React, { useState, useEffect, useContext } from "react";

// Component imports
import SignedInLayout from "../../layouts/SignedInLayout";
import CounterTileWide from "../../components/CounterTileWide";
import TargetsTable from "../../components/TargetsTable";
import SearchHeader from "../../components/SearchHeader";

// Icon imports
import { BiScan, BiTargetLock } from "react-icons/bi";
import { BsPlusSquareDotted } from "react-icons/bs";

// Context and utility imports
import { GeneralContext } from "../../contexts/general";
import api from "@/utils/api";
import withAuth from "@/utils/withAuth";

const Targets = () => {
  // State management using React hooks
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState([]);
  const [stats, setStats] = useState({});
  const [ipFilter, setIpFilter] = useState("");
  const [portsFilter, setPortsFilter] = useState([]);
  const [asnFilter, setAsnFilter] = useState("");
  const [freeText, setFreeText] = useState("");
  const [isVulnOnly, setIsVulnOnly] = useState(false);
  const [isUpOnly, setIsUpOnly] = useState(false);
  const [page, setPage] = useState(0);

  // Context for general app settings
  const general = useContext(GeneralContext);

  // Side effect for setting up the top bar title
  useEffect(() => {
    general.setTopBarTitle?.("Targets");
    general.setExtraComp?.(null);
  }, [general]);

  // Side effect for fetching data based on filters and pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/targets/stats?limit=10&offset=${10 * page}`
        );
        const { targets, stats } = response.data.data;
        setTargets(targets);
        setStats(stats);
      } catch (error) {
        console.error("Failed to fetch targets stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // Component return structure
  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4 mb-4">
        {/* Counter tiles for various statistics */}
        <CounterTileWide
          title="Hosts Count"
          value={stats?.total ?? "--"}
          icon={<BiTargetLock size={25} />}
          iconBgColor="rgba(254, 107, 186, 0.2)"
        />
        <CounterTileWide
          title="Hosts Up"
          value={stats?.hosts_up ?? "--"}
          icon={<BiScan size={25} />}
          iconBgColor="rgba(58, 54, 219, 0.2)"
        />
        <CounterTileWide
          title="Hosts Down"
          value={stats?.hosts_down ?? "--"}
          icon={<BsPlusSquareDotted size={25} />}
          iconBgColor="rgba(0, 144, 255, 0.2)"
        />
        <CounterTileWide
          title="Vulnerable Hosts"
          value={stats?.hosts_vuln ?? "--"}
          icon={<BiTargetLock size={25} />}
          iconBgColor="rgba(254,190,107, 0.2)"
        />
      </div>
      {/* Search header with filters and pagination */}
      <SearchHeader
        totalTargets={stats?.total ?? 0}
        pageSize={10}
        currentOffset={10 * page}
        onPage={setPage}
        onIsUp={setIsUpOnly}
        onIsVulnerable={setIsVulnOnly}
        onIpFilter={setIpFilter}
        onOpenPorts={setPortsFilter}
        onAsnFilter={setAsnFilter}
        onFreeText={setFreeText}
      />
      {/* Table of targets */}
      <TargetsTable targets={targets} loading={loading} />
    </div>
  );
};

// Layout wrapper for the Targets page
Targets.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};
export const getServerSideProps = withAuth(null, ["user",'admin']);

export default Targets;
