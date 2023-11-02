import React, { useState } from "react";
import CommonButton from "../../CommonButton";
import CommonTextFieldForm from "../../CommonTextFieldForm";
import CommonTextField from "../../CommonTextField";
import axios from "axios";
export default function SendBulkBatch({macAddress,LockID}) {

        //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  //for macAddress and lockId
  // const [macAddress, setMacAddress] = useState(0);
  // const [lockId, setLockId] = useState(0);

  const [data, setData] = useState({
    CardNumber: 0,
    APBOneFreePass: 0,
    APBNotUsed: 0,
    FacilityCode: 0,
    IsAPBExempt: 0,
    IssueCode: 0,
    APBLocation: 0,
    IsApbIn: 0,
    PinCode: 0,
    Category1: 0,
    Category2: 0,
    Category3: 0,
    Category4: 0,
    Category5: 0,
    Category6: 0,
    Category7: 0,
    Category8: 0,
    Category9: 0,
    Category10: 0,
    Category11: 0,
    Category12: 0,
    Category13: 0,
    Category14: 0,
    Category15: 0,
    Category16: 0,
    ADA: 0,
    FirstInController: 0,
    AccessTimezones: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    HolidayCalendarId: 0,
  });
 

  const clearForm = () => {
    setData({
      CardNumber: 0,
      APBOneFreePass: 0,
      APBNotUsed: 0,
      FacilityCode: 0,
      IsAPBExempt: 0,
      IssueCode: 0,
      APBLocation: 0,
      IsApbIn: 0,
      PinCode: 0,
      Category1: 0,
      Category2: 0,
      Category3: 0,
      Category4: 0,
      Category5: 0,
      Category6: 0,
      Category7: 0,
      Category8: 0,
      Category9: 0,
      Category10: 0,
      Category11: 0,
      Category12: 0,
      Category13: 0,
      Category14: 0,
      Category15: 0,
      Category16: 0,
      ADA: 0,
      FirstInController: 0,
      AccessTimezones: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      HolidayCalendarId: 0,
    });
  };

  const inputStyles1 = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    width: "80%",
    margin: "8px",
  };

  const inputStyles2 = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    width: "30%",
    margin: "8px",
  };

  // Update the field in formData when the input field changes
  const handleFieldChange = (fieldName, event) => {
    const newValue = event.target.value; // Extract the value from the event object
    setData({
      ...data,
      [fieldName]: newValue,
    });
  };

  // Function to set a value in the AccessTimezones array by index
  const setAccessTimezone = (index, value) => {
    setData((prevData) => ({
      ...prevData,
      AccessTimezones: [
        ...prevData.AccessTimezones.slice(0, index), // Copy the array before the index
        value, // Set the new value at the given index
        ...prevData.AccessTimezones.slice(index + 1), // Copy the array after the index
      ],
    }));
  };

  // Usage example
  const updateAccessTimezoneValue = (index, newValue) => {
    setAccessTimezone(index, newValue);
  };
  const clickSubmit = async () => {
    if (
        macAddress.length !== 0 &&
        LockID.length !== 0
      ){
        const url = `${baseUrl}/Badge/SendBulkBadges?macAddress=${macAddress}&lockIds[0]=${LockID}`;
        try {
          const response = await axios.post(url, data, {
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
      <h2>Bulk Batch Send</h2>
      
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
                  label="Lock ID"
                  inputStyles={inputStyles1}
                  value={LockID}
                  placeholder="4234232"
                  // onChange={(e) => {
                  //   setLockId(e);
                  // }}
                />
              </td>
              </tr></tbody></table>
      <fieldset>
        <legend>Form</legend>

        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextFieldForm
                  type="number"
                  value={data.CardNumber}
                  inputStyles={inputStyles1}
                  placeholder="Enter Value"
                  onChange={(e) => handleFieldChange("CardNumber", e)}
                  label="Card Number"
                />
              </td>
              <td>
                <CommonTextFieldForm
                  value={data.APBOneFreePass}
                  placeholder="Enter Value"
                  type="number"

                  onChange={(e) => handleFieldChange("APBOneFreePass", e)}
                  inputStyles={inputStyles1}
                  label="APB One Free Pass"
                />
              </td>
              <td>
                <CommonTextFieldForm
                  value={data.APBNotUsed}
                  type="number"

                  inputStyles={inputStyles1}
                  placeholder="Enter Value"
                  label="APB Not Used"
                  onChange={(e) => handleFieldChange("APBNotUsed", e)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <CommonTextFieldForm
                                  type="number"

                  inputStyles={inputStyles1}
                  label="Facility Code"
                  placeholder="Enter Value"
                  value={data.FacilityCode}
                  onChange={(e) => handleFieldChange("FacilityCode", e)}
                />
              </td>
              <td>
                <CommonTextFieldForm
                                  type="number"

                  inputStyles={inputStyles1}
                  label="Is APB Exempt"
                  placeholder="Enter Value"
                  value={data.IsAPBExempt}
                  onChange={(e) => handleFieldChange("IsAPBExempt", e)}
                />
              </td>
              <td>

                <CommonTextFieldForm
                                  type="number"

                  inputStyles={inputStyles1}
                  label="Issue Code"
                  placeholder="Enter Value"
                  value={data.IssueCode}
                  onChange={(e) => handleFieldChange("IssueCode", e)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <CommonTextFieldForm
                                  type="number"

                  inputStyles={inputStyles1}
                  label="APB Location"
                  placeholder="Enter Value"
                  value={data.APBLocation}
                  onChange={(e) => handleFieldChange("APBLocation", e)}
                />
              </td>
              <td>
                <CommonTextFieldForm
                                  type="number"

                  inputStyles={inputStyles1}
                  label="Is Apb In"
                  value={data.IsApbIn}
                  placeholder="Enter Value"
                  onChange={(e) => handleFieldChange("IsApbIn", e)}
                />
              </td>
              <td>
                <CommonTextFieldForm
                                  type="number"

                  inputStyles={inputStyles1}
                  label="Pin Code"
                  placeholder="Enter Value"
                  value={data.PinCode}
                  onChange={(e) => handleFieldChange("PinCode", e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <fieldset>
          <legend>Category</legend>
          <table>
            <tbody>
              <tr>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 1"
                    value={data.Category1}
                    placeholder="Enter Value"
                    onChange={(e) => handleFieldChange("Category1", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 2"
                    placeholder="Enter Value"
                    value={data.Category2}
                    onChange={(e) => handleFieldChange("Category2", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 3"
                    placeholder="Enter Value"
                    value={data.Category3}
                    onChange={(e) => handleFieldChange("Category3", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 4"
                    placeholder="Enter Value"
                    value={data.Category4}
                    onChange={(e) => handleFieldChange("Category4", e)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 5"
                    placeholder="Enter Value"
                    value={data.Category5}
                    onChange={(e) => handleFieldChange("Category5", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 6"
                    placeholder="Enter Value"
                    value={data.Category6}
                    onChange={(e) => handleFieldChange("Category6", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 7"
                    placeholder="Enter Value"
                    value={data.Category7}
                    onChange={(e) => handleFieldChange("Category7", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 8"
                    value={data.Category8}
                    placeholder="Enter Value"
                    onChange={(e) => handleFieldChange("Category8", e)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 9"
                    placeholder="Enter Value"
                    value={data.Category9}
                    onChange={(e) => handleFieldChange("Category9", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 10"
                    placeholder="Enter Value"
                    value={data.Category10}
                    onChange={(e) => handleFieldChange("Category10", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 11"
                    value={data.Category11}
                    placeholder="Enter Value"
                    onChange={(e) => handleFieldChange("Category11", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 12"
                    placeholder="Enter Value"
                    value={data.Category12}
                    onChange={(e) => handleFieldChange("Category12", e)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 13"
                    placeholder="Enter Value"
                    value={data.Category13}
                    onChange={(e) => handleFieldChange("Category13", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm                  type="number"

                    inputStyles={inputStyles1}
                    label="Category 14"
                    placeholder="Enter Value"
                    value={data.Category14}
                    onChange={(e) => handleFieldChange("Category14", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    label="Category 15"
                    value={data.Category15}
                    placeholder="Enter Value"
                    onChange={(e) => handleFieldChange("Category15", e)}
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                                    type="number"

                    inputStyles={inputStyles1}
                    placeholder="Enter Value"
                    label="Category 16"
                    value={data.Category16}
                    onChange={(e) => handleFieldChange("Category16", e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextFieldForm
                  inputStyles={inputStyles1}
                  label="ADA"
                  placeholder="Enter Value"
                  value={data.ADA}
                  onChange={(e) => handleFieldChange("ADA", e)}
                />
              </td>
              <td>
                <CommonTextFieldForm
                  inputStyles={inputStyles1}
                  label="First In Controller"
                  placeholder="Enter Value"
                  value={data.FirstInController}
                  onChange={(e) => handleFieldChange("FirstInController", e)}
                />
              </td>
              <td>
                <CommonTextFieldForm
                  inputStyles={inputStyles1}
                  placeholder="Enter Value"
                  label="Holiday Calendar Id"
                  value={data.HolidayCalendarId}
                  onChange={(e) => handleFieldChange("HolidayCalendarId", e)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <fieldset>
          <legend>Access Time zones</legend>
          <table>
            <tbody>
              <tr>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t1"
                    onChange={(e) => {
                      updateAccessTimezoneValue(0, e.target.value);
                    }}
                    value={data.AccessTimezones[0]}
                    label="t1"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t2"
                    onChange={(e) => {
                      updateAccessTimezoneValue(1, e.target.value);
                    }}
                    value={data.AccessTimezones[1]}
                    label="t2"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t3"
                    onChange={(e) => {
                      updateAccessTimezoneValue(2, e.target.value);
                    }}
                    value={data.AccessTimezones[2]}
                    label="t3"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t4"
                    onChange={(e) => {
                      updateAccessTimezoneValue(3, e.target.value);
                    }}
                    value={data.AccessTimezones[3]}
                    label="t4"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t5"
                    onChange={(e) => {
                      updateAccessTimezoneValue(4, e.target.value);
                    }}
                    value={data.AccessTimezones[4]}
                    label="t5"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t6"
                    onChange={(e) => {
                      updateAccessTimezoneValue(5, e.target.value);
                    }}
                    value={data.AccessTimezones[5]}
                    label="t6"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                  placeholder="t7"
                    inputStyles={inputStyles2}
                    onChange={(e) => {
                      updateAccessTimezoneValue(6, e.target.value);
                    }}
                    value={data.AccessTimezones[6]}
                    label="t7"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t8"
                    onChange={(e) => {
                      updateAccessTimezoneValue(7, e.target.value);
                    }}
                    value={data.AccessTimezones[7]}
                    label="t8"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t9"
                    onChange={(e) => {
                      updateAccessTimezoneValue(8, e.target.value);
                    }}
                    value={data.AccessTimezones[8]}
                    label="t9"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t10"
                    onChange={(e) => {
                      updateAccessTimezoneValue(9, e.target.value);
                    }}
                    value={data.AccessTimezones[9]}
                    label="t10"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t11"
                    onChange={(e) => {
                      updateAccessTimezoneValue(10, e.target.value);
                    }}
                    value={data.AccessTimezones[10]}
                    label="t11"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t12"
                    onChange={(e) => {
                      updateAccessTimezoneValue(11, e.target.value);
                    }}
                    value={data.AccessTimezones[11]}
                    label="t12"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t13"
                    onChange={(e) => {
                      updateAccessTimezoneValue(12, e.target.value);
                    }}
                    value={data.AccessTimezones[12]}
                    label="t13"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t14"
                    onChange={(e) => {
                      updateAccessTimezoneValue(13, e.target.value);
                    }}
                    value={data.AccessTimezones[13]}
                    label="t14"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t15"
                    onChange={(e) => {
                      updateAccessTimezoneValue(14, e.target.value);
                    }}
                    value={data.AccessTimezones[14]}
                    label="t15"
                  />
                </td>
                <td>
                  <CommonTextFieldForm
                    inputStyles={inputStyles2}
                    placeholder="t16"
                    onChange={(e) => {
                      updateAccessTimezoneValue(15, e.target.value);
                    }}
                    value={data.AccessTimezones[15]}
                    label="t16"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <CommonButton
          backgroundColor="blue"
          label="submit bulk batch"
          onClick={clickSubmit}
        />
        <CommonButton
          backgroundColor="green"
          label="clear form"
          onClick={clearForm}
        />


      </fieldset>
     
    </div>
  );
}
