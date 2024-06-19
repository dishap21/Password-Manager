"use client";
import React, { useState, useEffect } from "react";
import { faHome, faPlus, faEye, faPen, faClipboard } from "@fortawesome/free-solid-svg-icons";
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
        <Spinner/>
      </div>
    );
  }

  // Sign out
  const handleSignOut = async () => {
    try {
      await logout();
      console.log("sign out");
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Password
  const [currentWebsite, setCurrentWebsite] = useState(null);
  const uid = user._id;
  const deletePassword = async () => {
    try{
      const response = await axios.post('api/delete/password', {uid, website: currentWebsite});
      if(response.status === 200){
        handleShowToast('Password Deleted');
        setDialogOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }else{
        handleShowToast('Not Able to delete password.');
      }
    }catch(err){
      console.log('Password not deleted.', err);
    }
  };

  const [showToast, setShowToast] = useState({ isVisible: false, message: ''});
  const handleShowToast = (message) => {
    setShowToast({isVisible: true, message});
    setTimeout(() => {
      setShowToast({isVisible: false, message: ''});
    }, 5000);
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
          const response = await axios.post('api/decrypt', { password });
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
    if(copyIndex === index){
      setCopyIndex(null);
    }else{
      setCopyIndex(index);
      navigator.clipboard.writeText(text);
    }
  }

  // Copy password
  const [copyPassIndex, setCopyPassIndex] = useState(null);
  const copyPass = async (index, text) => {
    if(copyPassIndex === index){
      setCopyPassIndex(null);
    }else{
      setCopyPassIndex(index);
      try{
        const response = await axios.post('api/decrypt', { password: text });
        const decryptedPass = response.data.decryptedPassword;
        navigator.clipboard.writeText(decryptedPass);
      }catch(err){
        console.log(err.message);
      }
    }
  }

  //Edit
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState(null);
  const [tempValues, setTempValues] = useState({ username: "", password: "" });

  // Edit password
  const startEditing = (index, field) => {
    setEditIndex(index);
    setEditField(field);
    setTempValues({
      username: user.passwords[index].username,
      password: sjcl.decrypt(secretKey, user.passwords[index].password)
    });
  };

  const saveEdit = async (index) => {
    const updatedPassword = {
      ...user.passwords[index],
      username: tempValues.username,
      password: sjcl.encrypt(secretKey, tempValues.password)
    };
    // Make API call to save updated password
    // await axios.put('api/editPassword', { id: user.passwords[index]._id, updatedPassword });

    // Reset state
    setEditIndex(null);
    setEditField(null);
    setTempValues({ username: "", password: "" });
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Edit username

  // User info
  const userPhotoURL = firebaseUser?.photoURL || "/images/demo-user.png";
  const userUserName = firebaseUser?.displayName || "user";

  return (
    <div className="container mx-auto">
      {showToast.isVisible && (<Toast message={showToast.message} show={showToast} onClose={() => setShowToast({isVisible: false, message: ''})}/>)}
      <Dialog 
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Delete the Password?" 
        message="Are you sure? This action cannot be undone."
        confirmText="Yes, I'm sure"
        cancelText="No, cancel"
        onConfirm={deletePassword} />
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
        <p className="font-bold m-2 mt-4 text-pretty text-2xl">All Passwords.</p>
        {user.passwords != null && user.passwords.length === 0 ? (
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
            {user.passwords.map((value, index) => (
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
                    <div className="flex justify-between space-x-2">
                      <span>{value.username}</span>
                      <div className="flex justify-start space-x-2">
                        <button>
                          <FontAwesomeIcon icon={faPen} className="text-slate-900 h-4 w-4" />
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faClipboard} onClick={() => {copyText(index, value.username)}} className="text-slate-900 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    {editIndex === index && editField === 'password' ? (
                        <input
                          type="password"
                          name="password"
                          value={tempValues.password}
                          onChange={handleChange}
                          className="border rounded p-1"
                        />
                    ) : (
                      <>
                          {visiblePasswordIndex === index ? (
                            decryptedPasswords[index]
                          ) : (
                            <input type="password" value={value.password} readOnly className="border rounded p-1" />
                          )}
                        </>
                    )}
                    <button onClick={() => togglePasswordVisibility(index, value.password)}>
                      <FontAwesomeIcon icon={faEye} className="text-slate-900 h-4 w-4"/>
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faPen} className="text-slate-900 h-4 w-4" />
                    </button>
                    <button onClick={() => {copyPass(index, value.password)}}>
                      <FontAwesomeIcon icon={faClipboard} className="text-slate-900 h-4 w-4" />
                    </button>
                  </td>
                  <td className="px-3 py-4 space-x-2 text-right lg:px-6 lg:space-x-4">
                    <button
                      onClick={ () => openDialog(value.website) }
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
        )}
      </div>
    </div>
  );
}
