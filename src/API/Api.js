import axios from 'axios';

// const BASE_URL = "http://localhost:3500";
const BASE_URL = "http://localhost:6062";


const generateDefaultHTTPHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
});
////////////////////////////Login//////////////////////
export async function LoginPost(body) {
    try {
        const response = await axios.post(`${BASE_URL}/token`, body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return response;
    } catch (error) {
        console.error("Error in LoginPost:", error);
        throw error;
    }
}

// ///////////////////  Gate way APIs ////////////////////////////////////////

// add gateway
export async function AddGatewayPost( macAddress, gatewayIpAddress, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/AddGateway?macAddress=${macAddress}&ipAddress=${gatewayIpAddress}`,
            
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );

        return response;
    } catch (error) {
        console.error("Error in AddGatewayPost:", error);
        throw error;
    }
}

//UpdateGatewayFirmware
export async function UpdateGatewayFirmware(macAddress, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/UpdateGatewayFirmware?macAddress=${macAddress}`,
            null,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in UpdateGatewayFirmware:", error);
        throw error;
    }
}


//ChangeGatewayHostServerIp
export async function ChangeGatewayHostServerIpPost(macAddress,hostServerIP, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/ChangeGatewayHostServerIp?macAddress=${macAddress}&ipAddress=${hostServerIP}`,
            null,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in ChangeGatewayHostServerIp:", error);
        throw error;
    }
}

//GetGatewayHostServerIP
export async function GetGatewayHostServerIP(macAddress, token) {
    try {
        const response = await axios.get(
            `${BASE_URL}/Gateway/GetGatewayHostServerIP?macAddress=${macAddress}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in GetGatewayHostServerIP:", error);
        throw error;
    }
}

//RemoveGateway
export async function RemoveGateway(macAddress, token) {
    try {
        const response = await axios.delete(
            `${BASE_URL}/Gateway/RemoveGateway?macAddress=${macAddress}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in RemoveGateway:", error);
        throw error;
    }
}

//ResetGateway
export async function ResetGateway(macAddress, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/ResetGateway?macAddress=${macAddress}`,
            null,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in ResetGateway:", error);
        throw error;
    }
}

//WriteConfigToGateway
export async function WriteConfigToGateway(macAddress, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/WriteConfigToGateway?macAddress=${macAddress}`,
            null,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in WriteConfigToGateway:", error);
        throw error;
    }
}

//ReplaceGateway
export async function ReplaceGatewayPost(macAddress,newMacAddress,newIpAddress, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/ReplaceGateway?macAddress=${macAddress}&newMacAddress=${newMacAddress}&newIpAddress=${newIpAddress}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in RemoveGateway:", error);
        throw error;
    }
}


//DownloadFormats
export async function DownloadFormatsPost(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/DownloadFormats?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in DownloadFormatsPost:", error);
        throw error;
    }
}


//ResetApb
export async function ResetApbPost(macAddress,lockId, token) {
    try {
        const response = await axios.post(`${BASE_URL}/Gateway/ResetApb?macAddress=${macAddress}&lockId=${lockId}`    
        , null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in ResetApbPost :", error);
        throw error;
    }
}



//SetClock
export async function SetClockPost(macAddress,clock, token) {
    try {
        const response = await axios.post(`${BASE_URL}/Gateway/SetClock?macAddress=${macAddress}&clock=${clock}`, null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in SetClock :", error);
        throw error;
    }
}

//GetGatewayStatus
export async function GetGatewayStatusMethod(macAddress, token) {
    try {
        const response = await axios.get(`${BASE_URL}/Gateway/GetGatewayStatus?macAddress=${macAddress}`    
        , {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in GetGatewayStatusMethod:", error);
        throw error;
    }
}

//DownloadFacilityCodes
export async function DownloadFacilityCodePost(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/DownloadFacilityCodePost?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in DownloadFacilityCodePost:", error);
        throw error;
    }
}


//DownloadHolidayData
export async function DownloadHolidayDataPost(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/DownloadHolidayData?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in DownloadHolidayData:", error);
        throw error;
    }
}

//DownloadTimezoneData
export async function DownloadTimezoneDataPost(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/DownloadTimezoneData?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in DownloadTimezoneData:", error);
        throw error;
    }
}

//RemoveTimezone
export async function RemoveTimezoneMethod(macAddress,lockId, token) {
    try {
        const response = await axios.delete(
            `${BASE_URL}/Gateway/RemoveTimezone?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in RemoveTimezone:", error);
        throw error;
    }
}


//AddTimezone
export async function AddTimezoneMethod(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/AddTimezone?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in AddTimezone:", error);
        throw error;
    }
}


//DownloadCategories
export async function DownloadCategoriesPost(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Gateway/DownloadCategories?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in DownloadCategories:", error);
        throw error;
    }
}

//SendCategoryCounterPreset
export async function SendCategoryCounterPresetPostMethod(macAddress,lockId,body, token) {
    try {
        const response = await axios.post(`${BASE_URL}/Gateway/SendCategoryCounterPreset?macAddress=${macAddress}&lockId=${lockId}`,
         body, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in SendCategoryCounterPreset:", error);
        throw error;
    }
}

//Lockdown
export async function LockdownMethod(macAddress,lockId,body, token) {
    try {
        const response = await axios.post(`${BASE_URL}/Gateway/Lockdown?macAddress=${macAddress}&lockId=${lockId}`,
         body, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in Lockdown:", error);
        throw error;
    }
}

//GetEvent
export async function GetEventsMethod(count,token) {
    try {
        const response = await axios.get(`${BASE_URL}/Gateway/GetEvents?count=${count}`, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in GetEvents:", error);
        throw error;
    }
}

//DeleteEvents
export async function DeleteEventsMethod(token) {
    try {
        const response = await axios.delete(`${BASE_URL}/Gateway/DeleteEvents`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in DeleteEvents:", error);
        throw error;
    }
}




// //////////////////////////////// Lock APIS/////////////////
//AddLock
export async function AddLockPost(body, token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/AddLock`, body, {
            headers: generateDefaultHTTPHeaders(token),

        });
        return response;
    } catch (error) {
        console.error("Error in AddLockPost:", error);
        throw error;
    }
}

//ReplaceLock
export async function ReplaceLockPost(body, token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/ReplaceLock`, body, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in ReplaceLock:", error);
        throw error;
    }
}



// resetLock
export async function ResetLock(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Lock/ResetLock?macAddress=${macAddress}&lockId=${lockId}`,
            null,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );
        return response;
    } catch (error) {
        console.error("Error in ResetLock:", error);
        throw error;
    }
}

//DiscoverLock
export async function DiscoverLockPost(macAddress,lockCount,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/DiscoverLock?macAddress=${macAddress}&lockCount=${lockCount}`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in DiscoverLockPost:", error);
        throw error;
    }
}

//LocateLock
export async function LocateLockPost(macAddress,lockId,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/LocateLock?macAddress=${macAddress}&lockId=${lockId}`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in LocateLock:", error);
        throw error;
    }
}

//RemoveGateway
export async function RemoveLockFromGateway(macAddress,lockId, token) {
    try {
        const response = await axios.delete(
            `${BASE_URL}/Lock/RemoveLockFromGateway?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );

        return response;
    } catch (error) {
        console.error("Error in RemoveGateway:", error);
        throw error;
    }
}


//UpdateLockFirmware
export async function UpdateLockFirmwareMethod(macAddress,lockId, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Lock/UpdateLockFirmware?macAddress=${macAddress}&lockId=${lockId}`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );

        return response;
    } catch (error) {
        console.error("Error in UpdateLockFirmware:", error);
        throw error;
    }
}

//FullDownload
export async function FullDownloadMethod( token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/Lock/FullDownload`,
            {
                headers: generateDefaultHTTPHeaders(token),
            }
        );

        return response;
    } catch (error) {
        console.error("Error in FullDownload:", error);
        throw error;
    }
}


//DownloadLockData
export async function DownloadLockDataPost(token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/DownloadLockData`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in DownloadLockData:", error);
        throw error;
    }
}

//GetAllLockStatus
export async function GetAllLockStatusMethod(macAddress,token) {
    try {
        const response = await axios.get(`${BASE_URL}/Lock/GetAllLockStatus?macAddress=${macAddress}`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in GetAllLockStatusMethod:", error);
        throw error;
    }
}
//ManualLockCmdPost
export async function ManualLockCmdPost(macAddress,lockId,command,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/ManualLockCmd?macAddress=${macAddress}
        &lockId=${lockId}&command=${command}`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in ManualLockCmd:", error);
        throw error;
    }
}

//RemoteBypassViaKeyFob
export async function RemoteBypassViaKeyFobPost(macAddress,lockId,startEnrollment,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/RemoteBypassViaKeyFob?macAddress=${macAddress}
        &lockId=${lockId}&startEnrollment=${startEnrollment}`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in RemoteBypassViaKeyFobPost:", error);
        throw error;
    }
}

//SetOutput
export async function SetOutputPost(macAddress,lockId,relayNo,command,timeSec,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/SetOutput?macAddress=${macAddress}
        &lockId=${lockId}&relayNo=${relayNo}&command=${command}&timeSec=${timeSec}`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in SetOutput:", error);
        throw error;
    }
}


//RetrieveLogData
export async function RetrieveLogDataPost(macAddress,lockId,relayNo,command,timeSec,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Lock/RetrieveLogData?macAddress=${macAddress}
        &lockId=${lockId}`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in RetrieveLogData:", error);
        throw error;
    }
}
//////////////////ReadApiConfig///////////////////



//ReadApiConfig
export async function ReadApiConfig(token) {
    // const BASE_URL = "http://localhost:6062";

    try {
        const response = await axios.get(`${BASE_URL}/Config/ReadApiConfig`, {
                    // const response = await axios.get(`http://localhost:3500/APIGateways  `, {
            headers: generateDefaultHTTPHeaders(token),
        });

        return response;
    } catch (error) {
        console.error("Error in ReadApiConfig:", error);
        throw error;
    }
}
// DeleteApiConfig
export async function DeleteApiConfig(macAddress, token) {

    try {
        const response = await axios.delete(`${BASE_URL}//DeleteApiConfig?macAddress=${macAddress}`, {
            headers: generateDefaultHTTPHeaders(token),
        });

        return response;
    } catch (error) {
        console.error("Error in DeleteApiConfig:", error);
        throw error;
    }
}


////////////////////////Repeater////////////////
//DiscoverExpanders
export async function DiscoverExpandersPost(macAddress,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Repeater/DiscoverExpanders?macAddress=${macAddress}
       `    
        , null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in DiscoverExpanders:", error);
        throw error;
    }
}

//ApiReplaceExpander
export async function ReplaceExpanderPost(macAddress,repeaterId,newRepeaterId,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Repeater/ReplaceExpander?macAddress=${macAddress}
       &oldRepeaterId=${repeaterId}&newRepeaterId=${newRepeaterId}`    
        , null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in ReplaceExpander:", error);
        throw error;
    }
}


//RemoveExpander
export async function RemoveExpanderPost(macAddress,repeaterId,token) {
    try {
        const response = await axios.delete(`${BASE_URL}/Repeater/RemoveExpander?macAddress=${macAddress}
       &repeaterId=${repeaterId}`    
        , null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in RemoveExpander:", error);
        throw error;
    }
}

// UpdateRepeaterFirmware
export async function UpdateRepeaterFirmwarePost(macAddress,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Repeater/UpdateRepeaterFirmware?macAddress=${macAddress}
       `    
        , null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in UpdateRepeaterFirmware:", error);
        throw error;
    }
}


// ResetExpander
export async function ResetExpanderPost(macAddress,repeaterId,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Repeater/UpdateRepeaterFirmware?
        macAddress=${macAddress}&repeaterId=${repeaterId}
       `, null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in UpdateRepeaterFirmware:", error);
        throw error;
    }
}


///////////////Sysytem APIS /////////////////
//ChangePassword
export async function ChangePasswordPost(userName,oldPassword,newPassword,token) {
    try {
        const response = await axios.get(`${BASE_URL}/System/ChangePassword?
        userName=${userName}&oldPassword=${oldPassword}&newPassword=${newPassword}
       `, null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in ChangePassword:", error);
        throw error;
    }
}

// GetLastLogMessages
export async function GetLastLogMessagesMethod(count,token) {
    try {
        const response = await axios.get(`${BASE_URL}/System/System?
        count=${count}
       `, null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in GetLastLogMessages:", error);
        throw error;
    }
}

//ApiVersion
export async function ApiVersionMethod(token) {
    try {
        const response = await axios.get(`${BASE_URL}/System/ApiVersion`,
         null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in ApiVersionMethod:", error);
        throw error;
    }
}


/////////////// Badge APis /////////////

// 
// AddBadge
export async function AddBadgePost(macAddress,lockIds,body,token) {
    try {
        const response = await axios.get(`${BASE_URL}/Badge/AddBadge?
        macAddress=${macAddress}&lockIds=${lockIds}
       `, body, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in AddBadgePost:", error);
        throw error;
    }
}

// DeleteBadge
export async function DeleteBadgePost(macAddress,CardNumber,facility,lockIds,token) {
    try {
        const response = await axios.delete(`${BASE_URL}/Badge/DeleteBadge?
        macAddress=${macAddress}&CardNumber=${CardNumber}&facility=${facility}&lockIds=${lockIds}
       `, null, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in DeleteBadgePost:", error);
        throw error;
    }
}


// SendBulkBadges
export async function SendBulkBadgesPost(macAddress,lockIds,body,token) {
    try {
        const response = await axios.post(`${BASE_URL}/Badge/SendBulkBadges?
        macAddress=${macAddress}&lockIds=${lockIds}
       `, body, {
            headers: generateDefaultHTTPHeaders(token),
        });
        return response;
    } catch (error) {
        console.error("Error in SendBulkBadges:", error);
        throw error;
    }
}