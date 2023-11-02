import React, { useState } from 'react'
import CommonButton from '../../componets/CommonButton';
import CommonTextField from '../../componets/CommonTextField';
import { useSelector } from 'react-redux';

const RetrieveLogData = ({macAddress,LockID}) => {


    const token = useSelector((state) => state.logintoken.tokenValues.token);

  


    const pressContinuoueButton=async(e)=>{
        e.preventDefault()

        console.log(macAddress);
        console.log(LockID);


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
  <legend>Retrieve LogData</legend>
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

export default RetrieveLogData
