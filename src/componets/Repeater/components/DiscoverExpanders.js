import React, { useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonButton from "../../CommonButton";
import axios from "axios";
import CommonPopup from "../../CommonPopup";
export default function DiscoverExpanders({macAddress}) {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

 


  // const [macAddress, setMacAddress] = useState("");

  const submitButton = async () => {
    if (macAddress.length !== 0) {
      const url = `${baseUrl}/Repeater/DiscoverExpanders?macAddress=${macAddress}`;
      try {
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
       alert(JSON.stringify(response.data));
     
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div>
     
      <fieldset>
        <legend>Discover Expanders</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextField
                  label="Mac Address"
                  // onChange={(e) => {
                  //   setMacAddress(e);
                  // }}
                  value={macAddress}
                />
              </td>
              <td>
                <CommonButton
                  label="Discover Exapnders"
                  backgroundColor="blue"
                  onClick={submitButton}
                ></CommonButton>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
