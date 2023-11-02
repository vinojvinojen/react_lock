import React, { useState } from 'react';
import './Topbar.css'; // Ensure you have the correct import path for your CSS

import axios from 'axios';
import { FiSettings } from 'react-icons/fi';
import { IoLogInOutline } from 'react-icons/io5';
import { ApiVersionMethod } from '../API/Api';
import { useSelector } from 'react-redux';

// ...




const Topbar = ({
  handleShowGatewayFormClick,
  toggleGetLastLogMessages,
  isShowOpenGetLastLogMessages,
}) => {
  const [isSettingIcon, setIsSettingIcon] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = useSelector((state) => state.logintoken.tokenValues.token);
  // const [isShowOpenGetLastLogMessages, setIsShowOpenGetLastLogMessages] = useState(false);
  // const [isPopupVisible, setIsPopupVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const settingClicked = () => {
    setIsSettingIcon(!isSettingIcon);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };
//  api
  const handleApiVersion = async () => {
    try {
      const response = await ApiVersionMethod(token);
      if (response.status === 200) {

      }
    } catch (error) {
      console.log(error);
    }


  };

  const openGetLastLogMessages = () => {
    toggleGetLastLogMessages();
  };

  const openPopup = async () => {
    const username = prompt("Enter your username:");
    if (username === null) return; // User canceled

    const oldPassword = prompt("Enter your old password:");
    if (oldPassword === null) return; // User canceled

    const newPassword = prompt("Enter your new password");
    if (newPassword === null) return;

    if (username && oldPassword && newPassword) {
      const apiUrl = `{{base_url}}/System/ChangePassword?userName=${username}&oldPassword=${oldPassword}&newPassword=${newPassword}`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET", // or 'POST' or 'PUT' depending on your API
          headers: {
            "Content-Type": "application/json", // Adjust the content type if needed
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          alert(
            "Password change successful!\nAPI Response: " +
            JSON.stringify(responseData)
          );
        } else {
          alert("Password change failed. Please check your inputs.");
        }
      } catch (error) {
        alert("An error occurred: " + error);
      }
    } else {
      alert("Password change was canceled or some fields were not provided.");
    }
  };


  return (
    <div className="top-bar">
      <div className="topbar-left">
        <div className="operation-dropdown">
          <button onClick={toggleDropdown}>Operations ▼</button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button onClick={handleShowGatewayFormClick}>Add Gateway</button>
              {/* <button onClick={handleDownloadClick}>Downloads</button> */}

            </div>
          )}
        </div>
      </div>
      <div className="topbar-right">
        <div className="icon-container">
          <FiSettings onClick={settingClicked}
            className="icon-button settings-button"
            size={30} // Adjust the size as needed
            style={{ color: 'white', margin: "1vh" }}
          /> {/* Change the color here */}
          {isSettingIcon && (
            <div className="dropdown-setting-content">
              <button onClick={handleApiVersion}>Api Version</button>
              <button onClick={openPopup}>Change Password</button>
              <button onClick={openGetLastLogMessages}>GetLast Log Messages</button>

            </div>
          )}

          <IoLogInOutline onClick={handleLogout}
            className="icon-button settings-button"
            size={30} // Adjust the size as needed
            style={{ color: 'white', margin: "1vh" }}
          />


        </div>
      </div>
      
    </div>
  );
};

export default Topbar;
