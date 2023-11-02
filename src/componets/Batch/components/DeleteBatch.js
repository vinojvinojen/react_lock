import React, { useState } from "react";
import CommonButton from "../../CommonButton";
import CommonTextField from "../../CommonTextField";
import axios from "axios";
export default function DeleteBatch({macAddress,LockID}) {
         //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  //for macAddress and lockId, card No
  // const [macAddress, setMacAddress] = useState("");
  // const [lockId, setLockId] = useState("");
  const [cardNo, setCardNo] = useState("");

    const deleteBatch = async () =>{
        if (
            macAddress.length !== 0 &&
            LockID.length !== 0
          ){
            const url = `${baseUrl}/Badge/DeleteBadge?macAddress=${macAddress}&CardNumber=${cardNo}&facility=0&lockIds[0]=${LockID}`;
            try {
              const response = await axios.delete(url, {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${token}`,
                },
              });
      
              alert(JSON.stringify(response.data));
            } catch (error) {
              console.error("Error:", error);
            }
        }
      }

      const inputStyles1 = {
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "5px",
        width: "80%",
        margin: "8px",
      };
  return (
    <div>
      <fieldset>
        <legend>
            Delete Batch
        </legend>
        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextField
                  type="text"
                  label="Mac Address"
                  value={macAddress}
                  inputStyles={inputStyles1}
                  placeholder="XX-XX-XX-XX-XX-XX"
                  // onChange={(e) => {
                  //   setMacAddress(e);
                  // }}
                />
              </td>
              <td>
              <CommonTextField
                  type="text"
                  label="LockID"
                  value={LockID}
                  inputStyles={inputStyles1}
                  placeholder="1234"
                  // onChange={(e) => {
                  //   setLockId(e);
                  // }}
                />
              </td>
              
              <td>
                <CommonTextField
                  type="text"
                  label="Card number "
                  inputStyles={inputStyles1}
                  value={cardNo}
                  placeholder="1234"
                  onChange={(e) => {
                    setCardNo(e);
                  }}
                />
              </td>
              </tr>
              <tr>
                <td>
                <CommonButton
          backgroundColor="red"
          label="Delete Batch"
          
          onClick={deleteBatch}
        />
                </td>
              </tr>
              </tbody></table>
      </fieldset>
    </div>
  )
}
