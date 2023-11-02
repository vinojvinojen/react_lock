import React, { useEffect, useState } from 'react';
import { GetGatewayStatusMethod } from '../../API/Api';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../componets/LoadingSpinner ';

const Gateway_Status = ({ macAddress }) => {
  const token = useSelector((state) => state.logintoken.tokenValues.token);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetGatewayStatus = async () => {
    setLoading(true);
    try {
      const response = await GetGatewayStatusMethod(macAddress, token);

      if (response.status === 200) {
        setApiData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetGatewayStatus();
  }, []);

  return (
    <div>
     {apiData ? (
      <ul>
        <li>Result: {apiData.result.toString()}</li>
        <li>Message: {apiData.msg}</li>
        {/* <h6></h6> */}
        {apiData.gatewayStatus && ( // Check if gatewayStatus is defined
          <>
            <li>Gateway IP Address: {apiData.gatewayStatus.GatewayIpAddress}</li>
            <li>Version: {apiData.gatewayStatus.Version}</li>
            <li>Status: {apiData.gatewayStatus.Status}</li>
            <li>Group No Display: {apiData.gatewayStatus.GroupNoDisplay}</li>
            <li>Number of Locks: {apiData.gatewayStatus.NumberOfLocks}</li>
            {apiData.gatewayStatus.NumberOfLocks > 0 ? (
              <ul>
                {apiData.gatewayStatus.Locks.map((lock, index) => (
                  <li key={index}>
                    Lock ID: {lock.LockId}
                    <ul>
                      <li>Lock Type Text: sdfd</li>
                      <li>Lock Type: {lock.LockType}</li>
                      <li>Status Text: {lock.StatusText}</li>
                      <li>Status: {lock.Status}</li>
                      <li>Version: {lock.Version}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <li style={{color:"red"}}>No locks available</li>
            )}
            <li>Number of Repeaters: {apiData.gatewayStatus.NumberOfRepeaters}</li>
            {apiData.gatewayStatus.NumberOfRepeaters > 0 ? (
              <ul>
                {apiData.gatewayStatus.Repeaters.map((repeater, index) => (
                  <li key={index}>Repeater ID: {repeater.RepeaterId}</li>
                ))}
              </ul>
            ) : (
              <li style={{color:"red"}}>No repeaters available</li>
            )}
          </>
        )}
      </ul>
    ) : (
      <LoadingSpinner />
    )}
    </div>
  );
};

export default Gateway_Status;
