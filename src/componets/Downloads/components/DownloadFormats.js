import React, { useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonTextFieldForm from "../../CommonTextFieldForm";
import CommonButton from "../../CommonButton";
import axios from "axios";
export default function DownloadFormats() {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  const pressContinuoueButton = () => {
    setFormVisible(!formVisible);
  };
  //press Add button
  const pressAddButton = () => {
    appendToFormDataList(formData);
    pressClearButton();
  };

  //press Clear button
  const pressClearButton = () => {
    var data = {
      BadgeFormatID: "",
      BadgeFormatType: "",
      CardNumberOffset: "",
      IsReversed: "",
      nScardAppType: "",
      NumBitsOnCard: "",
      BitsForEven: "",
      BitsForOdd: "",
      FacilityCodeStartIndex: "",
      FacilityCodeLengthInBits: "",
      CardNumberStartIndex: "",
      CardNumberLengthInBits: "",
      IssueCodeStartIndex: "",
      IssueCodeLengthInBits: "",
      ParityStep: "",
    };
    setFormData(data);
  };

  //press Clear All button
  const pressAllClearButton = () => {
    pressClearButton();
    setFormDataList([]);
  };

  //press submit button
  const pressSubmitButton = async () => {
    let tempFormData;
    if (formDataList.length > 0) {
      appendToFormDataList(formData);
      tempFormData = formDataList;
    } else {
      tempFormData = formData;
    }

    if (
      macAddress.length !== 0 &&
      lockId.length !== 0 &&
      formDataList.length !== 0
    ) {
      const url = `${baseUrl}/Gateway/DownloadFormats?macAddress=${macAddress}&lockId=${lockId}`;
      try {
        const response = await axios.post(url, formDataList, {
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

  //for macAddress and lockId
  const [macAddress, setMacAddress] = useState("");
  const [lockId, setLockId] = useState("");

  //multiple form data
  const [formData, setFormData] = useState({
    BadgeFormatID: "",
    BadgeFormatType: "",
    CardNumberOffset: "",
    IsReversed: "",
    nScardAppType: "",
    NumBitsOnCard: "",
    BitsForEven: "",
    BitsForOdd: "",
    FacilityCodeStartIndex: "",
    FacilityCodeLengthInBits: "",
    CardNumberStartIndex: "",
    CardNumberLengthInBits: "",
    IssueCodeStartIndex: "",
    IssueCodeLengthInBits: "",
    ParityStep: "",
  });

  //input styles
  const inputStyles = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px",
    width: "80%",
    margin: "8px",
  };

  //form data list
  const [formDataList, setFormDataList] = useState([]);

  // Function to append a new item to formDataList
  const appendToFormDataList = (newItem) => {
    setFormDataList([...formDataList, newItem]);
  };

  // Update the field in formData when the input field changes
  const handleFieldChange = (fieldName, event) => {
    const newValue = event.target.value; // Extract the value from the event object
    setFormData({
      ...formData,
      [fieldName]: newValue,
    });
  };

  // Update the field in formData when the input field changes
  const handleFieldClear = (fieldName) => {
    const newValue = 0; // Extract the value from the event object
    setFormData({
      ...formData,
      [fieldName]: newValue,
    });
  };

  //show Form
  const [formVisible, setFormVisible] = useState(false);

  return (
    <div>
      <fieldset>
        <legend>Download Formats</legend>
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
            <fieldset>
              <legend>{"Form : " + String(formDataList.length + 1)}</legend>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        inputStyles={inputStyles}
                        value={formData.BadgeFormatID}
                        placeholder="Enter Value"
                        onChange={(e) => {
                          handleFieldChange("BadgeFormatID", e);
                        }}
                        label="Badge Format ID"
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        inputStyles={inputStyles}
                        value={formData.BadgeFormatType}
                        placeholder="Enter Value"
                        onChange={(e) => {
                          handleFieldChange("BadgeFormatType", e);
                        }}
                        label="Badge Format Type"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        inputStyles={inputStyles}
                        value={formData.CardNumberOffset}
                        placeholder="Enter Value"
                        onChange={(e) => {
                          handleFieldChange("CardNumberOffset", e);
                        }}
                        label="Card Number Offset"
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.IsReversed}
                        onChange={(e) => {
                          handleFieldChange("IsReversed", e);
                        }}
                        label="Is Reversed"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.nScardAppType}
                        onChange={(e) => {
                          handleFieldChange("nScardAppType", e);
                        }}
                        label="nScard App Type"
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.NumBitsOnCard}
                        onChange={(e) => {
                          handleFieldChange("NumBitsOnCard", e);
                        }}
                        label="Num Bits On Card"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        inputStyles={inputStyles}
                        placeholder="Enter Value"
                        value={formData.BitsForEven}
                        onChange={(e) => {
                          handleFieldChange("BitsForEven", e);
                        }}
                        label="Bits For Even"
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.BitsForOdd}
                        onChange={(e) => {
                          handleFieldChange("BitsForOdd", e);
                        }}
                        label="Bits For Odd"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.FacilityCodeStartIndex}
                        onChange={(e) => {
                          handleFieldChange("FacilityCodeStartIndex", e);
                        }}
                        label="Facility Code Start Index"
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.FacilityCodeLengthInBits}
                        onChange={(e) => {
                          handleFieldChange("FacilityCodeLengthInBits", e);
                        }}
                        label="Facility Code Length In Bits"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.CardNumberStartIndex}
                        onChange={(e) => {
                          handleFieldChange("CardNumberStartIndex", e);
                        }}
                        label="Card Number Start Index"
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.CardNumberLengthInBits}
                        onChange={(e) => {
                          handleFieldChange("CardNumberLengthInBits", e);
                        }}
                        label="Card Number Length In Bits"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.IssueCodeStartIndex}
                        onChange={(e) => {
                          handleFieldChange("IssueCodeStartIndex", e);
                        }}
                        label="Issue Code Start Index"
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.IssueCodeLengthInBits}
                        onChange={(e) => {
                          handleFieldChange("IssueCodeLengthInBits", e);
                        }}
                        label="Issue Code Length In Bits"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="number"
                        placeholder="Enter Value"
                        inputStyles={inputStyles}
                        value={formData.ParityStep}
                        onChange={(e) => {
                          handleFieldChange("ParityStep", e);
                        }}
                        label="Parity Step"
                      />
                    </td>
                    <td>
                      <CommonButton
                        label="Add"
                        onClick={pressAddButton}
                        backgroundColor="blue"
                      />
                      <CommonButton
                        label="Clear"
                        onClick={pressClearButton}
                        backgroundColor="blue"
                      />
                      <CommonButton
                        label="Clear All"
                        onClick={pressAllClearButton}
                        backgroundColor="blue"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {formDataList.length > 0 && (
                        <CommonButton
                          label="Submit"
                          onClick={pressSubmitButton}
                          backgroundColor="#458a8c"
                        />
                      )}
                    </td>
                    <td>
                      <p>Form Count : {formDataList.length}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </div>
        )}
      </fieldset>
    </div>
  );
}
