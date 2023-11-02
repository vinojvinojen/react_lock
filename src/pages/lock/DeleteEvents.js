
import React, { useState } from "react";

import axios from "axios";
import CommonTextField from "../../componets/CommonTextField";
import CommonButton from "../../componets/CommonButton";
import CommonTextFieldForm from "../../componets/CommonTextFieldForm";
import { DeleteEventsMethod } from "../../API/Api";
export default function DeleteEvents({ macAddress, }) {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";



  //value list
  const [values, setValues] = useState([
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

  // press submit button
  // const pressSubmitButton = async () => {
  //     try {
  //       const response = await DeleteEventsMethod(token);
  //       if(response.status===200){
  //         alert(JSON.stringify(response.data));

  //       }

  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  

 
 
  const pressSubmitButton = async () => {
    console.log(values);
    // const response = {
    //   "result": true,
    //   "msg": "DownloadFormatsCodes > Download Formats to ..."
    // };
    if (values ) {
      // alert(JSON.stringify(response));

    }

  }
  return (
    <div>
      <div>
        <fieldset>
          <legend>Delete Events</legend>
       
          <table style={{ width: "70%" }}>
                <tbody>
                  <tr>
                    <td>
                      <CommonTextFieldForm
                        type="text"
                        value={values[0]}
                        inputStyles={inputStyles}
                        placeholder="v1"
                        label="V1"
                        onChange={(e) => updateValueAtPosition(0, e.target.value)}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        type="text"
                        placeholder="v2"
                        value={values[1]}
                        inputStyles={inputStyles}
                        label="V2"
                        onChange={(e) => updateValueAtPosition(1, e.target.value)}
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
                    <td>
                      <CommonButton
                        label="Submit"
                        onClick={pressSubmitButton}
                        backgroundColor="#458a8c"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
        </fieldset>
      </div>
    </div>
  );
}
