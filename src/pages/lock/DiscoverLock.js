import React, { useState } from 'react'
import CommonButton from '../../componets/CommonButton';
import { useSelector } from 'react-redux';
import CommonTextField from '../../componets/CommonTextField';
import { DiscoverLockPost } from '../../API/Api';

const DiscoverLock = ({ macAddress }) => {
    const [selectedCount, setSelectedCount] = useState(1); // Default selected value

    const options = [];
    for (let i = selectedCount; i <= 10; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }

    const token = useSelector((state) => state.logintoken.tokenValues.token);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedCount);
        // const response=await GetEventsMethod(selectedCount,token);

        // if(response.status===200){

        // }

    //     try{
    //  const response=await DiscoverLockPost(macAddress,selectedCount,token)
    //  if(response.status===200){

    //  }

    //     }catch(error){
    //         console.log(error);
    //     }


    }

    const handleCountChange = (event) => {
        setSelectedCount(parseInt(event.target.value));
    };

    return (

        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CommonTextField
          type="text"
          label="Mac Address"
          value={macAddress}
          placeholder="XX-XX-XX-XX-XX-XX"
        />
        <label htmlFor="count">Select a Count: </label>
        <select
          name="count"
          id="count"
          onChange={handleCountChange}
          value={selectedCount}
        >
          {options}
        </select>
        <br />
        <CommonButton
          label="Get Event"
          backgroundColor="green"
          width="30vh"
          onClick={handleSubmit}
        />
        {selectedCount}
      </div>
      
    )
}

export default DiscoverLock
