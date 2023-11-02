import React, { useEffect, useState } from 'react';
import CommonTextField from '../../componets/CommonTextField';
import CommonButton from '../../componets/CommonButton';
import { AddLockPost } from '../../API/Api';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../componets/LoadingSpinner ';

const LockDown = ({ macAddress, LockID }) => {
    const [formData, setFormData] = useState({

        CommandType: '',
        LockdownNo: '',
        IsActivate: '',
        IsDenyAccess: '',
        Category1: '',
        Category2: '',
        Category3: "",
        Category4: "",
        Category5: "",
        Category6: "",
        Category7: "",
        Category8: "",
        Category9: "",
        Category1: "",
        Category11: "",
        Category12: "",
        Category13: "",
        Category14: "",
        Category15: "",
        Category16: "",
    });


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
            "CommandType",
            "LockdownNo",
            "IsActivate",
            "IsDenyAccess",
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
        ],

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

        console.log(formData);
        //         try {
        //             setLoading(true); // Show loading screen
        //             const response = await AddLockPost(formData, token);

        //             if (response.status === 2"""") {
        //                 // If the API call is successful, add the entry to the list
        //                 if (response.data.retValue === true) {
        //                     // Successful response
        //                     console.log("API Success:", response.data.msg);
        //                     window.alert(response.data.msg);


        //                 } else {
        //                     window.alert(response.data.msg);
        //                 }
        //             } else {
        //                 // Handle API error here
        //                 console.error('API Error:', response.data);
        //             }

        //             // Assuming you get a successful response from the API and the added lock data
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

        // //           Reset the form data

        //         setFormData({
        //         GatewayMACAddress: macAddress,
        //         LockID: "",
        //         LockRFAddress: 231,
        //         Enable: 1,
        //         DoorStrikeTime: 5,
        //         // ... (other fields)
        //       });



        //         } catch (error) {
        //             // Handle network or other errors
        //             console.error('Error:', error);

        //         } finally {
        //             setLoading(false); // Hide loading screen

        //         }

    };

    return (
        <div>
            {loading && (
                <LoadingSpinner />

            )}

            <p style={{ color: "red" }}>            macAddress: {macAddress}  && LockId = {LockID}</p>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1""px' }}>

                    <CommonButton label="Add Lockdown" backgroundColor="green" width="30vh" onClick={handleSubmit} />

                </div>
            </form>

        </div>
    );
};

export default LockDown;