import SignedInLayout from "../layouts/SignedInLayout";
import React, { useEffect, useState } from "react";
import { GeneralContext } from "../contexts/general";
import ScansTable from "@/components/ScansTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllScans } from "@/features/scanSlice";
import api from "@/utils/api";
import { saveAs } from "file-saver";
import ScanFilter from "@/components/ScanFilter";
import { Button, Checkbox } from "@nextui-org/react";
import { FaSpinner } from "react-icons/fa6";

const Files = () => {
  const [selectedScans, setSelectedScans] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const { scans, loading } = useSelector((state) => state.scan);
  const dispatch = useDispatch();

  const general = React.useContext(GeneralContext);
  React.useEffect(() => {
    general.setTopBarTitle?.("Reports");
    general.setExtraComp?.(null);
  }, []);
  useEffect(() => {
    dispatch(getAllScans());
  }, [dispatch]);
  const selectPdf = async (event, id) => {
    //Implement the logic add or remove the id from the selectedScans array
    if (event.target.checked) {
      setSelectedScans([...selectedScans, id]);
    } else {
      setSelectedScans(selectedScans.filter((scan) => scan !== id));
    }
  };
  const createPdf = async () => {
    try {
      setPdfLoading(true);
      const response = await api.post(
        `/scans/generate-pdf`,
        {
          scanIds: selectedScans,
        },
        {
          responseType: "blob",
        }
      );
      saveAs(response.data, "reports.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setPdfLoading(false);
    }
  };
  return (
    <div className={"flex flex-col w-full h-full"}>
      <ScanFilter />

      <ScansTable scans={scans} loading={loading} selectPdf={selectPdf} />
      <Button
        className={"bg-primary rounded-md p-2 text-md text-white"}
        auto
        onClick={createPdf}
        disabled={selectedScans.length === 0 || pdfLoading}
      >
        {pdfLoading ? (
          <FaSpinner className="m-auto animate-spin" size={24} />
        ) : (
          "Generate pdf"
        )}
      </Button>
    </div>
  );
};

Files.getLayout = function getLayout(page) {
  return <SignedInLayout>{page}</SignedInLayout>;
};

export default Files;
