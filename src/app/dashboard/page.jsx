"use client";
import React, { useState, useEffect } from "react";
import {
  faHome,
  faPlus,
  faEye,
  faPen,
  faClipboard,
  faSave,
  faTimes,
  faEllipsis,
  faCheck,
  faExclamation,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Comp1 from "./Comp1";
import Comp2 from "./Comp2";
import OverlayForm from "@/components/OverlayForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Dialog from "@/components/Dialog";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import axios from "axios";

export default function dashboard() {
  // User authentication
  const { firebaseUser, user, logout, loading } = UserAuth();

  if (loading) {
    return (
      <div className="mx-auto my-auto h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Sign out
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (err) {
      handleShowToast('Error Signing out, Try again later.')
      console.log(err);
    }
  };

  // Delete Password
  const [currentWebsite, setCurrentWebsite] = useState(null);
  const deletePassword = async () => {
    try {
      const uid = user._id;
      const response = await axios.post("api/delete/password", {
        uid,
        website: currentWebsite,
      });
      if (response.status === 200) {
        handleShowToast("Password Deleted");
        setDialogOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        handleShowToast("Not Able to delete password.");
      }
    } catch (err) {
      console.log("Password not deleted.", err);
    }
  };

  const [showToast, setShowToast] = useState({ isVisible: false, message: "" });
  const handleShowToast = (message) => {
    setShowToast({ isVisible: true, message });
    setTimeout(() => {
      setShowToast({ isVisible: false, message: "" });
    }, 3000);
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

  //Existing Popup model
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = (website) => {
    setCurrentWebsite(website);
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setCurrentWebsite(null);
    setDialogOpen(false);
  };

  // User redirection
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  //show password
  const [visiblePasswordIndex, setVisiblePasswordIndex] = useState(null);
  const [decryptedPasswords, setDecryptedPasswords] = useState({});
  const togglePasswordVisibility = async (index, password) => {
    if (visiblePasswordIndex === index) {
      setVisiblePasswordIndex(null);
    } else {
      setVisiblePasswordIndex(index);
      if (!decryptedPasswords[index]) {
        try {
          const response = await axios.post("api/decrypt", { password });
          setDecryptedPasswords((prev) => ({
            ...prev,
            [index]: response.data.decryptedPassword,
          }));
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  // Copy username
  const [copyIndex, setCopyIndex] = useState(null);
  const copyText = (index, text) => {
    if (copyIndex === index) {
      setCopyIndex(null);
    } else {
      setCopyIndex(index);
      navigator.clipboard.writeText(text);
      handleShowToast("Text copied to clipboard.");
    }
  };

  // Copy password
  const [copyPassIndex, setCopyPassIndex] = useState(null);
  const copyPass = async (index, text) => {
    if (copyPassIndex === index) {
      setCopyPassIndex(null);
    } else {
      setCopyPassIndex(index);
      try {
        const response = await axios.post("api/decrypt", { password: text });
        const decryptedPass = response.data.decryptedPassword;
        navigator.clipboard.writeText(decryptedPass);
        handleShowToast("Text copied to clipboard.");
      } catch (err) {
        handleShowToast("Could not copy. Try Again.");
        console.log(err.message);
      }
    }
  };

  //Edit
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState(null);
  const [tempValues, setTempValues] = useState({ username: "", password: "" });

  const startEditing = (index, field) => {
    setEditIndex(index);
    setEditField(field);
    setTempValues({
      username: user.passwords[index].username,
      password: "",
    });
  };

  const saveEdit = async (index) => {
    const updatedValue = tempValues[editField];
    const apiEndpoint =
      editField === "username" ? "api/edit/name" : "api/edit/password";
    const uid = user._id;
    try {
      const response = await axios.put(apiEndpoint, {
        uid: uid,
        id: user.passwords[index]._id,
        value: updatedValue,
      });
      if (response.status == 200) {
        handleShowToast("Edit Successful.");
      } else {
        handleShowToast("Not able to complete the operation.");
      }
      setEditIndex(null);
      setEditField(null);
      setTempValues({ username: "", password: "" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // delete account
  const deleteAccount = async () => {
    if (!user) return;

    const uid = user._id;
    try {
      const response = await axios.delete("api/delete/account", {
        data: { uid },
      });
      if (response.status == 200) {
        alert("Account deleted successfully.");
        await logout();
        router.push("/");
      } else {
        handleShowToast("Not able to delete your account. Try again.");
      }
    } catch (err) {
      console.log(err);
      handleShowToast("An error occurred. Please try again.");
    }
  };

  // User info
  const userPhotoURL = firebaseUser?.photoURL || "/images/demo-user.png";
  const userUserName = firebaseUser?.displayName || "user";

  //Prediction and password strength
  const getIcon = (prediction) => {
    if (prediction === "2") {
      return (
        <FontAwesomeIcon icon={faCheck} className="text-green-600 h-6 w-6" />
      );
    } else if (prediction === "1") {
      return (
        <FontAwesomeIcon
          icon={faQuestion}
          className="text-yellow-400 h-6 w-6"
        />
      );
    } else if (prediction === "0") {
      return (
        <FontAwesomeIcon
          icon={faExclamation}
          className="text-red-600 h-6 w-6"
        />
      );
    } else {
      return (
        <FontAwesomeIcon icon={faEllipsis} className="text-slate-900 h-6 w-6" />
      );
    }
  };

  const [count, setCount] = useState(0);
  const [predictions, setPredictions] = useState({});
  useEffect(() => {
    const fetchPredictions = async () => {
      if (!user || !user.passwords) {
        setPredictions({});
        setCount(0);
        return;
      }
      try {
        const passwords = user.passwords.map((p) => p.password);

        const response = await axios.post("/api/predict", { passwords });

        if (response.status !== 200) {
          throw new Error("Failed to fetch predictions");
        }

        const data = response.data;
        const newPredictions = {};
        Object.keys(data.predictions).forEach((password) => {
          newPredictions[password] = data.predictions[password];
        });
        setPredictions(newPredictions);

        const weak = Object.values(newPredictions).filter(
          (pred) => pred === "0"
        ).length;
        setCount(weak);
      } catch (error) {
        console.error("Error fetching predictions.");
      }
    };

    fetchPredictions();
  }, [user.passwords]);

  return (
    <div className="container mx-auto">
      {showToast.isVisible && (
        <Toast
          message={showToast.message}
          show={showToast}
          onClose={() => setShowToast({ isVisible: false, message: "" })}
        />
      )}
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Delete the Password?"
        message="Are you sure? This action cannot be undone."
        confirmText="Yes, I'm sure"
        cancelText="No, cancel"
        onConfirm={deletePassword}
      />
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
          <p className="font-semibold text-sm md:text-base pr-1">
            Add Password
          </p>
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
              className="absolute top-full mt-3 right-0 z-10 divide-y rounded-lg shadow w-44 bg-zinc-200 divide-gray-600 overflow-visible"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-black font-semibold">
                <p>{userUserName}</p>
              </div>
              <div className="py-2">
                <button
                  onClick={deleteAccount}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-800 dark:hover:text-white"
                >
                  Delete Account
                </button>
              </div>
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
      {user ? (
        <div className="flex justify-evenly flex-col md:flex-row gap-3">
          <Comp1 />
          <Comp2 cnt={count} />
        </div>
      ) : (
        <div className="flex justify-evenly flex-col md:flex-row gap-3">
          <p className="font-semibold text-stone-800">No valid User.</p>
        </div>
      )}

      <div className="pb-10">
        <p className="font-bold m-2 mt-4 text-pretty text-2xl">
          All Passwords.
        </p>
        {user && user.passwords != null && user.passwords.length === 0 ? (
          <div>
            <p className="pl-2 text-lg">You have no saved passwords.</p>
          </div>
        ) : (
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
                {user &&
                  user.passwords.map((value, index) => (
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
                      <td className="px-6 py-4">
                        {editIndex === index && editField === "username" ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              name="username"
                              value={tempValues.username}
                              onChange={handleChange}
                              className="border rounded p-1"
                            />
                            <button onClick={() => saveEdit(index)}>
                              <FontAwesomeIcon
                                icon={faSave}
                                className="text-green-600 h-5 w-5 ml-2"
                              />
                            </button>
                            <button
                              onClick={() => {
                                setEditIndex(null);
                                setEditField(null);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-red-700 h-6 w-5 ml-2"
                              />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-between space-x-2">
                            <span>{value.username}</span>
                            <div className="flex justify-start space-x-2">
                              <button
                                onClick={() => startEditing(index, "username")}
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  className="text-slate-900 h-4 w-4"
                                />
                              </button>
                              <button
                                onClick={() => copyText(index, value.username)}
                              >
                                <FontAwesomeIcon
                                  icon={faClipboard}
                                  className="text-slate-900 h-4 w-4"
                                />
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {editIndex === index && editField === "password" ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              name="password"
                              value={tempValues.password}
                              onChange={handleChange}
                              className="border rounded p-1"
                            />
                            <button onClick={() => saveEdit(index)}>
                              <FontAwesomeIcon
                                icon={faSave}
                                className="text-green-600 h-5 w-5 ml-2"
                              />
                            </button>
                            <button
                              onClick={() => {
                                setEditIndex(null);
                                setEditField(null);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTimes}
                                className="text-red-700 h-6 w-5 ml-2"
                              />
                            </button>
                          </div>
                        ) : (
                          <>
                            {visiblePasswordIndex === index ? (
                              decryptedPasswords[index]
                            ) : (
                              <input
                                type="password"
                                value={value.password}
                                readOnly
                                className="border rounded p-1"
                              />
                            )}
                            <button
                              onClick={() =>
                                togglePasswordVisibility(index, value.password)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                                className="text-slate-900 h-4 w-4"
                              />
                            </button>
                            <button
                              onClick={() => startEditing(index, "password")}
                            >
                              <FontAwesomeIcon
                                icon={faPen}
                                className="text-slate-900 h-4 w-4"
                              />
                            </button>
                            <button
                              onClick={() => copyPass(index, value.password)}
                            >
                              <FontAwesomeIcon
                                icon={faClipboard}
                                className="text-slate-900 h-4 w-4"
                              />
                            </button>
                            <div key={index} className="flex items-center">
                              {getIcon(predictions[value.password])}
                            </div>
                          </>
                        )}
                      </td>
                      <td className="px-3 py-4 space-x-2 text-right lg:px-6 lg:space-x-4">
                        <button
                          onClick={() => openDialog(value.website)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline md:pr-4"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
