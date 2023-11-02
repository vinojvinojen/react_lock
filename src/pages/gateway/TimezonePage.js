import React, { useEffect, useState } from 'react'
import AddTimezone from '../gateway/AddTimezone';
import RemoveTimezone from '../gateway/RemoveTimezone';
import SendCategoryCounterPreset from '../gateway/SendCategoryCounterPreset';
import Lockdown from '../lock/Lockdown';


const TimezonePage = ({ macAddress, LockID }) => {
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
                    onClick={() => handleButtonClick("AddTimezone")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "AddTimezone" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "AddTimezone" ? "Add Timezone" : "Add Timezone"}
                </button>
                <button
                    onClick={() => handleButtonClick("RemoveTimezone")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "RemoveTimezone" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "RemoveTimezone" ? "Remove Timezone" : "Remove Timezone"}
                </button>
                <button
                    onClick={() => handleButtonClick("SendCategoryCounterPreset")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "SendCategoryCounterPreset" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "SendCategoryCounterPreset" ? "SendCategory CounterPreset" : "SendCategory CounterPreset"}
                </button>
                <button
                    onClick={() => handleButtonClick("Lockdown")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "Lockdown" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "Lockdown" ? "Lockdown" : "Lockdown"}
                </button>
            </div>



            <div style={componentStyle}>
            {showComponent === "AddTimezone" && <AddTimezone macAddress={macAddress} LockID={LockID} />}
        {showComponent === "RemoveTimezone" && <RemoveTimezone macAddress={macAddress} LockID={LockID} />}
        {showComponent === "SendCategoryCounterPreset" && <SendCategoryCounterPreset macAddress={macAddress} LockID={LockID} />}
        {showComponent === "Lockdown" && <Lockdown macAddress={macAddress} LockID={LockID} />}

            </div>
        </>
    )
}

export default TimezonePage
