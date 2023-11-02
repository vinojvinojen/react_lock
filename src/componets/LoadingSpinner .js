// LoadingSpinner.js
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './LoadingSpinner.css'; // Import a CSS file for animations

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <AiOutlineLoading3Quarters style={{ fontSize: '24px', color: 'green' }} />
    </div>
  );
};

export default LoadingSpinner;
