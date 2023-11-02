import React, { useState } from 'react'
import CommonButton from '../../componets/CommonButton';
import { useSelector } from 'react-redux';

const GetLastLogMessages = () => {
    const [selectedCount, setSelectedCount] = useState(10); // Default selected value

    const options = [];
    for (let i = selectedCount; i <= 500; i += 10) {
        options.push(<option key={i} value={i}>{i}</option>);
    }

    const token = useSelector((state) => state.logintoken.tokenValues.token);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedCount);
        // const response=await GetEventsMethod(selectedCount,token);

        // if(response.status===200){

        // }


    }

    const handleCountChange = (event) => {
        setSelectedCount(parseInt(event.target.value));
    };

    return (
        <div style={{ alignContent: "center" }}>
            <label htmlFor="count">Select an Count: </label>
            <select name="count"
                id="count"
                onChange={handleCountChange}
                value={selectedCount}>
                {options}
            </select>

            <br />
            <CommonButton label="GetLastLogMessages" backgroundColor="green" width="30vh"
                onClick={handleSubmit}
            />
{selectedCount}
        </div>

    );
}

export default GetLastLogMessages
