import React, { useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonButton from "../../CommonButton";
import axios from "axios";
export default function RemoveExpander({macAddress}) {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  // const [macAddress, setMacAddress] = useState("");
  const [repeaterId, setRepeterId] = useState("");

  const submitButton = async () => {
    if (macAddress.length !== 0) {
      const url = `${baseUrl}/Repeater/RemoveExpander?macAddress=${macAddress}&repeaterId=${repeaterId}`;
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
  };
  return (
    <div>
      <fieldset>
        <legend>Remove Expanders</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextField
                  label="Mac Address"
                  type="text"
                  // onChange={(e) => {
                  //   setMacAddress(e);
                  // }}
                  value={macAddress}
                />
              </td>
              <td>
                <CommonTextField
                  label="Repeter Id"
                  type="number"
                  value={repeaterId}
                  onChange={(e) => {
                    setRepeterId(e);
                  }}
                />
              </td>
              <td>
                <CommonButton
                  label="Remove Exapnders"
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
