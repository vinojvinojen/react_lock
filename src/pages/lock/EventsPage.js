import React, { useEffect, useState } from 'react'
import AddTimezone from '../gateway/AddTimezone';
import RemoveTimezone from '../gateway/RemoveTimezone';
import SendCategoryCounterPreset from '../gateway/SendCategoryCounterPreset';
import Lockdown from '../lock/Lockdown';
import GetEvents from './GetEvents';
import DeleteEvents from './DeleteEvents';


const EventsPage = ({ macAddress,refreshEventPage }) => {

    useEffect(() => {
        if (refreshEventPage) {
          // Perform any necessary refresh actions here
    
          // Reset the refreshAddLock prop to false
        
        }
      }, [refreshEventPage]);

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
        backgroundColor: "red"

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
      setShowComponent("GetEvents ");
  }, [macAddress]);
    return (
        <>
            <div style={{
                display: "flex",  // Display the buttons in a row
                justifyContent: "space-between",  // Distribute space evenly between buttons
                alignItems: "center",  // Center the buttons vertically
            }}>
                <button
                    onClick={() => handleButtonClick("GetEvents")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "GetEvents" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "GetEvents" ? "GetEvents" : "GetEvents"}
                </button>
                <button
                    onClick={() => handleButtonClick("DeleteEvents")}
                    style={{
                        ...buttonStyle,
                        ...(showComponent === "DeleteEvents" ? closeButtonStyle : {}),
                    }}
                >
                    {showComponent === "DeleteEvents" ? "Delete Events" : "Delete Events"}
                </button>
               
            </div>



            <div style={componentStyle}>
            {showComponent === "GetEvents" && <GetEvents macAddress={macAddress}  />}
        {showComponent === "DeleteEvents" && <DeleteEvents macAddress={macAddress} />}
      

            </div>
        </>
    )
}

export default EventsPage
