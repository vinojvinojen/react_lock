import React, { useEffect, useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonTextFieldForm from "../../CommonTextFieldForm";
import CommonButton from "../../CommonButton";
import axios from "axios";
export default function DownloadHolidayDate() {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  //for macAddress and lockId
  const [macAddress, setMacAddress] = useState("");
  const [lockId, setLockId] = useState("");

  //calendar updater checker
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

  //multiple holiday data
  const [holiday, setHoliday] = useState({
    Year: "",
    Month: "",
    Day: "",
    StartHr: "",
    StartMin: "",
    EndHr: "",
    EndMin: "",
  });

  //holiday array
  const [holidayList, setHolidayList] = useState([]);

  //calendar
  const [calendar, setCalendar] = useState({
    CalendarId: 1,
    Holidays: [],
  });

  //calendar list
  const [calendarList, setCalendarList] = useState([]);

  //clear all holidays
  const pressAllClearButton = () => {
    setHolidayList([]);
  };

  //clean current holiday
  const pressClearButton = () => {
    setHoliday({
      Year: "",
      Month: "",
      Day: "",
      StartHr: "",
      StartMin: "",
      EndHr: "",
      EndMin: "",
    });
  };

  //add new holiday
  const pressAddButton = () => {
    appendToFormDataList(holiday);
    pressClearButton();
  };

  // Function to append a new item to holidayList
  const appendToFormDataList = (newItem) => {
    setHolidayList([...holidayList, newItem]);
  };

  // Update the field in holiday when the input field changes
  const handleFieldChange = (fieldName, event) => {
    const newValue = event.target.value; // Extract the value from the event object
    setHoliday({
      ...holiday,
      [fieldName]: newValue,
    });
  };

  // Update the field in calendar when the input field changes
  const handleCalendarChange = (fieldName, event) => {
    const newValue = event.target.value; // Extract the value from the event object
    setCalendar({
      ...calendar,
      [fieldName]: newValue,
    });
  };

  // Function to append calendar to calendarList
  const appendCalendarToList = () => {
    setCalendarList([...calendarList, calendar]);
  };

  // Function to set the Holidays list in the calendar state
  const updateHolidaysInCalendar = () => {
    setCalendar({ ...calendar, Holidays: holidayList });
    setUpdated(!updated);
  };
  //add calendar
  const addCalender = () => {
    updateHolidaysInCalendar();
  };

  useEffect(() => {
    appendCalendarToList();
    pressClearButton();
    pressAllClearButton();
  }, [updated]);

  //clear calendar
  const clearCalendar = () => {
    setCalendar({
      CalendarId: 1,
      Holidays: [],
    });
    pressClearButton();
  };

  //clear all calendar
  const clearAllCalendar = () => {
    setCalendarList([]);
    setHolidayList([]);
  };

  //submit button
  const submitCalendar = async () => {
    if (macAddress.length !== 0 && lockId.length !== 0) {
      const url = `${baseUrl}/Gateway/DownloadHolidayData?macAddress=${macAddress}&lockId=${lockId}`;
      try {
        const response = await axios.post(url, calendarList, {
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
        <legend>Download Holiday Date</legend>
        <table>
          <tbody>
            <tr>
              <td>
                <CommonTextField
                  type="text"
                  label="Mac Address"
                  value={macAddress}
                  placeholder="XX-XX-XX-XX-XX-XX"
                  onChange={(e) => {
                    setMacAddress(e);
                  }}
                />
              </td>
              <td>
                <CommonTextField
                  type="text"
                  label="Lock ID"
                  value={lockId}
                  placeholder="4234232"
                  onChange={(e) => {
                    setLockId(e);
                  }}
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
              <legend>Calendar : {calendarList.length + 1}</legend>

              <div style={{ border: "1px solid" }}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          type="number"
                          inputStyles={inputStyles}
                          label="Calendar ID"
                          placeholder="Calendar ID"
                          value={calendar.CalendarId}
                          onChange={(e) => {
                            handleCalendarChange("CalendarId", e);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <fieldset>
                            <legend>Holiday : {holidayList.length + 1}</legend>
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="Year"
                                      placeholder="Enter Value"
                                      value={holiday.Year}
                                      onChange={(e) => {
                                        handleFieldChange("Year", e);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="Month"
                                      placeholder="Enter Value"
                                      value={holiday.Month}
                                      onChange={(e) => {
                                        handleFieldChange("Month", e);
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="Day"
                                      placeholder="Enter Value"
                                      value={holiday.Day}
                                      onChange={(e) => {
                                        handleFieldChange("Day", e);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="Start Hour"
                                      value={holiday.StartHr}
                                      placeholder="Enter Value"
                                      onChange={(e) => {
                                        handleFieldChange("StartHr", e);
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      placeholder="Enter Value"
                                      inputStyles={inputStyles}
                                      label="Start Minute"
                                      value={holiday.StartMin}
                                      onChange={(e) => {
                                        handleFieldChange("StartMin", e);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="End Hour"
                                      value={holiday.EndHr}
                                      placeholder="Enter Value"
                                      onChange={(e) => {
                                        handleFieldChange("EndHr", e);
                                      }}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="End Minute"
                                      value={holiday.EndMin}
                                      placeholder="Enter Value"
                                      onChange={(e) => {
                                        handleFieldChange("EndMin", e);
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <CommonButton
                                      label="Add Holiday"
                                      onClick={pressAddButton}
                                      backgroundColor="blue"
                                    />
                                    <CommonButton
                                      label="Clear Current Holiday"
                                      onClick={pressClearButton}
                                      backgroundColor="blue"
                                    />
                                    <CommonButton
                                      label="Clear All Holidays"
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
                                  label="Add Calendar"
                                  backgroundColor="green"
                                  onClick={addCalender}
                                />
                              </td>
                              <td>
                                <CommonButton
                                  label="Clear Calendar"
                                  onClick={clearCalendar}
                                  backgroundColor="green"
                                />
                              </td>
                              <td>
                                <CommonButton
                                  label="Clear All Calendars"
                                  onClick={clearAllCalendar}
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
                        <p>Total Calendar = {calendarList.length}</p>
                        {calendarList.length > 0 && (
                          <CommonButton
                            label="Submit"
                            onClick={submitCalendar}
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
