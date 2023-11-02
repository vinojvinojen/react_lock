// Fieldset.js
import React from 'react';
import CommonTextField from '../componets/CommonTextField';
import CommonButton from '../componets/CommonButton';

export default function Fieldset({ legend, macAddress, ipAddress, onSubmitButtonClick }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <table>
        <tbody>
          <tr>
            <td>
            <CommonTextField label="Mac Address" value={macAddress} readOnly={true} />
            </td>
            <td>
              <CommonTextField label="Lock Id" value={ipAddress}  readOnly={true}  />
            </td>
            <td>
              <div style={{ marginTop: '20px' }}>
              <CommonButton label="Submit" backgroundColor="green" onClick={() => onSubmitButtonClick(legend)} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
}
