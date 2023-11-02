import React, { useState } from 'react';

import axios from 'axios';
import CommonTextField from '../../componets/CommonTextField';
import CommonButton from '../../componets/CommonButton';

const ChangeGatewayHostServerIp = ({macAddress}) => {
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem("token");
//     const baseUrl = 'http://localhost:6062'; // Replace with your actual base URL
//     const url = `${baseUrl}/Gateway/ReplaceGateway?macAddress=${macAddress}&newMacAddress=${newMacAddress}&newIpAddress=${newIpAddress}`;
//     const data = {
//         macAddress: macAddress,
//         newMacAddress: newMacAddress,
//         newIpAddress: newIpAddress
//       };
//     try {
//       const response = await axios.post(url, null, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Authorization": `Bearer ${token}`,
//         },
//       });
  
//       if (response.status === 200) {
//         console.log('Gateway replaced successfully:', response.data);
//         updateEntries({
//           macAddress: newMacAddress,
//           ipAddress: newIpAddress,
//         });
//       } else {
//         console.error('API Error:', response.data);
//       }
      
//     } catch (error) {
//       console.error('Error:', error);
//     }
  
//     // Clear your form fields here (e.g., setMacAddress("") and setIpAddress(""))
//   };
  
  return (
    <>
           <form 
        //    onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

      <CommonTextField
        label="MAC ADDRESS : "
        value={macAddress}
      />

      <CommonTextField
        label=" IP Address : "
        // value={newIpAddress}
        // onChange={(e) => setNewIpAddress(e)}
      />
      <div style={{ marginTop: '20px' }}>
        <CommonButton label="Change Gateway Host ServerIp" backgroundColor="green" width="30vh" />
      </div>
    </form>
    </>
   
  );
};

export default ChangeGatewayHostServerIp;
