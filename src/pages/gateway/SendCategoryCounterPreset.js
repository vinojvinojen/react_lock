import React, { useState } from "react";
import CommonTextField from "../../componets/CommonTextField";
import CommonButton from "../../componets/CommonButton";
import CommonTextFieldForm from "../../componets/CommonTextFieldForm";
import { useSelector } from "react-redux";
import { SendCategoryCounterPresetPostMethod } from "../../API/Api";

export default function SendCategoryCounterPreset({ macAddress, LockID }) {
    const [formVisible, setFormVisible] = useState(false);
    const [categoryNumbers, setCategoryNumbers] = useState([0, 0, 0]);
    const [presetValue, setPresetValue] = useState("");
    const [presetCondition, setPresetCondition] = useState("");


    const inputStyles = {
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "5px",
        width: "50%",
    };

    const handleContinuoueButtonClick = () => {
        setFormVisible(!formVisible);
    };

    const token = useSelector((state) => state.logintoken.tokenValues.token);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            CategoryNumbers: categoryNumbers,
            PresetValue: parseInt(presetValue) || 0,
            PresetCondition: parseInt(presetCondition) || 0,
        };
        console.log(data);

        try {
            const response = await SendCategoryCounterPresetPostMethod(macAddress, LockID, data, token);

            if (response.status === 200) {

            }

        } catch (error) {
            console.log(error);
        }


    };

    return (
        <div>
            <div>
                <fieldset>
                    <legend>SendCategoryCounterPreset</legend>
                    <table>
                        <tbody>
                            {!formVisible && (
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
                                            onClick={handleContinuoueButtonClick}
                                            backgroundColor="green"
                                        >
                                            Add
                                        </CommonButton>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {formVisible && (
                        <div>
                            <h3>Fill Follow Form</h3>
                            <table style={{ width: "70%" }}>
                                <tbody>
                                    {categoryNumbers.map((value, index) => (
                                        <tr key={index}>
                                            <td>
                                                <CommonTextFieldForm
                                                    type="number"
                                                    value={value}
                                                    inputStyles={inputStyles}
                                                    placeholder={`v${index + 1}`}
                                                    label={`Category Number ${index + 1}`}
                                                    onChange={(e) => {
                                                        const newValue = parseInt(e.target.value) || 0;
                                                        const updatedCategoryNumbers = [...categoryNumbers];
                                                        updatedCategoryNumbers[index] = newValue;
                                                        setCategoryNumbers(updatedCategoryNumbers);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={3}>
                                            <CommonTextFieldForm
                                                type="number"
                                                placeholder="Enter Value"
                                                inputStyles={inputStyles}
                                                value={presetValue}
                                                onChange={(e) => setPresetValue(e.target.value)}
                                                label="Preset Value"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            <CommonTextFieldForm
                                                type="number"
                                                placeholder="Enter Value"
                                                inputStyles={inputStyles}
                                                value={presetCondition}
                                                onChange={(e) => setPresetCondition(e.target.value)}
                                                label="Preset Condition"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            <CommonButton
                                                label="Submit"
                                                onClick={handleSubmit}
                                                backgroundColor="#458a8c"
                                            />
                                        </td>
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
