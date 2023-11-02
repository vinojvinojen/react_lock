import React from "react";
import CommonTextField from "./CommonTextField";
import CommonButton from "./CommonButton";
export default function Fieldset({ legend }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <table>
        <tbody>
          <tr>
            <td>
              <CommonTextField label="Mac Address" value={0} />
            </td>
            <td>
              <CommonTextField label="Lock Id" value={0} />
            </td>
            <td></td>
            <td>
              <div style={{ marginTop: "20px" }}>
                <CommonButton label="Submit" backgroundColor="green" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
}
