import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clock.css'
import { SetClockPost } from '../../API/Api';
import LoadingSpinner from '../../componets/LoadingSpinner ';
import { useSelector } from 'react-redux';

function Clock({ macAddress }) {
  const [customTime, setCustomTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state) => state.logintoken.tokenValues.token);

  const [loading, setLoading] = useState(false);

  const handleTimeChange = async () => {
    if (isEditing) {

      setLoading(true)
      try {
        console.log(customTime.toISOString());

        const response = await SetClockPost(macAddress, customTime.toISOString(), token);
        if (response.status === 200) {
          console.log(response.data);
          window.alert(`${response.data}`)
        }


      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }



    }

    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isEditing) {
        setCustomTime(new Date());
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isEditing]);

  const handleYearChange = (e) => {
    const newTime = new Date(customTime);
    const year = parseInt(e.target.value);

    if (!isNaN(year)) {
      newTime.setFullYear(year);
      setCustomTime(newTime);
    }
  };

  const handleMonthChange = (e) => {
    const newTime = new Date(customTime);
    const month = parseInt(e.target.value) - 1; // Adjust for 0-based index

    if (!isNaN(month) && month >= 0 && month <= 11) {
      newTime.setMonth(month);
      setCustomTime(newTime);
    }
  };

  const handleDayChange = (e) => {
    const newTime = new Date(customTime);
    const day = parseInt(e.target.value);

    if (!isNaN(day) && day >= 1 && day <= 31) {
      newTime.setDate(day);
      setCustomTime(newTime);
    }
  };

  const handleHourChange = (e) => {
    const newTime = new Date(customTime);
    const hour = parseInt(e.target.value);

    if (!isNaN(hour) && hour >= 0 && hour <= 23) {
      newTime.setHours(hour);
      setCustomTime(newTime);
    }
  };

  const handleMinuteChange = (e) => {
    const newTime = new Date(customTime);
    const minute = parseInt(e.target.value);

    if (!isNaN(minute) && minute >= 0 && minute <= 59) {
      newTime.setMinutes(minute);
      setCustomTime(newTime);
    }
  };

  const handleSecondChange = (e) => {
    const newTime = new Date(customTime);
    const second = parseInt(e.target.value);

    if (!isNaN(second) && second >= 0 && second <= 59) {
      newTime.setSeconds(second);
      setCustomTime(newTime);
    }
  };


  return (
    <div className="wall-clock">
      {loading && (
        <LoadingSpinner />

      )}
      <div className='field'>
        <div style={{ display: "flex" }}>
          <label>Mac:</label>

        </div>
        <input style={{ display: "flex" }} type="text" value={macAddress} onChange={handleYearChange} disabled={!isEditing} />
      </div>

      <div className='field'>
        <div style={{ display: "flex" }}>

          <label>Year:</label>
        </div>
        <input style={{ display: "flex" }} type="number" value={customTime.getFullYear()} onChange={handleYearChange} disabled={!isEditing} />
      </div>

      <div className='field'>
      <div style={{ display: "flex" }}>

        <label>Month:</label>
        </div>
        <input  style={{ display: "flex" }}type="number" value={customTime.getMonth() + 1} onChange={handleMonthChange} disabled={!isEditing} />
      </div>
      <div className='field'>
      <div style={{ display: "flex" }}>

        <label>Day:</label>
        </div>
        <input  style={{ display: "flex" }}type="number" value={customTime.getDate()} onChange={handleDayChange} disabled={!isEditing} />
      </div>
      <div className='field'>
      <div style={{ display: "flex" }}>

        <label>Hour:</label>
        </div>
        <input style={{ display: "flex" }} type="number" value={customTime.getHours()} onChange={handleHourChange} disabled={!isEditing} />
      </div>
      <div className='field'>
      <div style={{ display: "flex" }}>

        <label>Minute:</label>
        </div>
        <input style={{ display: "flex" }} type="number" value={customTime.getMinutes()} onChange={handleMinuteChange} disabled={!isEditing} />
      </div>
      <div className='field'>
      <div style={{ display: "flex" }}>
        <label >Second:</label>
        </div>
        <input  style={{ display: "flex" }}type="number" value={customTime.getSeconds()} onChange={handleSecondChange} disabled={!isEditing} />
      </div>
      <button style={{ backgroundColor: "green", display:"flex"}} onClick={handleTimeChange}>
        {isEditing ? "Save Time" : "Edit Time"}
      </button>
            <p>{customTime.toISOString()}</p>

    </div>
  );
}

export default Clock;
