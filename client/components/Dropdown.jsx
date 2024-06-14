import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { userLogout } from "@/features/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle the logout procedure
  const handleSignOut = async () => {
    await dispatch(userLogout());
    router.push("/login");
    toast.success("Logged out successfully!");
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-200">
            <svg
              className="h-full w-full text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-4 py-2 text-sm font-bold w-full flex"
                  )}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
            {/*<Menu.Item>*/}
            {/*  {({ active }) => (*/}
            {/*    <a*/}
            {/*      href="#"*/}
            {/*      className={classNames(*/}
            {/*        active ? "bg-gray-100 text-gray-900" : "text-gray-700",*/}
            {/*        "block px-4 py-2 text-sm"*/}
            {/*      )}*/}
            {/*    >*/}
            {/*      Support*/}
            {/*    </a>*/}
            {/*  )}*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item>*/}
            {/*  {({ active }) => (*/}
            {/*    <a*/}
            {/*      href="#"*/}
            {/*      className={classNames(*/}
            {/*        active ? "bg-gray-100 text-gray-900" : "text-gray-700",*/}
            {/*        "block px-4 py-2 text-sm"*/}
            {/*      )}*/}
            {/*    >*/}
            {/*      License*/}
            {/*    </a>*/}
            {/*  )}*/}
            {/*</Menu.Item>*/}
            {/*<form method="POST" action="#">*/}
            {/*  <Menu.Item>*/}
            {/*    {({ active }) => (*/}
            {/*      <button*/}
            {/*        type="submit"*/}
            {/*        className={classNames(*/}
            {/*          active ? "bg-gray-100 text-gray-900" : "text-gray-700",*/}
            {/*          "block w-full px-4 py-2 text-left text-sm"*/}
            {/*        )}*/}
            {/*      >*/}
            {/*        Sign out*/}
            {/*      </button>*/}
            {/*    )}*/}
            {/*  </Menu.Item>*/}
            {/*</form>*/}
          </div>
        </Menu.Items>
      </Transition>
      <ToastContainer />
    </Menu>
  );
};

export default Dropdown;
