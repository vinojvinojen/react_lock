import React from "react";
import { useState } from "react";

const CommonPopup = ({ isOpen,setIsOpen}) => {
  return (
    isOpen && (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={setIsOpen(false)}>
            &times;
          </span>
          <p>sdf</p>
         
        </div>
      </div>
    )
  );
};

export default CommonPopup;
