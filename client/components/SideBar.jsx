import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiPlusSquare, FiUsers } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiBarChartSquare } from "react-icons/bi";
import { FaFilePdf } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import NewScan from "./NewScan";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/features/userSlice";
import { ToastContainer } from "react-toastify";

const SideBar = (props) => {
  return (
    <div className={"w-full"}>
      <div
        onClick={() => props.onClose?.()}
        className={`z-[101] fixed lg:hidden top-0 bottom-0 left-0 right-0 bg-black transition-opacity duration-300 ease-in-out ${
          props.openMobile ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`z-[101] fixed w-64 top-0 left-0 bottom-0 duration-300 ${
          !props.openMobile && "-translate-x-full"
        } lg:translate-x-0`}
      >
        <SideBarContent />
      </div>
      <div className={`min-w-0 lg:ml-64`}>{props.children}</div>
      <ToastContainer />
    </div>
  );
};

export default SideBar;

const SideBarContent = () => {
  const [newScanModal, setNewScanModal] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <ul className="h-full w-full p-4 overflow-y-auto bg-white dark:bg-slate-800 transition-colors ease-in-out text-base-content">
      <Link href={"/"} key={"/a"}>
        <div className="flex items-center justify-start mt-6 mb-14 cursor-pointer">
          <Image src="/logo.svg" alt={"logo"} width={170} height={100} />
        </div>
      </Link>
      <Row
        key={"/"}
        text={"Overview"}
        link={"/"}
        icon={<MdOutlineSpaceDashboard size={20} />}
      />
      <Row
        key={"/target"}
        text={"All Targets"}
        link={"/target"}
        icon={<BiBarChartSquare size={20} />}
      />

      <Row
        key={"/reports"}
        text={"Reports"}
        link={"/reports"}
        icon={<FaFilePdf size={20} />}
      />
      {user.role === "admin" && (
        <Row
          key={"/users"}
          text={"Users"}
          link={"/users"}
          icon={<FiUsers size={20} />}
        />
      )}
      {user.role === "admin" && (
        <Button
          key={"scan"}
          className={"mt-8 w-full bg-primary rounded-md py-2 text-white"}
          onPress={onOpen}
        >
          <FiPlusSquare size={23} className={"mr-2"} />
          <div>New Scan</div>
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={
          "py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl new-scan-modal"
        }
        size="sm"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <NewScan onClosed={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </ul>
  );
};

const Row = (props) => {
  const router = useRouter();
  const selected = router.pathname === props.link;

  return (
    <Link href={props.link} className="my-2 block">
      <li
        className={
          "flex w-full my-2 first:mt-0 last:mb-0 cursor-pointer rounded-md overflow-hidden"
        }
      >
        <div
          className={`bg-primary transition-width duration-300 ${
            !selected ? "w-0" : "w-1"
          }`}
        />
        <div
          className={`flex-1 h-12 p-0 pl-4 flex items-center overflow-hidden hover:bg-faded flex text-l transition-colors duration-300 ${
            selected ? "bg-faded text-primary" : "text-primaryFaded"
          }`}
        >
          {props.icon}
          <div className={"ml-2 flex items-center flex-1 self-stretch"}>
            {props.text}
          </div>
        </div>
      </li>
    </Link>
  );
};
