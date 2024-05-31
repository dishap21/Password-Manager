"use client";
import React, { useState } from "react";
import { faHome, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import Comp1 from "./Comp1";
import Comp2 from "./Comp2";
import OverlayForm from "@/components/OverlayForm";
import { password } from "@/utils/passwrodsDemo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PassDrawer from "@/components/PassDrawer";
import Dialog from "@/components/Dialog";

export default function dashboard() {

  // User authentication
  const { user, logout } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logout();
      console.log("sign out");
    } catch (err) {
      console.log(err);
    }
  };

  // Drop down avatar
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //Password card visibility
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };
  const closeForm = () => {
    setFormVisible(false);
  };

  //Existing Password drawer
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  //Existing Popup model
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const handleConfirm = () => {
    console.log("Confirmed");
    closeDialog();
  };

  // User redirection
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  // User info
  const userPhotoURL = user?.photoURL || "/images/demo-user.png";
  const userUserName = user?.displayName || "user";

  return (
    <div className="container mx-auto">
      <PassDrawer isVisible={isDrawerVisible} toggleDrawer={toggleDrawer} />
      <Dialog 
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Delete the Password?" 
        message="Are you sure? This action cannot be undone."
        confirmText="Yes, I'm sure"
        cancelText="No, cancel"
        onConfirm={handleConfirm} />
      <div className="flex gap-1 pt-1 m-2 md:pt-0">
        <FontAwesomeIcon
          icon={faHome}
          className="h-7 w-7 mb-4 md:h-9 md:w-9 p-1"
        />
        <p className="font-semibold text-3xl md:text-5xl">Dashboard</p>
      </div>
      <div className="flex justify-end gap-4 m-2">
      <div
        className="flex gap-2 p-1 bg-gradient-to-r from-blue-400 to-blue-500 cursor-pointer items-center"
        onClick={toggleFormVisibility}
      >
        <FontAwesomeIcon icon={faPlus} className="h-4 w-4 md:h-6 md:w-6" />
        <p className="font-semibold text-sm md:text-base pr-1">Add Password</p>
      </div>
      <div className="relative">
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-300"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <Image
            src={userPhotoURL}
            alt="User Avatar"
            width={600}
            height={600}
            className="w-8 h-8 rounded-full"
          />
        </button>
        {dropdownVisible && (
          <div
            id="dropdownAvatar"
            className="absolute top-full mt-3 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-zinc-200 dark:divide-gray-600 overflow-visible"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-black font-semibold">
              <p>{userUserName}</p>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-800"
              aria-labelledby="dropdownUserAvatarButton"
            >
              <li>
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Delete Account
                </a>
              </li>
            </ul>
            <div className="py-2">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-800 dark:hover:text-white"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
      <OverlayForm isVisible={isFormVisible} onClose={closeForm} />
      <div className="flex justify-evenly flex-col md:flex-row gap-3">
        <Comp1 />
        <Comp2 />
      </div>
      <div className="pb-10">
        <p className="font-bold m-2 mt-4 text-pretty text-xl">All Passwords.</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full m-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-60000">
            <thead className="text-xs text-gray-700 uppercase bg-gray-150 dark:bg-gray-300 dark:text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Website
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit and Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {password.map((value, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {value.website}
                  </th>
                  <td className="px-6 py-4">{value.username}</td>
                  <td className="px-6 py-4 flex gap-2">
                    {value.password}
                    <FontAwesomeIcon icon={faEye} className="h-4 w-4 pt-0.5" />
                  </td>
                  <td className="px-3 py-4 space-x-2 text-right lg:px-6 lg:space-x-4">
                    <button
                      onClick={ toggleDrawer }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={ openDialog }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
