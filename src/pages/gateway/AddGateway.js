import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { AddGatewayPost } from '../../API/Api';
import CommonButton from '../../componets/CommonButton';
import CommonTextField from '../../componets/CommonTextField';
import LoadingSpinner from '../../componets/LoadingSpinner ';



const AddGateway = () => {

  const [loading, setLoading] = useState(false);

  const [macAddress, setMacAddress] = useState("")
  const [ipAddress, setIpAddress] = useState("")


  const token = useSelector((state) => state.logintoken.tokenValues.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {
      // Call your common function
      setLoading(true); // Show loading screen

      const response = await AddGatewayPost(macAddress, ipAddress, token);

      if (response.status === 200) {
        // If the API call is successful, add the entry to the list
        if (Array.isArray(response.data) && response.data[0] === true) {
          const alertMessage = response.data[1];
          window.alert(alertMessage);
          // reloadData();
          localStorage.setItem('macAddress', macAddress);
        } else {
          window.alert(response.data);
        }
        console.log(response.data);
        window.alert(response.data)
      } else {
        // Handle API error here
        console.error('API Error:', response.data);
      }

      // const gatewayData = {
      //   macAddress,
      //   ipAddress,
      //   Locks: [],
      // };

      // Retrieve the existing gateway data from local storage
      // let existingGatewayData = JSON.parse(localStorage.getItem('gatewayData')) || [];

      // Add the new gateway data to the existing array
      // existingGatewayData.push(gatewayData);
      // localStorage.setItem('gatewayData', JSON.stringify(existingGatewayData));
      // reloadData()
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);

    } finally {
      setLoading(false); // Hide loading screen
      // Clear the form inputs
      setMacAddress("");
      setIpAddress("");
    }

  };



  return (
    <div >
      {loading && (
        <LoadingSpinner />

      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <CommonTextField
          label="MAC ADDRESS : "
          value={macAddress}
          onChange={setMacAddress} // Pass the event object
        />
        <CommonTextField
          label="IP ADDRESS : "
          value={ipAddress}
          onChange={setIpAddress} // Pass the event object
        />
        <div style={{ marginTop: "20px" }}>
          <CommonButton label="Add Gateway" backgroundColor="green" width="30vh" />

        </div>
      </form>
      {/* {loading && (
        <LoadingSpinner/>
        
      )} */}


    </div>
  );
}

export default AddGateway;
