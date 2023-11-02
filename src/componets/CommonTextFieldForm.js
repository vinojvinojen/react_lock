// import React from "react";

// function CommonTextFieldForm({
//   label,
//   value,
//   onChange,
  
//   type,
//   placeholder,
//   inputStyles,
//   pattern,readOnly
// }) {
//   return (
//     <div>
//       <div>
//       <label style={{ margin: "2vh", fontWeight: "normal" }}>{label}</label>

//       </div>
//       <input
//         type={type}
//         value={value}
//         pattern={pattern}
//         placeholder={placeholder}
//         onChange={(e) => onChange(e)}
//         style={inputStyles}
//         readOnly={readOnly}
//       />
//     </div>
//   );
// }

// export default CommonTextFieldForm;

import React from "react";

function CommonTextFieldForm({
  label,
  value,
  onChange,
  type,
  placeholder,
  inputStyles,
  pattern,
  name
}) {
  return (
    <div>
      <label style={{ margin: "2vh", fontWeight: "normal" }}>{label}</label><br />
      <input
        type={type}
        value={value}
        pattern={pattern}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        style={inputStyles}
        name={name}
      />
    </div>
  );
}

export default CommonTextFieldForm;
