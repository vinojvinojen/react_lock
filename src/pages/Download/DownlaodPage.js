import React, { useEffect, useState } from 'react'
import AddTimezone from '../gateway/AddTimezone';
import DownloadTimezoneData from './DownloadTimezoneData';
import RemoveTimezone from '../gateway/RemoveTimezone';
import SendCategoryCounterPreset from '../gateway/SendCategoryCounterPreset';
import DownloadFormats from './DownloadFormats';
import DownloadFacilityCodes from './DownloadFacilityCodes';
import DownloadCategories from './DownloadCategories';
import DownloadHolidayDate from './DownloadHolidayDate';
import DownloadLockData from './DownloadLockData';

const DownlaodPage = ({ macAddress, LockID }) => {
    const [showComponent, setShowComponent] = useState(null);

    const handleButtonClick = (componentName) => {
        if (showComponent === componentName) {
            // If the same button is clicked, close the component
            // setShowComponent();
        } else {
            // Otherwise, open the corresponding component
            setShowComponent(componentName);
        }
    };

    const buttonStyle = {
        margin: "10px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontSize: "8px",
        width: "150px", // Set the width
        height: "40px",
    };

    const closeButtonStyle = {
        // backgroundColor: "#dc3545",
        backgroundColor: "green"

    };

    const componentStyle = {
        padding: "20px",
        // border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "10px",
        // backgroundColor: "#f5f5f5",
        color: "#333",
        width: "120%",
        display: "flex"
    };

    useEffect(() => {
        setShowComponent("AddTimezone");
    }, [macAddress, LockID]);
    return (
        <>
            <div style={{
                display: "flex",  // Display the buttons in a row
                justifyContent: "space-between",  // Distribute space evenly between buttons
                alignItems: "center",  // Center the buttons vertically
            }}>
                <button
                    onClick={() => handleButtonClick("DownloadFormats")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "DownloadFormats" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "DownloadFormats" ? "Download Formats" : "Download Formats"}
                </button>
                <button
                    onClick={() => handleButtonClick("DownloadFacilityCodes")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "DownloadFacilityCodes" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "DownloadFacilityCodes" ? "Download Facility Codes" : "Download Facility Codes"}
                </button>
                <button
                    onClick={() => handleButtonClick("DownloadCategories")}
                    style={{
                        ...buttonStyle,
                        width: "150px",
                        height: "40px",
                        ...(showComponent === "DownloadCategories" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "DownloadCategories" ? "Download Categories" : "Download Categories"}
                </button>
                <button
                    onClick={() => handleButtonClick("DownloadTimezoneData")}
                    style={{
                        ...buttonStyle,
                        width: "150px",
                        height: "40px",
                        ...(showComponent === "DownloadTimezoneData" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "DownloadTimezoneData" ? "Download Timezone Data" : "Download Timezone Data"}
                </button>
                <button
                    onClick={() => handleButtonClick("DownloadHolidayDate")}
                    style={{
                        ...buttonStyle,
                        width: "150px",
                        height: "40px",
                        ...(showComponent === "DownloadHolidayDate" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "DownloadHolidayDate" ? "Download Holiday Date" : "Download Holiday Date"}
                </button>
                <button
                    onClick={() => handleButtonClick("DownloadLockData")}
                    style={{
                        ...buttonStyle,
                        width: "150px",
                        height: "40px",
                        ...(showComponent === "DownloadHolidayDate" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "DownloadLockData" ? "Download Lock Data" : "Download Lock Data"}
                </button>
            </div>



            <div style={componentStyle}>
                {showComponent === "DownloadFormats" && <DownloadFormats macAddress={macAddress} LockID={LockID} />}
                {showComponent === "DownloadFacilityCodes" && <DownloadFacilityCodes macAddress={macAddress} LockID={LockID} />}
                {showComponent === "DownloadCategories" && <DownloadCategories macAddress={macAddress} LockID={LockID} />}
                {showComponent === "DownloadTimezoneData" && <DownloadTimezoneData macAddress={macAddress} LockID={LockID} />}
                {showComponent === "DownloadHolidayDate" && <DownloadHolidayDate macAddress={macAddress} LockID={LockID} />}
                {showComponent === "DownloadLockData" && <DownloadLockData macAddress={macAddress} LockID={LockID} />}


          </div>
        </>
    )
}

export default DownlaodPage
