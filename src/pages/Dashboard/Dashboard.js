import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import GatewayForm from '../gateway/AddGateway';
import Topbar from '../../componets/Topbar';
import Downloads from '../Downloads';
import { CiMenuKebab } from 'react-icons/ci';
import { BiRightArrow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReplaceGateway from '../gateway/ReplaceGateway';
import {
  GetAllLockStatusMethod,
  GetGatewayHostServerIP, GetGatewayStatusMethod, ReadApiConfig, RemoveGateway, RemoveLockFromGateway, ResetApbPost, ResetGateway,
  ResetLock, UpdateGatewayFirmware, WriteConfigToGateway
} from '../../API/Api';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import LoadingSpinner from '../../componets/LoadingSpinner ';
import { useSelector } from 'react-redux';
import AddLock from '../lock/AddLock';
import DownloadFormats from '../Download/DownloadFormats';
import DownloadFacilityCodes from '../Download/DownloadFacilityCodes';
import DownloadHolidayDate from '../Download/DownloadHolidayDate';
import DownloadCategories from '../Download/DownloadCategories';
import DownloadTimezoneData from '../Download/DownloadTimezoneData';
import ChangeGatewayHostServerIp from '../gateway/ChangeGatewayHostServerIp';
import AddTimezone from '../gateway/TimezonePage';
import DraggableDivider from '../../componets/DraggableDivider';
import Gateway_Status from '../gateway/Gateway_Status';
import ReplaceLock from '../lock/ReplaceLock';
import FullDownlaod from '../../componets/Downloads/components/FullDownlaod';
import TimeZone from '../gateway/TimezonePage';
import DownlaodPage from '../Download/DownlaodPage';
import TimezonePage from '../gateway/TimezonePage';
import GetEvents from '../lock/EventsPage';
import EventsPage from '../lock/EventsPage';
import DiscoverLock from '../lock/DiscoverLock';
import ManualLockCmd from '../lock/ManualLockCmd';
import LockPage from '../lock/LockPage';
import Batch from '../../componets/Batch/Batch';
import Repeter from '../../componets/Repeater/Repeter';
import GetLastLogMessages from './GetLastLogMessages';
import Clock from '../gateway/Clock';


const Dashboard = ({ }) => {

  const [showGatewayList, setShowGatewayList] = useState(true);

  const [selectedIpAddress, setSelectedIpAddress] = useState(""); // Track selected ipAddress

  const [selectedLockId, setSelectedLockId] = useState(null)
  const [macAddress, setMacAddress] = useState("");
  const [lockId, setLockId] = useState("");

  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [locks, setLocks] = useState([]);
  const [sections, setSections] = useState({
    showGatewayForm: false,
    showLockForm: false,
    showReplaceGateway: false,
    showDownloads: false,
    showChangeGatewayHostServerIp: false,
    showTimezone: false,
    showSetClock: false,
    showSetGatewayStatus: false,
    showSetReplaceLock: false,
    setShowFullDownload: false,
    setShowDownload: false,
    setShowGetEventsPage: false,
    setShowDiscoverLock: false,
    setShowLockPage: false,
    setShowBadgePage: false,
    setShowRepeaterPage: false,
    isShowOpenGetLastLogMessages: false




  });

  const [refreshAddLock, setRefreshAddLock] = useState(false);

  const [apiGateways, setAPIGateways] = useState([]);

  const [leftWidth, setLeftWidth] = useState('30%');
  const [rightWidth, setRightWidth] = useState('70%');
  // dragable
  const handleDrag = (e) => {
    const containerWidth = document.documentElement.clientWidth;
    const mouseX = e.clientX;

    // Calculate the new left width and right width
    let newLeftWidth = (mouseX / containerWidth) * 100;
    let newRightWidth = 100 - newLeftWidth;

    // Limit the maximum right column width to 70% and the minimum to 10%
    if (newRightWidth > 70) {
      newRightWidth = 70;
      newLeftWidth = 100 - newRightWidth;
    } else if (newRightWidth < 60) {
      newRightWidth = 60;
      newLeftWidth = 100 - newRightWidth;
    }

    setLeftWidth(`${newLeftWidth}%`);
    setRightWidth(`${newRightWidth}%`);
  };

  // dragable



  useEffect(() => {
    // Retrieve the existing gateway data from local storage
    // readApiConfig()
    // reloadData()
    const API_BASE_URL = 'https://testapi-wpwh.onrender.com/APIGateways';

    const readApiConfig = async () => {
      try {
        // Make an Axios GET request to retrieve the data
        const response = await axios.get(API_BASE_URL);
        // const response=await ReadApiConfig(token)
        // setAPIGateways(response.data[0].APIGateways); // Access APIGateways within the response structure
        // setLocks(locks);
        setAPIGateways(response.data); // Access APIGateways within the response structure

        console.log(response.data);
      } catch (error) {
        console.error("Error reading API config:", error);
      }
    };

    // Call the readApiConfig function to retrieve API gateways
    readApiConfig();
  }, []);
  const token = useSelector((state) => state.logintoken.tokenValues.token);

  const [isDropdownOpen, setIsDropdownOpen] = useState([]);

  const toggleDropdown = (index) => {
    const updatedIsDropdownOpen = [...isDropdownOpen];
    updatedIsDropdownOpen[index] = !updatedIsDropdownOpen[index];
    setIsDropdownOpen(updatedIsDropdownOpen);
  };



  const toggleSection = (sectionName) => {
    setSections((prevSections) => ({
      ...Object.keys(prevSections).reduce((acc, key) => {
        acc[key] = key === sectionName;
        return acc;
      }, {}),
    }));
  };









  const reloadData = () => {
    // readApiConfig();
    // const existingGatewayData = JSON.parse(localStorage.getItem('gatewayData')) || [];
    // setGatewayData(existingGatewayData);
  };




  const handleShowGatewayFormClick = () => {
    toggleSection('showGatewayForm');

  };

  const [addLockKey, setAddLockKey] = useState(1); // Initialize the key

  const handleAddLock = (macAddress) => {
    toggleSection('showLockForm');
    setMacAddress(macAddress)

    // Change the key to trigger a reload
    setAddLockKey(addLockKey + 1);


  };



  const handleRemoveGateway = async (macAddress) => {
    const confirmed = window.confirm(`Are you sure you want to remove this ${macAddress} gateway?`);

    if (confirmed) {
      console.log(`Removing Gateway... ${macAddress}`);

      setLoading(true);

      try {
        const response = await RemoveGateway(macAddress, token);

        if (response.status === 200) {
          if (Array.isArray(response.data) && response.data[0] === true) {
            const alertMessage = response.data[1];
            // Remove the item from local storage
            const updatedGatewayData = apiGateways.filter(entry => entry.MACAddress !== macAddress);
            // setAPIGateways(updatedGatewayData); // Update the state with the removed gateway
            window.alert(alertMessage);
            localStorage.removeItem("macAddress")
          } else {
            window.alert(response.data);
          }
        } else {
          console.error('API Error:', response.data);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
      finally {
        setLoading(false);

      }
    }
  };


  const handleResetGateway = async (macAddress) => {

    const confirmed = window.confirm(`Are you sure you want to reset this ${macAddress} gateway?`);

    if (confirmed) {
      console.log(`restting Gateway... ${macAddress}`);


      setLoading(true)

      try {
        const response = await ResetGateway(macAddress, token);

        if (response.status === 200) {
          window.alert(`Reset the Gateway: ${response.data}`);
        } else {
          console.error('API Error:', response.data);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
      finally {
        setLoading(false)
      }
    }
  }


  const handleRemoveLockFromGateway = async (macAddress, lock) => {
    const confirmed = window.confirm(`Are you sure you want to remove this ${lock} from ${macAddress}gateway?`);

    if (confirmed) {
      console.log(`remove Gateway... ${lock} `);

      setLoading(true);

      try {
        const response = await RemoveLockFromGateway(macAddress, lock, token);

        if (response.status === 200) {
          const responseData = response.data;

          window.alert(`Remove the Lock: ${responseData.msg}`);
          console.log(response);

          // setAPIGateways((prevGateways) => {
          //   return prevGateways.map((gateway) => {
          //     if (gateway.MACAddress === macAddress) {
          //       // Filter out the lock with the given LockId
          //       const updatedLocks = gateway.Locks.filter((l) => l.LockId !== lock.LockId);
          //       return { ...gateway, Locks: updatedLocks };
          //     }
          //     return gateway;
          //   });
          // });
          reloadData()

        } else {
          console.error('API Error:', response.data);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error Lock :', error);
      }
      finally {
        setLoading(false)
      }
    }



  }
  const handleReplaceGateway = (macAddress) => {
    toggleSection('showReplaceGateway');

  };


  const handleShowLocks = (macAddress) => {
    if (activeLocks === macAddress) {
      setActiveLocks(null); // Close the lock list
    } else {
      setActiveLocks(macAddress); // Open the lock list
    }
  }

  const handleUpdateGatewayFirmware = async (macAddress) => {

    const confirmed = window.confirm(`Are you sure you want to Update Gateway Firmware this ${macAddress} gateway?`);

    if (confirmed) {
      console.log(`UpdateGatewayFirmware ... ${macAddress}`);


      setLoading(true)

      try {
        const response = await UpdateGatewayFirmware(macAddress, token);

        if (response.status === 200) {
          window.alert(`UpdateGatewayFirmware : ${response.data.result} ${response.data.msg}`);
          console.log(response.data);
        } else {
          console.error('API Error:', response.data);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
      finally {
        setLoading(false)
      }
    }
  }

  // ChangeGatewayHostServerIp

  const handleChangeGatewayHostServerIp = (mac) => {
    toggleSection('showChangeGatewayHostServerIp');


  }

  // GetGatewayHostServerIP
  const handleGetGatewayHostServerIP = async (macAddress) => {
    console.log(macAddress);
    // const response = {
    //   "result": true,
    //   "msg": "GetGatewayHostServerIp > Gateway MAC [00204AF8CD66],Suceed",
    //   "gatewayHostIp": {
    //     "IpAddress": "192.168.8.100",
    //     "Port": 10050,
    //     "result": "Success" // Adding a "result" property for gatewayHostIp
    //   }
    // }
    setLoading(true);

    try {
      const response = await GetGatewayHostServerIP(macAddress, token)
      if (response.status === 200) {
        console.log(response.data);
        window.alert(`${response.data.result} ${response.data.msg}\nGateway Host IP Details:\n${JSON.stringify(response.data.gatewayHostIp, null, 2)}`);
        const result = response.result;
        const msg = response.msg;
        const gatewayHostIp = response.gatewayHostIp;
        const ipAddress = gatewayHostIp.IpAddress;
        const port = gatewayHostIp.Port;
        console.log(`Result: ${result}`);
        console.log(`Message: ${msg}`);
        console.log(`IP Address: ${ipAddress}`);
        console.log(`Port: ${port}`);
        // Handle the response as needed
      } else {
        console.error('Request failed with status:', response.status);
      }
    }
    catch (error) {
      console.error('Request failed with status:', error);

    } finally {
      // Set loading to false when the operation is done, whether it succeeds or fails.
      setLoading(false);
    }

  }



  // WriteConfigToGateway
  const handleWriteConfigToGateway = async (macAddress) => {

    setLoading(true);

    try {
      const response = await WriteConfigToGateway(macAddress, token);


      if (response.status === 200) {

        window.alert(response.data.msg)

      }
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading to false when the operation is done, whether it succeeds or fails.
      setLoading(false);
    }

  }


  // ResetApb

  const handleResetApb = async (macAddress, lock) => {
    const confirmed = window.confirm(`Are you sure you want to ResetApb this ${macAddress} from ${lock}gateway?`);
    console.log("dfvdfvdf", macAddress);
    console.log("dfvdfvdf", lock);

    if (confirmed) {
      console.log(`ResetApb Gateway ${lock}...  lock ${lock} `);

      setLoading(true);


      try {
        const response = await ResetApbPost(macAddress, lock, token);
        if (response.status === 200) {
          window.alert(`${response.data.result} ${response.data.msg}`)
          console.log("sdsvs");
          console.log(response.data);
        }

      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }

  }

  // gateway status
  const handleGetGatewayStatus = (mac) => {
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    setMacAddress(macAddress);
    toggleSection("showSetGatewayStatus");
    console.log(macAddress);

  }

  // AddTimezone

  const handleTimezone = (mac, LockId) => {

    toggleSection("showTimezone")
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    const lock = selectedLockID(LockId);
    setMacAddress(macAddress);
    setLockId(lock);
    setAddLockKey(addLockKey + 1);

  }

  // SetClock
  const handleSetClock = (mac) => {
    console.log(mac);
    toggleSection('showSetClock');
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    setMacAddress(macAddress);

  }

  //handleResetLock
  const handleResetLock = async (macAddress, lock) => {

    const confirmed = window.confirm(`Are you sure you want to reset${lock} this ${macAddress} gateway?`);

    if (confirmed) {
      console.log(`restting lock... ${lock}`);


      setLoading(true)

      try {
        const response = await ResetLock(macAddress, lock, token);

        if (response.status === 200) {
          window.alert(`Reset the Lock: ${response.data.msg} ${response.data.iResult}`);
          console.log(response.data);
        } else {
          console.error('API Error:', response.data);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
      finally {
        setLoading(false)
      }
    }
  }


  const [activeLocks, setActiveLocks] = useState(null);
  const initialTime = '2023-04-19T17:25:37.305Z';


  // handleReplaceLock
  const handleReplaceLock = (mac, LockId) => {
    toggleSection("showSetReplaceLock")
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    const lock = selectedLockID(LockId);
    setMacAddress(macAddress);
    setLockId(lock);
    setAddLockKey(addLockKey + 1);
  }

  // handleUpdateLockFirmware
  const handleUpdateLockFirmware = (mac, lock) => {
    // alert(JSON.stringify(response));
    window.alert(`${mac} ${lock}`)
  }

  // handleFullDownlaod
  const handleFullDownlaod = (mac, lockId) => {
    toggleSection("setShowFullDownload")
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    const lock = selectedLockID(lockId);
    setMacAddress(macAddress);
    setLockId(lock);
    setAddLockKey(addLockKey + 1);
  }
  // get mac and
  const selectedMacAddress = (mac) => {
    // Your logic here to use 'mac' and 'lock' as separate variables
    // For example
    const macAddress = `${mac}`;
    return macAddress; // Replace with your actual logic
  };

  const selectedLockID = (lockId) => {
    // Your logic here to use 'mac' and 'lock' as separate variables
    // For example
    const lock = `${lockId}`;
    return lock; // Replace with your actual logic
  };


  const handleDownload = (mac, LockId) => {
    toggleSection("setShowDownload");
    const macAddress = selectedMacAddress(mac, LockId); // Pass 'mac' and 'lock' as arguments
    const lock = selectedLockID(LockId);
    setMacAddress(macAddress);
    setLockId(lock);
  };


  const handleGetEvents = (mac) => {
    toggleSection('setShowGetEventsPage');
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    setMacAddress(macAddress);

    setAddLockKey(addLockKey + 1);
  }


  const handleDiscoverLock = (mac) => {
    toggleSection('setShowDiscoverLock');
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    setMacAddress(macAddress);

    setAddLockKey(addLockKey + 1);

  }

  const handleLocateLock = async (mac, LockId) => {
    const macAddress = selectedMacAddress(mac); // Pass 'mac' and 'lock' as arguments
    const lock = selectedLockID(LockId);
    setMacAddress(macAddress);
    setLockId(lock);
    try {
      //  const response=await LocateLockPost(macAddress,LockId);
      //  if(response.status===200){
      //   window.alert(response)
      //  }

      window.alert(`${macAddress} ${lock}`)

    } catch (error) {
      console.log(error);
    }

  }

  // GetAllLockStatusMethod
  const handleGetAllLockStatus = async (macAddress) => {
    // const macAddress = selectedMacAddress(macAddress); // Pass 'mac' and 'lock' as arguments
    // setMacAddress(macAddress);

    // try{
    //   const response=await GetAllLockStatusMethod(macAddress,token);
    //   if(response.status===200){

    //   }
    // }catch(error){

    // }
    console.log(macAddress);
    window.alert(macAddress)

  }


  // ManualLockCmd
  const handleLockPage = async (mac, lockId) => {
    console.log(mac);
    toggleSection("setShowLockPage");
    const macAddress = selectedMacAddress(mac, lockId); // Pass 'mac' and 'lock' as arguments
    const lock = selectedLockID(lockId);
    setMacAddress(macAddress);
    setLockId(lock);

  }


  const handleBadgePage = (mac, lockId) => {
    toggleSection("setShowBadgePage");
    const macAddress = selectedMacAddress(mac, lockId); // Pass 'mac' and 'lock' as arguments
    const lock = selectedLockID(lockId);
    setMacAddress(macAddress);
    setLockId(lock);
  }


  const handleGetRepeaterPage = (mac) => {
    console.log(mac);
    toggleSection("setShowRepeaterPage");
    const macAddress = selectedMacAddress(mac, lockId); // Pass 'mac' and 'lock' as arguments
    setMacAddress(macAddress);
  }

  const toggleGetLastLogMessages = () => {
    setSections((prevSections) => ({
      ...prevSections,
      isShowOpenGetLastLogMessages: !prevSections.isShowOpenGetLastLogMessages,
    }));
  };
  const [leftPaneWidth, setLeftPaneWidth] = useState(0);


  return (
    <div className='app' >
      <Topbar handleShowGatewayFormClick={handleShowGatewayFormClick}
        isShowOpenGetLastLogMessages={sections.isShowOpenGetLastLogMessages}
        toggleGetLastLogMessages={toggleGetLastLogMessages}
      />
      <div className="content">
        <div className="column" style={{ width: leftWidth }}>
          {/* Left Column Content */}
          <div className="column-content">
            {showGatewayList && (

              <div className='custom-list'>
                {apiGateways.map((gateway, index) => (
                  <div
                    key={index}>
                    <div
                      className="list-item"
                    >  <BiRightArrow onClick={() => handleShowLocks(gateway.MACAddress)}
                      className={activeLocks === gateway.MACAddress ? "open" : "closed"}

                      />
                      <label title={`MAC Address: ${gateway.MACAddress}`} className="hover-label">{gateway.MACAddress}</label>
                      <label title={`Ip Address: ${gateway.IpAddress}`} className="hover-label">{gateway.IpAddress}</label>

                      <div className="dropdown-container">
                        <CiMenuKebab onClick={toggleDropdown} className="kebab-button" />
                        {isDropdownOpen && (
                          <div className="dropdown-content right-overlay">
                            <ul style={{ cursor: "pointer" }}>
                              <li onClick={() => handleAddLock(gateway.MACAddress)}>Add Lock</li>
                              <li onClick={() => handleResetGateway(gateway.MACAddress)}>Reset Gateway</li>
                              <li onClick={() => handleRemoveGateway(gateway.MACAddress)}>Remove Gateway</li>
                              <li onClick={() => handleUpdateGatewayFirmware(gateway.MACAddress)}>UpdateGatewayFirmware</li>
                              <li onClick={() => handleChangeGatewayHostServerIp(gateway.MACAddress)}>ChangeGatewayHostServerIp</li>
                              <li onClick={() => handleGetGatewayHostServerIP(gateway.MACAddress)}>GetGatewayHostServerIP</li>
                              <li onClick={() => handleWriteConfigToGateway(gateway.MACAddress)}>WriteConfigToGateway</li>
                              <li onClick={() => handleReplaceGateway(gateway.MACAddress)}>ReplaceGateway</li>
                              <li onClick={() => handleGetGatewayStatus(gateway.MACAddress)}> GetGatewayStatus</li>
                              <li onClick={() => handleSetClock(gateway.MACAddress)}> SetClock</li>
                              <li onClick={() => handleGetRepeaterPage(gateway.MACAddress)}>Repeater</li>

                              <li onClick={() => handleGetEvents(gateway.MACAddress)}>Events</li>

                            </ul>

                          </div>
                        )}
                      </div>
                    </div>


                    {activeLocks === gateway.MACAddress && (
                      <div className="sublist">
                        <ol style={{ listStyleType: "upper-roman" }}>
                          {gateway.Locks.map((lock, lockIndex) => (
                            <li key={lockIndex} >
                              <div className="lock-info">

                                <label>{lock.LockId}</label>
                                <label>{lock.LockRFAddress}</label>
                                <label>{lock.Enable}</label>
                                <div className="dropdown-container">
                                  <CiMenuKebab onClick={toggleDropdown} className="kebab-button" />
                                  {isDropdownOpen && (
                                    <div className="dropdown-content right-overlay">
                                      <ul style={{ cursor: "pointer" }}>
                                        <li onClick={() => handleResetLock(gateway.MACAddress, lock.LockId)}>Reset Lock</li>
                                        <li onClick={() => handleReplaceLock(gateway.MACAddress, lock.LockId)}>Replace Lock</li>
                                        <li onClick={() => handleRemoveLockFromGateway(gateway.MACAddress, lock.LockId)}>Remove Lock</li>
                                        <li onClick={() => handleDownload(gateway.MACAddress, lock.LockId)}>Download</li>
                                        <li onClick={() => handleTimezone(gateway.MACAddress, lock.LockId)}>Timezone</li>
                                        {/* <li onClick={() => handleAddTimezone(gateway.MACAddress, lock.LockId)}>Remove Gateway</li> */}
                                        <li onClick={() => handleResetApb(gateway.MACAddress, lock.LockId)}>Reset Apb</li>
                                        <li onClick={() => handleUpdateLockFirmware(gateway.MACAddress, lock.LockId)}>Update Lock Firmware</li>
                                        <li onClick={() => handleFullDownlaod(gateway.MACAddress, lock.LockId)}>FullDownload</li>
                                        <li onClick={() => handleDiscoverLock(gateway.MACAddress, lock.LockId)}>DiscoverLock</li>
                                        <li onClick={() => handleLocateLock(gateway.MACAddress, lock.LockId)}>LocateLock</li>
                                        <li onClick={() => handleGetAllLockStatus(gateway.MACAddress)}>GetAllLockStatus</li>
                                        <li onClick={() => handleLockPage(gateway.MACAddress, lock.LockId)}>Lock Paage</li>
                                        <li onClick={() => handleBadgePage(gateway.MACAddress, lock.LockId)}>Badge</li>

                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>

                    )}



                  </div>
                ))}


              </div>



            )}

          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: `${leftPaneWidth}%` }}></div>
          <DraggableDivider handleDrag={handleDrag} />
          <div style={{ flex: 1 }}></div>
        </div>


        <div className="column" style={{ width: rightWidth, minWidth: '10%', maxWidth: '70%', backgroundColor: "white" }}>
          {/* Right Column Content */}
          {loading && (
            <div className="loading-icon">
              <LoadingSpinner />
            </div>
          )}
          <div className="column-content-right">


            {loading && (
              <div className="loading-icon">
                <LoadingSpinner />
              </div>
            )}

            {sections.showGatewayForm && <GatewayForm
            // macAddress={macAddress}
            // ipAddress={ipAddress}
            // setMacAddress={setMacAddress}
            // setIpAddress={setIpAddress}
            // reloadData={reloadData}
            />}
            {sections.showDownloads && <Downloads
              macAddress={selectedMacAddress}
              ipAddress={selectedIpAddress}
            />}

            {sections.showReplaceGateway && (
              <ReplaceGateway
                key={addLockKey}
                macAddress={macAddress}

              // updateEntries={updateEntries} // Pass the updateEntries function
              />
            )}

            {sections.showLockForm && (
              <AddLock
                key={addLockKey} // Change the key to trigger a reload
                reloadData={reloadData}
                macAddress={macAddress}
                apiGateways={apiGateways}
              // Pass the refresh flag as a prop

              // setAPIGateways={setAPIGateways}

              />
            )}


            {/* ChangeGatewayHostServerIp */}

            {sections.showChangeGatewayHostServerIp && (
              <ChangeGatewayHostServerIp
                macAddress={selectedMacAddress}

              />
            )}

            {sections.showTimezone && (
              <TimezonePage
                macAddress={macAddress}
                LockID={lockId} />
            )}

            {sections.showSetClock && (
              <Clock
                macAddress={macAddress}
              />
            )}

            {sections.showSetGatewayStatus && (
              <Gateway_Status
                macAddress={macAddress}

              />
            )}

            {sections.showSetReplaceLock && (
              <ReplaceLock
                key={addLockKey}
                // macAddress={selectedMacAddress}
                // LockID={selectedLockId}
                macAddress={macAddress}
                LockID={lockId}
                reloadData={reloadData} />
            )}

            {sections.setShowFullDownload && (
              <FullDownlaod
              key={addLockKey} 
              macAddress={macAddress}
              LockID={lockId}
              />
            )}

            {sections.setShowDownload && (
              <DownlaodPage
                macAddress={macAddress}
                LockID={lockId}
              />
            )}


            {sections.setShowGetEventsPage && (
              <EventsPage
                key={addLockKey}
                macAddress={macAddress}

              />
            )}

            {sections.setShowDiscoverLock && (
              <DiscoverLock
                macAddress={macAddress}

              />
            )}

            {sections.setShowLockPage && (
              <LockPage
                macAddress={macAddress}
                LockID={lockId}

              />
            )}

            {sections.setShowBadgePage && (
              <Batch
                macAddress={macAddress}
                LockID={lockId}

              />
            )}



            {sections.setShowRepeaterPage && (
              <Repeter
                macAddress={macAddress}


              />
            )}


            {sections.isShowOpenGetLastLogMessages && (
              <GetLastLogMessages
              />
            )}
          </div>


        </div>
      </div>
    </div>

  );
}

export default Dashboard;
