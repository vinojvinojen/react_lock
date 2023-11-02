import React, { useState } from 'react'
import CommonTextField from '../../componets/CommonTextField';
import CommonButton from '../../componets/CommonButton';
import CommonTextFieldForm from '../../componets/CommonTextFieldForm';
import { AddTimeZone } from '../../API/Api';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddTimezone = ({ macAddress, LockID }) => {
    const token = useSelector((state) => state.logintoken.tokenValues.token);
    const baseUrl = "http://localhost:6062";

  const [loading,setLoading]=useState(false);
  
  
    const [formVisible, setFormVisible] = useState(false);
    const [timezone, setTimezone] = useState({
        TimezoneId: 1, // Initialize TimezoneId
        TzDetails: [],
    });
    const [tzDetails, setTzDetails] = useState({
        DayFrom: "",
        DayTo: "",
        FromHr: "",
        FromMin: "",
        ToHr: "",
        ToMin: "",
    });
    const [tzDetailsCount, setTzDetailsCount] = useState(0);

    const inputStyles = {
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "5px",
        width: "80%",
        margin: "8px",
    };

    const handleFieldChange = (fieldName, event) => {
        if (fieldName === "TimezoneId") {
            // If it's the TimezoneId field, update the TimezoneId in timezone
            setTimezone({
                ...timezone,
                TimezoneId: parseInt(event.target.value),
            });
        } else {
            const newValue = event.target.value;
            setTzDetails({
                ...tzDetails,
                [fieldName]: newValue,
            });
        }
    };

    const addTzDetails = () => {
        const { DayFrom, DayTo, FromHr, FromMin, ToHr, ToMin } = tzDetails;
        if (DayFrom && DayTo && FromHr && FromMin && ToHr && ToMin) {
            // Create a new TzDetails object with the current TimezoneId
            const newTzDetail = {
                DayFrom: parseInt(DayFrom),
                DayTo: parseInt(DayTo),
                FromHr: parseInt(FromHr),
                FromMin: parseInt(FromMin),
                ToHr: parseInt(ToHr),
                ToMin: parseInt(ToMin),
            };

            // Add the new TzDetail to the TzDetails array in timezone
            setTimezone((prevState) => ({
                ...prevState,
                TzDetails: [...prevState.TzDetails, newTzDetail],
            }));

            // Clear the input fields
            setTzDetails({
                DayFrom: "",
                DayTo: "",
                FromHr: "",
                FromMin: "",
                ToHr: "",
                ToMin: "",
            });

            // Update the count of TzDetails
            setTzDetailsCount((prevCount) => prevCount + 1);
        }
    };

    const pressContinueButton = () => {
        setFormVisible(!formVisible);
    };

    const submitCalendar = async() => {
        setLoading(true)    
        if (macAddress.length !== 0 && LockID.length !== 0 && timezone !==null) {
          try {
            const response = await axios.post(`${baseUrl}/Gateway/AddTimezone?macAddress=${macAddress}&lockId=${LockID}`, timezone, {
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
        <>
            <fieldset >
                <legend>Add TImezone</legend>
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
                                    onClick={pressContinueButton}
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
                        <fieldset style={{ width: "80%" }}>
                            <legend>Calendar</legend>
                            <div style={{ border: "1px solid" }}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    inputStyles={inputStyles}
                                                    label="Timezone ID"
                                                    placeholder="Timezone ID"
                                                    value={timezone.TimezoneId}
                                                    onChange={(e) => handleFieldChange("TimezoneId", e)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    inputStyles={inputStyles}
                                                    label="Day From"
                                                    placeholder="Enter Value"
                                                    value={tzDetails.DayFrom}
                                                    onChange={(e) => handleFieldChange("DayFrom", e)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    inputStyles={inputStyles}
                                                    label="Day To"
                                                    placeholder="Enter Value"
                                                    value={tzDetails.DayTo}
                                                    onChange={(e) => handleFieldChange("DayTo", e)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    inputStyles={inputStyles}
                                                    label="From Hour"
                                                    placeholder="Enter Value"
                                                    value={tzDetails.FromHr}
                                                    onChange={(e) => handleFieldChange("FromHr", e)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    inputStyles={inputStyles}
                                                    label="From Minute"
                                                    placeholder="Enter Value"
                                                    value={tzDetails.FromMin}
                                                    onChange={(e) => handleFieldChange("FromMin", e)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    inputStyles={inputStyles}
                                                    label="To Hour"
                                                    placeholder="Enter Value"
                                                    value={tzDetails.ToHr}
                                                    onChange={(e) => handleFieldChange("ToHr", e)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    inputStyles={inputStyles}
                                                    label="To Minute"
                                                    placeholder="Enter Value"
                                                    value={tzDetails.ToMin}
                                                    onChange={(e) => handleFieldChange("ToMin", e)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CommonButton
                                                    label="Add Tz"
                                                    backgroundColor="blue"
                                                    onClick={addTzDetails}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </fieldset>
                        <p>TzDetails Count: {tzDetailsCount}</p>

                        <div>
                            <CommonButton
                                label="Submit"
                                backgroundColor="red"
                                onClick={submitCalendar}
                            />
                        </div>
                    </div>
                )}
            </fieldset>
        </>
    )
}

export default AddTimezone
