import React, { useEffect, useState } from "react";
import CommonTextField from "../../CommonTextField";
import CommonTextFieldForm from "../../CommonTextFieldForm";
import CommonButton from "../../CommonButton";
import axios from "axios";
export default function DownloadCategories() {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  //for macAddress and lockId
  const [macAddress, setMacAddress] = useState("");
  const [lockId, setLockId] = useState("");

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

  //multiple categories data
  const [category, setCategory] = useState({
    LowSetpoint: "",
    HighSetpoint: "",
    CategoryNumber: "",
  });

  //category array
  const [categoryList, setCategoryList] = useState([]);

  //clear all Categories
  const pressAllClearButton = () => {
    setCategoryList([]);
  };

  //clean current category
  const pressClearButton = () => {
    setCategory({
      LowSetpoint: "",
      HighSetpoint: "",
      CategoryNumber: "",
    });
  };
  //add new category
  const pressAddButton = () => {
    appendToFormDataList(category);
    pressClearButton();
  };

  // Function to append a new item to categoryList
  const appendToFormDataList = (newItem) => {
    setCategoryList([...categoryList, newItem]);
  };

  // Update the field in category when the input field changes
  const handleFieldChange = (fieldName, event) => {
    const newValue = event.target.value; // Extract the value from the event object
    setCategory({
      ...category,
      [fieldName]: newValue,
    });
  };

  //submit button
  const submitCategories = async () => {
    if (macAddress.length !== 0 && lockId.length !== 0) {
      const url = `${baseUrl}/Gateway/DownloadCategories?macAddress=${macAddress}&lockId=${lockId}`;
      try {
        const response = await axios.post(url, categoryList, {
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
        <legend>Download Categories Data</legend>
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
                  pattern="[0-9]+"
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
              <legend>Categories : {categoryList.length + 1}</legend>

              <div style={{ border: "1px solid" }}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          type="number"
                          inputStyles={inputStyles}
                          label="Category Number"
                          placeholder="Category Number"
                          value={category.CategoryNumber}
                          onChange={(e) => {
                            handleFieldChange("CategoryNumber", e);
                          }}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          type="number"
                          placeholder="Low Set point"
                          inputStyles={inputStyles}
                          label="Low Set point"
                          value={category.LowSetpoint}
                          onChange={(e) => {
                            handleFieldChange("LowSetpoint", e);
                          }}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          type="number"
                          placeholder="High Set point"
                          inputStyles={inputStyles}
                          label="High Set point"
                          value={category.HighSetpoint}
                          onChange={(e) => {
                            handleFieldChange("HighSetpoint", e);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <CommonButton
                                  label="Add Category"
                                  backgroundColor="green"
                                  onClick={pressAddButton}
                                />
                              </td>
                              <td>
                                <CommonButton
                                  label="Clear Category"
                                  onClick={pressClearButton}
                                  backgroundColor="green"
                                />
                              </td>
                              <td>
                                <CommonButton
                                  label="Clear All Categories"
                                  onClick={pressAllClearButton}
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
                        <p>Total Categories = {categoryList.length}</p>
                        {categoryList.length > 0 && (
                          <CommonButton
                            label="Submit"
                            onClick={submitCategories}
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
