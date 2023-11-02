import React, { useState } from 'react';
import CommonButton from '../../componets/CommonButton';
import { GetEventsMethod } from '../../API/Api';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../componets/LoadingSpinner ';
import './GetEvents.css'
function GetEvents() {
    const [selectedCount, setSelectedCount] = useState(10); // Default selected value
    const [loading, setLoading] = useState(false)
    const [apiData, setApiData] = useState(null);
    const [showDisplay, setShowDisplay] = useState(false);
    const options = [];
    for (let i = selectedCount; i <= 500; i += 10) {
        options.push(<option key={i} value={i}>{i}</option>);
    }

    const token = useSelector((state) => state.logintoken.tokenValues.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const count = selectedCount;
        setLoading(true);
        try {
            const response = await GetEventsMethod(count, token);
            if (response.status === 200) {
                setApiData(response.data);
                setShowDisplay(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleCountChange = (event) => {
        setSelectedCount(parseInt(event.target.value));
    };

    return (
        <div style={{ alignContent: "center" }}>
        <label htmlFor="count">Select an Count: </label>
        <select name="count"
            id="count"
            onChange={handleCountChange}
            value={selectedCount}>
            {options}
        </select>
        <br />
        <CommonButton label="Get Event" backgroundColor="green" width="30vh" onClick={handleSubmit} />
        {showDisplay && (
            <div className="event-table"> {/* Apply a CSS class for styling */}
                {apiData ? (
                        <div className="table-container"> {/* Apply a CSS class for the table container */}

                    <table>
                        <thead>
                            <tr>
                                <th>SeqId</th>
                                <th>Event Date</th>
                                <th>LockId</th>
                                <th>Device No</th>
                                <th>Device Type</th>
                                <th>Event Code</th>
                                <th>Facility</th>
                                <th>Badge</th>
                                <th>Apb Area</th>
                                <th>Issue</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.events.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.SeqId}</td>
                                    <td>{event.EventDate}</td>
                                    <td>{event.LockId}</td>
                                    <td>{event.DeviceNo}</td>
                                    <td>{event.DeviceType}</td>
                                    <td>{event.EventCode}</td>
                                    <td>{event.Facility}</td>
                                    <td>{event.Badge}</td>
                                    <td>{event.ApbArea}</td>
                                    <td>{event.Issue}</td>
                                    <td>{event.LastUpdated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        )}
    </div>
    );
}

export default GetEvents;
