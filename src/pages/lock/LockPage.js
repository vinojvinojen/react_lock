import React, { useEffect, useState } from 'react'
import ManualLockCmd from './ManualLockCmd';
import RemoteBypassViaKeyFob from './RemoteBypassViaKeyFob';
import SetOutput from './SetOutput';
import RetrieveLogData from './RetrieveLogData';
import RemoteBypassSetOutputViaKeyFob from './RemoteBypassViaKeyFob';


const LockPage = ({ macAddress, LockID }) => {
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
                    onClick={() => handleButtonClick("ManualLockCmd")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "ManualLockCmd" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "ManualLockCmd" ? "Manual Lock Cmd" : "Manual Lock Cmd"}
                </button>
                <button
                    onClick={() => handleButtonClick("RemoteBypassSetOutputViaKeyFob")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "RemoteBypassSetOutputViaKeyFob" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "RemoteBypassSetOutputViaKeyFob" ? "Remote By pass ViaKeyFob" : "Remote By pass ViaKeyFob"}
                </button>
                <button
                    onClick={() => handleButtonClick("SetOutput")}
                    style={{
                        ...buttonStyle,
                        width: "150px",
                        height: "40px",
                        ...(showComponent === "SetOutput" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "SetOutput" ? "Set Out put" : "Set Out put"}
                </button>
                <button
                    onClick={() => handleButtonClick("RetrieveLogData")}
                    style={{
                        ...buttonStyle,
                        width: "150px",
                        height: "40px",
                        ...(showComponent === "RetrieveLogData" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "RetrieveLogData" ? "Retrieve LogData" : "Retrieve LogData"}
                </button>

            </div>



            <div style={componentStyle}>
                 {showComponent === "ManualLockCmd" && <ManualLockCmd macAddress={macAddress} LockID={LockID} />}
                 {showComponent === "RemoteBypassSetOutputViaKeyFob" && <RemoteBypassSetOutputViaKeyFob macAddress={macAddress} LockID={LockID} />}
                 {showComponent === "SetOutput" && <SetOutput macAddress={macAddress} LockID={LockID} />}
                 {showComponent === "RetrieveLogData" && <RetrieveLogData macAddress={macAddress} LockID={LockID} />}


          </div>
        </>
    )
}

export default LockPage
