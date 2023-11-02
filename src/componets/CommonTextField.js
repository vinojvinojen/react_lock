import React from 'react';

function CommonTextField({ label, value, onChange, type, readOnly, fontSize, name }) {
  const inputStyles = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    width: "80h",
    margin: '8px',
    backgroundColor: readOnly ? '#5387db' : 'white', // Conditional background color
  };

  const handleChange = (e) => {
    if (typeof onChange === 'function') {
      // If onChange is a function, call it with the event and name
      onChange(e.target.value, name);
    }
  };

  return (
    <div>
      <div>
      <label style={{ margin: '2vh', fontWeight: 'normal', fontSize: `${fontSize}px` }}>{label}</label>

      </div>
      <input
        name={name}
        type={type}
        value={value  ||""}
        onChange={handleChange}
        style={inputStyles}
        readOnly={readOnly}
        
      />
    </div>
  );
}

export default CommonTextField;
