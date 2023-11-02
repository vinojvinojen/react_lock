import React, { useState } from "react";
import axios from "axios";
import CommonTextField from "../../componets/CommonTextField";
import CommonButton from "../../componets/CommonButton";
import CommonTextFieldForm from "../../componets/CommonTextFieldForm";
import { RemoveTimeZone, RemoveTimezoneMethod } from "../../API/Api";

export default function RemoveTimezone({ macAddress, LockID }) {
  const [timezoneId, setTimezoneId] = useState("");
  

  const handleRemove = async () => {
    // console.log(macAddress);
    // console.log(timezoneId);
    // console.log(LockID);
    if (!macAddress || !LockID || !timezoneId) {
      // Check if any of the required values are empty
      console.log("macAddress, LockID, or timezoneId is empty. Cannot remove timezone.");
      return; // Do not proceed with the API call
    }
    try {
      const response = await RemoveTimezoneMethod(macAddress, LockID, timezoneId)
      if (response.status === 200) {


      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleFieldChange = (event) => {
    const { value } = event.target;
    setTimezoneId(value);
  };

  return (
    <div>
      <fieldset>
        <legend>Remove TimeZone Data</legend>
        <table style={{ width: "80%" }}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="macAddress">Mac Address:</label>
              </td>
            </tr>
            <tr>
              <td>
                <CommonTextField
                  type="text"
                  id="macAddress"
                  value={macAddress}
                  placeholder="XX-XX-XX-XX-XX-XX"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="LockID">Lock ID:</label>
              </td>
            </tr>
            <tr>
              <td>
                <CommonTextField
                  type="text"
                  id="LockID"
                  value={LockID}
                  placeholder="4234232"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="timezoneId">Timezone Id:</label>
              </td>
            </tr>
            <tr>
              <td>
                <CommonTextFieldForm
                  type="text"
                  id="timezoneId"
                  placeholder="xxxxx"
                  onChange={handleFieldChange}
                  value={timezoneId}
                />
              </td>
            </tr>
            <tr>
              <td>
                <CommonButton
                  backgroundColor="red"
                  label="Remove"
                  onClick={handleRemove}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
