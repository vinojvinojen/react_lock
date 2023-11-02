import React, { useState } from 'react'
import CommonTextField from '../../componets/CommonTextField';
import CommonButton from '../../componets/CommonButton';
import { useSelector } from 'react-redux';

const SetOutput = ({macAddress,LockID}) => {
    const [selectedRelayNo, setSelectedRelayNo] = useState(1); // Default selected value
    const [selectedCommand, setSelectedCommand] = useState(1); // Default selected value
    const [selectedTimeSec, setSelectedTimeSec] = useState(1); // Default selected value


    const handleRelayNoChange = (event) => {
        setSelectedRelayNo(parseInt(event.target.value));
    };


    const handleCommandChange = (event) => {
        setSelectedCommand(parseInt(event.target.value));
    };

    const handleTimeSecChange = (event) => {
        setSelectedTimeSec(parseInt(event.target.value));
    };



    const token = useSelector((state) => state.logintoken.tokenValues.token);

    const options = [];
    for (let i = 1; i <= 10; i ++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }


    const pressContinuoueButton=async(e)=>{
        e.preventDefault()

        console.log(macAddress);
        console.log(LockID);
        console.log(selectedRelayNo);
        console.log(selectedCommand);
        console.log(selectedTimeSec);


//     try{
// const response=await ManualLockCmdPost(macAddress,LockID,selectedCount,token)
// if(response.status===200){
    
// }
//     }catch(error){

//     }
    }


  return (
    <div>
   <fieldset>
  <legend>Set Output</legend>
  <table>
  <tbody>
    <tr>
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
          pattern="[0-9]+"
          label="Lock ID"
          value={LockID}
          placeholder="4234232"
        />
      </td>
        </tr>
    <tr>
    <td>
        <label htmlFor="count">Select a relayNo:</label>
        <select
          name="count"
          id="count"
          onChange={handleRelayNoChange}
          value={selectedRelayNo}
        >
          {options}
        </select>
      </td>
      </tr>
    <tr>
    <td>
        <label htmlFor="count">Select a command:</label>
        <select
          name="count"
          id="count"
          onChange={handleCommandChange}
          value={selectedCommand}
        >
          {options}
        </select>
      </td>        </tr>
    <tr>
    <td>
        <label htmlFor="count">Select a timeSec:</label>
        <select
          name="count"
          id="count"
          onChange={handleTimeSecChange}
          value={selectedTimeSec}
        >
          {options}
        </select>
      </td>
  
    </tr>

   
    </tr>
    <tr>
    <td>
        <CommonButton
          label="Submit"
          onClick={pressContinuoueButton}
          backgroundColor="green"
        >
          Add
        </CommonButton>
      </td>
    </tr>
  </tbody>
</table>

</fieldset>

  </div>
  )
}

export default SetOutput
