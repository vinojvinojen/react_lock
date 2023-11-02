import React, { useEffect, useState } from 'react';
import CommonTextField from '../../componets/CommonTextField';
import CommonButton from '../../componets/CommonButton';
import { AddLockPost } from '../../API/Api';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../componets/LoadingSpinner ';
import CommonTextFieldForm from '../../componets/CommonTextFieldForm';

const AddLock = ({ macAddress, reloadData, onSuccess, refreshLockForm, apiGateways, setAPIGateways, refreshAddLock }) => {
    const [formData, setFormData] = useState({
        GatewayMACAddress: macAddress,
        LockID: "",
        LockRFAddress: 0,
        Enable: 0,
        DoorStrikeTime: 0,
        EnableDegradeMode: 0,
        EnableKeypad: 0,
        Pin: 0,
        APBEntryArea: 0,
        APBExitArea: 0,
        APBType: 0,
        IsSoftAPB: 0,
        NumPinCodeAttempts: 0,
        KeypadDeadTimeAfterPin: 0,
        Is2CardControl: 0,
        OutputEnabled: 0,
        TrackTz: 0,
        RelayTime: 0,
        CRDuress: 0,
        CRApb: 0,
        CRDenied: 0,
        CRVoid: 0,
        OtlTime: 0,
        InputType: 0,
        BypassUnlocks: 0,
        ReportAccessAfterDoorOpen: 0,
        DoubleTap: 0,
        FreeAccessScheduleId: 0,
        PinAndCardScheduleId: 0,
        CardOnlyScheduleId: 0,
        DegradeModeScheduleId: 0,
        PinOnlyScheduleId: 0,
        RemoteBypassViaKeyFob: 0,
        LockControl: 0,
        EventRetrievalSchedule: 0,
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
        CategoryCode: 0,
        CategoryFilter: 0,
        HolidayCalendarId: 0
    });


    useEffect(() => {
        if (refreshAddLock) {
            // Perform any necessary refresh actions here

            // Reset the refreshAddLock prop to false

        }
    }, [refreshAddLock]);
    const token = useSelector((state) => state.logintoken.tokenValues.token);

    const [loading, setLoading] = useState(false);

    const formGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(6, auto)",
        gap: "2px",
    };

    const [currentStep, setCurrentStep] = useState(1);

    // Define the fields for each step
    const steps = {
        1: [
            "GatewayMACAddress",
            "LockID",
            "LockRFAddress",
            "Enable",
            "DoorStrikeTime",
            "EnableDegradeMode",
            "EnableKeypad",
            "Pin",
            "APBEntryArea",
            "APBExitArea",
            "APBType",
            "IsSoftAPB",
            "NumPinCodeAttempts",
            "KeypadDeadTimeAfterPin",
            "Is2CardControl",
            "OutputEnabled",
            "TrackTz",
            "RelayTime",
            "CRDuress",
            "CRApb",
            // Add the first set of fields
        ],
        2: [

            "CRDenied",
            "CRVoid",
            "OtlTime",
            "InputType",
            "BypassUnlocks",
            "ReportAccessAfterDoorOpen",
            "DoubleTap",
            "FreeAccessScheduleId",
            "PinAndCardScheduleId",
            "CardOnlyScheduleId",
            "DegradeModeScheduleId",
            "PinOnlyScheduleId",
            "RemoteBypassViaKeyFob",
            "LockControl",
            "EventRetrievalSchedule",
        ],
        3: [

            "Category1",
            "Category2",
            "Category3",
            "Category4",
            "Category5",
            "Category6",
            "Category7",
            "Category8",
            "Category9",
            "Category10",
            "Category11",
            "Category12",
            "Category13",
            "Category14",
            "Category15",
            "Category16",
            "CategoryCode",
            "CategoryFilter",
            "HolidayCalendarId"
        ]
        // Add more steps with fields as needed
    };

    const handleChange = (name, value) => {
        const numericValue = (name === 'LockID') ? value : (typeof value === 'string' ? parseInt(value, 10) : value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: numericValue,
        }));
    };




    const handleNextStep = () => {
        if (currentStep < Object.keys(steps).length) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const isLastStep = currentStep === Object.keys(steps).length;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        const josn = JSON.stringify(formData)

        try {
            setLoading(true); // Show loading screen
            const response = await AddLockPost(formData, token);

            if (response.status === 200) {
                // If the API call is successful, add the entry to the list
                if (response.data.retValue === true) {
                    // Successful response
                    console.log("API Success:", response.data.msg);
                    window.alert(response.data.msg);
                    reloadData();
                    if (onSuccess) {
                        onSuccess();
                    }

                } else {
                    window.alert(response.data.msg);
                }
            } else {
                // Handle API error here
                console.error('API Error:', response.data);
            }


            setFormData({
                LockID: "",
                // LockRFAddress: "",
                // Enable: "",
                // DoorStrikeTime: "",
                // EnableDegradeMode: "",
                // EnableKeypad: "",
                // Pin: "",
                // APBEntryArea: "",
                // APBExitArea: "",
                // APBType: "",
                // IsSoftAPB: "",
                // NumPinCodeAttempts: "",
                // KeypadDeadTimeAfterPin: "",
                // Is2CardControl: "",
                // OutputEnabled: "",
                // TrackTz: "",
                // RelayTime: "",
                // CRDuress: "",
                // CRApb: "",
                // CRDenied: "",
                // CRVoid: "",
                // OtlTime: "",
                // InputType: "",
                // BypassUnlocks: "",
                // ReportAccessAfterDoorOpen: "",
                // DoubleTap: "",
                // FreeAccessScheduleId: "",
                // PinAndCardScheduleId: "",
                // CardOnlyScheduleId: "",
                // DegradeModeScheduleId: "",
                // PinOnlyScheduleId: "",
                // RemoteBypassViaKeyFob: "",
                // LockControl: "",
                // EventRetrievalSchedule: "",
                // Category1: "",
                // Category2: "",
                // Category3: "",
                // Category4: "",
                // Category5: "",
                // Category6: "",
                // Category7: "",
                // Category8: "",
                // Category9: "",
                // Category10: "",
                // Category11: "",
                // Category12: "",
                // Category13: "",
                // Category14: "",
                // Category15: "",
                // Category16: "",
                // CategoryCode: "",
                // CategoryFilter: "",
                // HolidayCalendarId: ""
            });


            reloadData();

        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);

        } finally {
            setLoading(false); // Hide loading screen

        }

    };

    return (
        <>
            {loading && (
                <LoadingSpinner />

            )}
            <form style={formGridStyle}>
                {steps[currentStep].map((key) => (
                    <div key={key}>


                        {/* <CommonTextField
                            label={key}
                            inputType={(key === "GatewayMACAddress" || key === "LockID") ? "text" : undefined}
                            name={key}
                            value={formData[key]}
                            onChange={(value) => handleChange(key, value)} // Pass the event value and the field name
                       
                       /> */}

                        <CommonTextFieldForm
                            label={key}
                            type={key === 'GatewayMACAddress' || key === 'LockID' ? 'text' : 'number'}
                            value={formData[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                            readOnly={key === 'GatewayMACAddress'}

                        />
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {currentStep > 1 && (
                        <button type="button" style={{marginTop:"4vh", backgroundColor:"grey",width: "20vh", height: "5vh" }} onClick={handlePreviousStep}>Previous</button>
                    )}
                    {isLastStep ? (
                        <button type="button" style={{marginTop:"4vh", backgroundColor:"green", width: "100px", height: "5vh" }} onClick={handleSubmit} >Add Lock</button>
                    ) : (
                        <button type="button" style={{marginTop:"4vh", backgroundColor:"orange", width: "100px", height: "5vh" }} onClick={handleNextStep}>Next</button>
                    )}
                </div>
            </form>

        </>
    );
};

export default AddLock;