import React, { useEffect, useState } from "react";

import axios from "axios";
import CommonTextField from "../../componets/CommonTextField";
import CommonButton from "../../componets/CommonButton";
import CommonTextFieldForm from "../../componets/CommonTextFieldForm";
export default function DownloadTimezoneData({macAddress,LockID}) {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";



  //timezone updater checker
  const [updated, setUpdated] = useState(false);

  //show Form
  const [formVisible, setFormVisible] = useState(false);

  const pressContinuoueButton = () => {
    setFormVisible(!formVisible);
  };

  //input styles
  const inputStyles = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    width: "80%",
    margin: "8px",
  };

  //multiple timezone data
  const [tzDeatils, settzDetails] = useState({
    DayFrom: "",
    DayTo:"",
    FromHr: "",
    FromMin: "",
    ToHr: "",
    ToMin: "",
  });

  //tzDetails array
  const [tzDetailsList, settzDetailsList] = useState([]);

  //timezone
  const [timezone, setTimezone] = useState({
    TimezoneId: 1,
    TzDetails: [],
  });

  //timezone list
  const [timezoneList, settimeZoneList] = useState([]);

  //clear all tzDetails
  const pressAllClearButton = () => {
    settzDetailsList([]);
  };

  //clean current tzDetails
  const pressClearButton = () => {
    settzDetails({
      DayFrom: "",
      DayTo:"",
      FromHr: "",
      FromMin: "",
      ToHr: "",
      ToMin: "",
    });
  };

  //add new tzDetail
  const pressAddButton = () => {
    appendToFormDataList(tzDeatils);
    pressClearButton();
  };

  // Function to append a new item to tzDetailsList
  const appendToFormDataList = (newItem) => {
    settzDetailsList([...tzDetailsList, newItem]);
  };

  // Update the field in tzDetail when the input field changes
  const handleFieldChange = (fieldName, event) => {
    const newValue = event.target.value; // Extract the value from the event object
    settzDetails({
      ...tzDeatils,
      [fieldName]: newValue,
    });
  };

  // Update the field in timezone when the input field changes
  const handleTimezoneChange = (fieldName, event) => {
    const newValue = event.target.value; // Extract the value from the event object
    setTimezone({
      ...timezone,
      [fieldName]: newValue,
    });
  };

  // Function to append timezone to timezone list
  const appendTimeZoneToList = () => {
    settimeZoneList([...timezoneList, timezone]);
  };

  // Function to set the tzDetails list in the timezone state
  const updateTzDetailsinTimezone = () => {
    setTimezone({ ...timezone, TzDetails: tzDetailsList });
    setUpdated(!updated);
  };
  //add Timezone
  const addTimeZone = () => {
    updateTzDetailsinTimezone();
  };

  useEffect(() => {
    appendTimeZoneToList();
    pressClearButton();
    pressAllClearButton();
  }, [updated]);

  //clear timeZone
  const clearTimezone = () => {
    setTimezone({
      TimezoneId: 1,
      TzDetails: [],
    });
    pressClearButton();
  };

  //clear all timezone
  const clearAllTimezone = () => {
    settimeZoneList([]);
    settzDetailsList([]);
  };

  //submit button
  const submitTimeZones = async () => {
    // if (macAddress.length !== 0 && lockId.length !== 0) {
    //   const url = `${baseUrl}/Gateway/DownloadTimezoneData?macAddress=${macAddress}&lockId=${lockId}`;
    //   try {
    //     const response = await axios.post(url, timezoneList, {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     alert(JSON.stringify(response.data));
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // }

    console.log(timezoneList);
  };

  return (
    <div>

      <fieldset>
        <legend>Download TimeZone Data</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextField
                  type="text"
                  label="Mac Address"
                  value={macAddress}
                  placeholder="XX-XX-XX-XX-XX-XX"
             
                />
              </td>
              <td>
                <CommonTextField
                  type="text"
                  label="Lock ID"
                  value={LockID}
                  placeholder="4234232"
            
                />
              </td>
              <td>
                <CommonButton
                  label={formVisible ? "Hide Form" : "Continue"}
                  onClick={pressContinuoueButton}
                  backgroundColor="green"
                >
                  Add
                </CommonButton>
              </td>
            </tr>
          </tbody>
        </table>
        {formVisible && (
          <div>
            <fieldset>
              <legend>TimeZone : {timezoneList.length + 1}</legend>

              <div style={{ border: "1px solid" }}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          type="number"
                          inputStyles={inputStyles}
                          label="TimeZone ID"
                          placeholder="TimeZoneID"
                          value={timezone.TimezoneId}
                          onChange={(e) => {
                            handleTimezoneChange("TimezoneId", e);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <fieldset>
                            <legend>
                              Tz Details : {tzDetailsList.length + 1}
                            </legend>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      placeholder="Enter Value"
                                      inputStyles={inputStyles}
                                      label="Day From"
                                      value={tzDeatils.DayFrom}
                                      onChange={(e) => {
                                        handleFieldChange("DayFrom", e);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      placeholder="Enter Value"
                                      label="Day to"
                                      value={tzDeatils.DayTo}
                                      onChange={(e) => {
                                        handleFieldChange("DayTo", e);
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      placeholder="Enter Value"
                                      label="From Hr"
                                      value={tzDeatils.FromHr}
                                      onChange={(e) => {
                                        handleFieldChange("FromHr", e);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="Start Min"
                                      value={tzDeatils.FromMin}
                                      placeholder="Enter Value"
                                      onChange={(e) => {
                                        handleFieldChange("FromMin", e);
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="To Hr"
                                      value={tzDeatils.ToHr}
                                      placeholder="Enter Value"
                                      onChange={(e) => {
                                        handleFieldChange("ToHr", e);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="End Hour"
                                      value={tzDeatils.ToMin}
                                      placeholder="Enter Value"
                                      onChange={(e) => {
                                        handleFieldChange("ToMin", e);
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <CommonButton
                                      label="Add tzDetail"
                                      onClick={pressAddButton}
                                      backgroundColor="blue"
                                    />
                                    <CommonButton
                                      label="Clear Current tzDetail"
                                      onClick={pressClearButton}
                                      backgroundColor="blue"
                                    />
                                    <CommonButton
                                      label="Clear All tzDetails"
                                      onClick={pressAllClearButton}
                                      backgroundColor="blue"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </fieldset>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <CommonButton
                                  label="Add TimeZone"
                                  backgroundColor="green"
                                  onClick={addTimeZone}
                                />
                              </td>
                              <td>
                                <CommonButton
                                  label="Clear Timezone"
                                  onClick={clearTimezone}
                                  backgroundColor="green"
                                />
                              </td>
                              <td>
                                <CommonButton
                                  label="Clear All Timezones"
                                  onClick={clearAllTimezone}
                                  backgroundColor="green"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <p>Total Calendar = {timezoneList.length}</p>
                        {timezoneList.length > 0 && (
                          <CommonButton
                            label="Submit"
                            onClick={submitTimeZones}
                            backgroundColor="red"
                          />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </fieldset>
          </div>
        )}
      </fieldset>
    </div>
  );
}
