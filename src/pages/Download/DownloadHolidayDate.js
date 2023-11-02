import React, { useState } from "react";
import CommonTextFieldForm from "../../componets/CommonTextFieldForm";
import CommonButton from "../../componets/CommonButton";
import CommonTextField from "../../componets/CommonTextField";
import { useSelector } from "react-redux";
import axios from "axios";

export default function DownloadHolidayDate({ macAddress, LockID }) {

  const baseUrl = "http://localhost:6062";

  const token = useSelector((state) => state.logintoken.tokenValues.token);
const [loading,setLoading]=useState(false);

  
  const [formVisible, setFormVisible] = useState(false);
  const [calendar, setCalendar] = useState({
    CalendarId: 1,
    Holidays: [],
  });
  const [calendarList, setCalendarList] = useState([]);
  const [holiday, setHoliday] = useState({
    Year: "",
    Month: "",
    Day: "",
    StartHr: "",
    StartMin: "",
    EndHr: "",
    EndMin: "",
  });

  const inputStyles = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    width: "80%",
    margin: "8px",
  };

  const handleFieldChange = (fieldName, event) => {
    const newValue = event.target.value;
    setHoliday({
      ...holiday,
      [fieldName]: newValue,
    });
  };

  const handleCalendarChange = (fieldName, event) => {
    const newValue = event.target.value;
    setCalendar({
      ...calendar,
      [fieldName]: newValue,
    });
  };

  const appendToHolidayList = () => {
    setCalendar({
      ...calendar,
      Holidays: [...calendar.Holidays, holiday],
    });
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

  const addCalendar = () => {
    setCalendarList([...calendarList, calendar]);
    setCalendar({
      CalendarId: 1,
      Holidays: [],
    });
  };

  const clearCalendar = () => {
    setCalendar({
      CalendarId: 1,
      Holidays: [],
    });
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

  const clearAllCalendar = () => {
    setCalendarList([]);
  };

  const submitCalendar = async(e) => {
    e.preventDefault();
    if (macAddress.length !== 0 && LockID.length !== 0 && calendarList.length !== 0) {
      try {
        const response = await axios.post(`${baseUrl}/Gateway/DownloadHolidayData?macAddress=${macAddress}&lockId=${LockID}`, calendarList, {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            "Authorization": "Bearer " + token, // Replace 'yourToken' with the actual token value
          },
        });
       
        window.alert(`result ${response.data.result} ${response.data.msg}`)

        console.log("Response from the server:", response.data);
      } catch (error) {
        console.error("Error sending data:", error);
      }finally{
        setLoading(false)    

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
                  onClick={() => setFormVisible(!formVisible)}
                  backgroundColor="green"
                />
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
                          onChange={(e) =>
                            handleCalendarChange("CalendarId", e)
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <fieldset>
                            <legend>
                              Holiday : {calendar.Holidays.length + 1}
                            </legend>
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
                                      onChange={(e) =>
                                        handleFieldChange("Year", e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="Month"
                                      placeholder="Enter Value"
                                      value={holiday.Month}
                                      onChange={(e) =>
                                        handleFieldChange("Month", e)
                                      }
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
                                      onChange={(e) =>
                                        handleFieldChange("Day", e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="Start Hour"
                                      value={holiday.StartHr}
                                      placeholder="Enter Value"
                                      onChange={(e) =>
                                        handleFieldChange("StartHr", e)
                                      }
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
                                      onChange={(e) =>
                                        handleFieldChange("StartMin", e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <CommonTextFieldForm
                                      type="number"
                                      inputStyles={inputStyles}
                                      label="End Hour"
                                      value={holiday.EndHr}
                                      placeholder="Enter Value"
                                      onChange={(e) =>
                                        handleFieldChange("EndHr", e)
                                      }
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
                                      onChange={(e) =>
                                        handleFieldChange("EndMin", e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <CommonButton
                                      label="Add Holiday"
                                      onClick={appendToHolidayList}
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
                                  onClick={addCalendar}
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
