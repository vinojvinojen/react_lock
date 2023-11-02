import React, { useState } from 'react';
import CommonButton from '../../componets/CommonButton';
import CommonTextField from '../../componets/CommonTextField';
import axios from 'axios';
import { ReplaceGatewayPost } from '../../API/Api';
import { useSelector } from 'react-redux';

const ReplaceGateway = ({macAddress}) => {
  const [newIpAddress, setNewIpAddress] = useState('');
  const [newMacAddress, setNewMacAddress] = useState('');

  const token = useSelector((state) => state.logintoken.tokenValues.token);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   const token = localStorage.getItem("token");
  //   const baseUrl = 'http://localhost:6062'; // Replace with your actual base URL
  //   const url = `${baseUrl}/Gateway/ReplaceGateway?macAddress=${macAddress}&newMacAddress=${newMacAddress}&newIpAddress=${newIpAddress}`;
  //   const data = {
  //       macAddress: macAddress,
  //       newMacAddress: newMacAddress,
  //       newIpAddress: newIpAddress
  //     };
  //   try {
  //     const response = await axios.post(url, null, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //     });
  
  //     if (response.status === 200) {
  //       console.log('Gateway replaced successfully:', response.data);
  //       updateEntries({
  //         macAddress: newMacAddress,
  //         ipAddress: newIpAddress,
  //       });
  //     } else {
  //       console.error('API Error:', response.data);
  //     }
      
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  
  //   // Clear your form fields here (e.g., setMacAddress("") and setIpAddress(""))
  // };


  const handleSubmit=async(e)=>{
    e.preventDefault();
// try{
  // const response= await ReplaceGatewayPost(macAddress,newMacAddress,newIpAddress,token)
//   if(response.status===200){
//     window.alert(response.data)
//   }

// }catch(error){
//   console.log(error);
// }
console.log("mac",macAddress);
console.log("newMacAddress",newMacAddress);

  console.log("newIpAddress",newIpAddress);

  }
  
  return (
    <>
 <form
  onSubmit={handleSubmit}
  style={{ flexDirection: 'row' }}>
  <CommonTextField
    label="MAC ADDRESS : "
    value={macAddress}
  />
   <CommonTextField
    label="New Mac Address : "
    value={newMacAddress}
    onChange={(e) => setNewMacAddress(e)}
    style={{ marginTop: '10px' }} // Add margin to separate the fields
  />
  <CommonTextField
    label="New IP Address : "
    value={newIpAddress}
    onChange={(e) => setNewIpAddress(e)}
    style={{ marginTop: '10px' }} // Add margin to separate the fields
  />
  <div style={{ margin: '20px auto' }}>
    <CommonButton label="Replace Gateway" backgroundColor="green" width="30vh" />
  </div>
</form>


    </>
   
  );
};

export default ReplaceGateway;
