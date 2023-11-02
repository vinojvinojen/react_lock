import React, { useEffect, useState } from 'react';
import CommonTextField from '../../componets/CommonTextField';
import CommonButton from '../../componets/CommonButton';
import { AddLockPost } from '../../API/Api';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../componets/LoadingSpinner ';

const ReplaceLock = ({ macAddress, LockID, reloadData,refreshAddLock }) => {
    const [formData, setFormData] = useState({
        OldLockID: LockID,
        GatewayMACAddress: macAddress,
        LockID: "",
        LockRFAddress: 231,
        DoorStrikeTime: 5,
        EnableDegradeMode: 0,
        EnableKeypad: 0,
        Pin: 0,
        APBEntryArea: 0,
        APBExitArea: 0,
        APBType: 2,
        IsSoftAPB: 0,
        NumPinCodeAttempts: 0,
        KeypadDeadTimeAfterPin: 0,
        Is2CardControl: 0,
        OutputEnabled: 0,
        TrackTz: 0,
        RelayTime: 4,
        CRDuress: 0,
        CRApb: 0,
        CRDenied: 0,
        CRVoid: 0,
        OtlTime: 75,
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
        HolidayCalendarId: 0,
      });
      
      // Then, when you want to construct the object, you can simply use formData:
      useEffect(() => {
        if (refreshAddLock) {
          // Perform any necessary refresh actions here
    
          // Reset the refreshAddLock prop to false
        
        }
      }, [refreshAddLock]);
      const requestData = {
        OldLockID: formData.OldLockID,
        NewLockData: {
          GatewayMACAddress: formData.GatewayMACAddress,
          ...formData, // Include all other properties from formData
        },
      };
      
    const token = useSelector((state) => state.logintoken.tokenValues.token);

    const [loading, setLoading] = useState(false);

    const formGridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(6, auto)",
        gap: "1px",
    };
    const [currentStep, setCurrentStep] = useState(1);

    // Define the fields for each step
    const steps = {
        1: [
            "GatewayMACAddress",
            "OldLockID",
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
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


        // try {
        //     setLoading(true); // Show loading screen
        //     const response = await AddLockPost(formData, token);

        //     if (response.status === 200) {
        //         // If the API call is successful, add the entry to the list
        //         if (response.data.retValue === true) {
        //             // Successful response
        //             console.log("API Success:", response.data.msg);
        //             window.alert(response.data.msg);
        //             reloadData();
        //             // if (onSuccess) {
        //             //     onSuccess();
        //             //   }

        //         } else {
        //             window.alert(response.data.msg);
        //         }
        //     } else {
        //         // Handle API error here
        //         console.error('API Error:', response.data);
        //     }

        //     // Assuming you get a successful response from the API and the added lock data
        //     // const newLockData = { ...formData };
        //     //   // Retrieve the existing gateway data from local storage
        //     //   const existingGatewayData = JSON.parse(localStorage.getItem('gatewayData')) || [];

        //     //         // Find the gateway data in the existing data array based on MAC address
        //     // const gatewayIndex = existingGatewayData.findIndex((gateway) => gateway.macAddress === macAddress);

        //     // if (gatewayIndex !== -1) {
        //     //     // Add the new lock data to the existing gateway's Locks array
        //     //     existingGatewayData[gatewayIndex].Locks.push(newLockData);

        //     //     // Update the local storage with the modified data
        //     //     localStorage.setItem('gatewayData', JSON.stringify(existingGatewayData));
        //     //   }

        //     //           Reset the form data

        //     setFormData({
        //         GatewayMACAddress: macAddress,
        //         LockID: "",
        //         LockRFAddress: 231,
        //         Enable: 1,
        //         DoorStrikeTime: 5,
        //         // ... (other fields)
        //     });


        //     reloadData();

        // } catch (error) {
        //     // Handle network or other errors
        //     console.error('Error:', error);

        // } finally {
        //     setLoading(false); // Hide loading screen

        // }

        console.log(formData);

    };

    return (
        <div>
            {loading && (
                <LoadingSpinner />

            )}
            <form style={formGridStyle}>
                {steps[currentStep].map((key) => (
                    <div key={key}>


                        <CommonTextField
                            label={key}
                            name={key}
                            value={formData[key]}
                            onChange={(value) => handleChange(key, value)} // Pass the event value and the field name
                        />
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>

                    {currentStep > 1 && (
                        <button type="button" style={{ width: "100px", height: "50px" }} onClick={handlePreviousStep}>Previous</button>
                    )}
                    {isLastStep ? (
                        <CommonButton label="Add Gateway" backgroundColor="green" width="30vh" onClick={handleSubmit} />
                    ) : (
                        <button type="button" style={{ width: "100px", height: "50px" }} onClick={handleNextStep}>Next</button>
                    )}
                </div>
            </form>

        </div>
    );
};

export default ReplaceLock;