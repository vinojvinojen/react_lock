import React, { useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonButton from "../../CommonButton";
import axios from "axios";
export default function ReplaceExpander({macAddress}) {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  // const [macAddress, setMacAddress] = useState("");
  const [oldrepeaterId, setoldRepeterId] = useState("");
  const [newrepeaterId, setnewRepeterId] = useState("");

  const submitButton = async () => {
    if (
      macAddress.length !== 0 &&
      oldrepeaterId.length !== 0 &&
      newrepeaterId.length !== 0
    ) {
      const url = `${baseUrl}/Repeater/ReplaceExpander?macAddress=${macAddress}&oldRepeaterId=${oldrepeaterId}&newRepeaterId=${newrepeaterId}`;
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
        <legend>Replace Expanders</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextField
                  label="Mac Address"
                  type="text"
                  value={macAddress}
                  // onChange={(e) => {
                  //   setMacAddress(e);
                  // }}
                />
              </td>
              <td>
                <CommonTextField
                  label="Old Repeter Id"
                  type="number"
                  value={oldrepeaterId}
                  onChange={(e) => {
                    setoldRepeterId(e);
                  }}
                />
              </td>
              <td>
                <CommonTextField
                  label="New Repeter Id"
                  type="number"
                  value={newrepeaterId}

                  onChange={(e) => {
                    setnewRepeterId(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <CommonButton
                  label="Replace Expander"
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
