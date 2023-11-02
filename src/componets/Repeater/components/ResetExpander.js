import React, { useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonButton from "../../CommonButton";
import axios from "axios";
export default function ResetExpander({macAddress}) {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  // const [macAddress, setMacAddress] = useState("");
  const [repeaterId, setRepeterId] = useState("");

  const submitButton = async () => {
    if (macAddress.length !== 0 && repeaterId.length !== 0) {
      const url = `${baseUrl}/Repeater/ResetExpander?macAddress=${macAddress}&repeaterId=${repeaterId}`;
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
        <legend>Reset Expanders</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextField
                  label="Mac Address"
                  type="text"
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
            </tr>
            <tr>
              <td>
                <CommonButton
                  label="Reset Expander"
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
