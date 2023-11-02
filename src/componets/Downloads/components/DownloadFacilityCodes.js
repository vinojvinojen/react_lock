import React, { useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonTextFieldForm from "../../CommonTextFieldForm";
import CommonButton from "../../CommonButton";
import axios from "axios";
export default function DownloadFacilityCodes() {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  //for macAddress and lockId
  const [macAddress, setMacAddress] = useState("");
  const [lockId, setLockId] = useState("");

  //value list
  const [values, setValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Function to update a value at a specific position in the array
  const updateValueAtPosition = (position, value) => {
    if (position >= 0 && position < values.length) {
      const updatedValues = [...values];
      updatedValues[position] = value;
      setValues(updatedValues);
    }
  };

  //press Clear button
  const pressClearButton = () => {
    setValues(["", "", "", "", "", "", "", "", "", ""]);
  };

  //new style
  const inputStyles = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    width: "50%",
  };

  //show Form
  const [formVisible, setFormVisible] = useState(false);
  const pressContinuoueButton = () => {
    setFormVisible(!formVisible);
  };

  //press submit button
  const pressSubmitButton = async () => {
    if (macAddress.length !== 0 && lockId.length !== 0) {
      const url = `${baseUrl}/Gateway/DownloadFacilityCodes?macAddress=${macAddress}&lockId=${lockId}`;
      try {
        const response = await axios.post(url, values, {
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
      <div>
        <fieldset>
          <legend>Download Facility Code</legend>
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
              <h3>Fill Follow Form</h3>
              <table style={{ width: "70%" }}>
                <tbody>
                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        value={values[0]}
                        inputStyles={inputStyles}
                        placeholder="v1"
                        label="V1"
                        onChange={(e) =>
                          updateValueAtPosition(0, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v2"
                        value={values[1]}
                        inputStyles={inputStyles}
                        label="V2"
                        onChange={(e) =>
                          updateValueAtPosition(1, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v3"
                        value={values[2]}
                        inputStyles={inputStyles}
                        label="V3"
                        onChange={(e) =>
                          updateValueAtPosition(2, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v4"
                        value={values[3]}
                        inputStyles={inputStyles}
                        label="V4"
                        onChange={(e) =>
                          updateValueAtPosition(3, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v5"
                        value={values[4]}
                        inputStyles={inputStyles}
                        label="V5"
                        onChange={(e) =>
                          updateValueAtPosition(4, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v6"
                        value={values[5]}
                        inputStyles={inputStyles}
                        label="V6"
                        onChange={(e) =>
                          updateValueAtPosition(5, e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v7"
                        value={values[6]}
                        inputStyles={inputStyles}
                        label="V7"
                        onChange={(e) =>
                          updateValueAtPosition(6, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v8"
                        value={values[7]}
                        inputStyles={inputStyles}
                        label="V8"
                        onChange={(e) =>
                          updateValueAtPosition(7, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v9"
                        value={values[8]}
                        inputStyles={inputStyles}
                        label="V9"
                        onChange={(e) =>
                          updateValueAtPosition(8, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="v10"
                        value={values[9]}
                        inputStyles={inputStyles}
                        label="V10"
                        onChange={(e) =>
                          updateValueAtPosition(9, e.target.value)
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonButton
                        label="Clear"
                        onClick={pressClearButton}
                        backgroundColor="blue"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <CommonButton
                        label="Submit"
                        onClick={pressSubmitButton}
                        backgroundColor="#458a8c"
                      />
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
}
