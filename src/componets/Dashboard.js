import React, { useState } from "react";
import "../App.css";
import GatewayForm from "./GatewayForm";
import Topbar from "./Topbar";
import Downloads from "./Downloads/Downloads";
import Batch from "./Batch/Batch";
import Repeter from "./Repeater/Repeter";

const Dashboard = ({}) => {
  const [leftWidth, setLeftWidth] = useState(300);
  const [showGatewayForm, setShowGatewayForm] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [showRepeater, setShowRepeter] = useState(false);
  const [entries, setEntries] = useState([]); // Define the entries state here

  const handleMouseDown = (e) => {
    // Handle resizing here if needed
  };

  

  const handleDelete = (index) => {
    // Implement the logic to delete an entry at the given index
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const handleAdd = (newEntry) => {
    // Implement the logic to add a new entry to the list
    setEntries([...entries, newEntry]);
  };

  const handleReset = () => {
    // Implement the logic to reset a specific entry
  };

  const handleShowGatewayFormClick = () => {
    setShowGatewayForm(!showGatewayForm);
    setShowDownloads(false);
    setShowBatch(false);
    setShowRepeter(false)
  };

  const handleShowDownloadsClick = () => {
    setShowDownloads(!showDownloads);
    setShowGatewayForm(false);
    setShowBatch(false);
    setShowRepeter(false)
  };

  const handleShowBatchClick = () => {
    setShowBatch(!showBatch);
    setShowGatewayForm(false);
    setShowDownloads(false);
    setShowRepeter(false)
  };

  const handleShowRepeterClick = () => {
    setShowBatch(false);
    setShowGatewayForm(false);
    setShowDownloads(false);
    setShowRepeter(!showRepeater)
  };
  const handleActionChange = (event, index) => {
    const selectedAction = event.target.value;
    if (selectedAction === "delete") {
      handleDelete(index);
    } else if (selectedAction === "reset") {
      handleReset(index);
    }
  };
  return (
    <div>
      <Topbar
        handleShowGatewayFormClick={handleShowGatewayFormClick}
        handleDownloadClick={handleShowDownloadsClick}
        handleBatchClick={handleShowBatchClick}
        handleShowRepeterClick={handleShowRepeterClick}
      />
      <div className="content">
        <div
          className="content-left"
          style={{ width: leftWidth + "px" }}
          onMouseDown={handleMouseDown}
        >
          <table className="custom-table">
            <thead>
              <tr>
                <th>Mac Address</th>
                <th>IP Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.macAddress}</td>
                  <td>{entry.ipAddress}</td>
                  <td>
                    <select
                      value=""
                      onChange={(event) => handleActionChange(event, index)}
                    >
                      <option value="" disabled hidden>
                        action
                      </option>
                      <option value="delete">Add Lock</option>
                      <option value="delete">Replace</option>

                      <option value="delete">Delete</option>
                      <option value="reset">Reset</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="content-right">
          {showGatewayForm && <GatewayForm setEntries={setEntries} />}
          {showDownloads && <Downloads />}
          {showBatch && <Batch />}
          {showRepeater && <Repeter />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
