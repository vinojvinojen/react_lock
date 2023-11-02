import React, { useState } from 'react'
import CommonTextField from '../../componets/CommonTextField';
import CommonButton from '../../componets/CommonButton';
import { ManualLockCmdPost } from '../../API/Api';
import { useSelector } from 'react-redux';

const ManualLockCmd = ({ macAddress, LockID}) => {
    
    const [selectedCount, setSelectedCount] = useState(1); // Default selected value


    const handleCountChange = (event) => {
        setSelectedCount(parseInt(event.target.value));
    };

    const token = useSelector((state) => state.logintoken.tokenValues.token);

    const options = [];
    for (let i = selectedCount; i <= 10; i ++) {
        options.push(<option key={i} value={i}>{i}</option>);
    }


    const pressContinuoueButton=async(e)=>{
        e.preventDefault()

        console.log(macAddress);
        console.log(LockID);
        console.log(selectedCount);


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
  <legend>Manual Lock CmdPost</legend>
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
        <label htmlFor="count">Select a command:</label>
        <select
          name="count"
          id="count"
          onChange={handleCountChange}
          value={selectedCount}
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

export default ManualLockCmd
