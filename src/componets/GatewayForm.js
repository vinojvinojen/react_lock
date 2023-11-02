import React, { useState } from "react";
import TextField from "./CommonTextField";
import axios from "axios";
import CommonButton from "./CommonButton";
import CommonTextField from "./CommonTextField";

const GatewayForm = ({ setEntries }) => {
  const [macAddress, setMacAddress] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const baseUrl = "http://localhost:6062"; // Replace with your actual base URL
    const url = `${baseUrl}/Gateway/AddGateway?macAddress=${macAddress}&ipAddress=${ipAddress}`;
    const data = {
      macAddress: macAddress,
      ipAddress: ipAddress,
      byDiscovery: false,
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      // Assuming the API call is successful, add the entry to the list
      const newEntry = { macAddress, ipAddress };
      setEntries((entries) => [...entries, newEntry]); // Use the provided setEntries function
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }

    setMacAddress("");
    setIpAddress("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <CommonTextField
          label="MAC ADDRESS : "
          value={macAddress}
          onChange={(e) => setMacAddress(e)} // Pass the event object
        />
        <CommonTextField
          label="IP ADDRESS : "
          value={ipAddress}
          onChange={(e) => setIpAddress(e)} // Pass the event object
        />
        <div style={{ marginTop: "20px" }}>
          <CommonButton
            label="Add Gateway"
            backgroundColor="green"
            width="30vh"
          />
        </div>
      </form>
    </div>
  );
};

export default GatewayForm;
