import React, { useState } from 'react';

const CommonButton = ({ label, onClick, backgroundColor, width }) => {
  const [isHovered, setIsHovered] = useState(false);

  const additionalStyles = {
    backgroundColor: backgroundColor,
    color: "white",
    border: "none",
    borderRadius: "4%",
    width: width,
    fontWeight: 'normal',
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    margin: "8px",
    transition: 'background-color 0.3s ease', // Add transition for smooth color change

    // Apply hover styles
    ':hover': {
      backgroundColor: 'lightgreen', // Change the background color on hover
      cursor: 'pointer', // Change the cursor to a pointer on hover
    },

    // Apply active styles when clicked
    ':active': {
      backgroundColor: 'darkgreen', // Change the background color when clicked
    },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      className="button"
      style={{ ...additionalStyles, backgroundColor: isHovered ? '#21b017' : backgroundColor }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span style={{ fontWeight: 'bold' }}>{label}</span>
    </button>
  );
};

export default CommonButton;
