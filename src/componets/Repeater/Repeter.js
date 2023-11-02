import React from 'react'
import DiscoverExpanders from './components/DiscoverExpanders'
import RemoveExpander from './components/RemoveExpander'
import ReplaceExpander from './components/ReplaceExpander'
import UpdateRepeaterFirmware from './components/UpdateRepeaterFirmware'
import ResetExpander from './components/ResetExpander'

export default function Repeter({macAddress}) {
  return (
    <div>
      {macAddress}
      <fieldset>
        <legend>Repeater</legend>
        <DiscoverExpanders
        macAddress={macAddress}
        />
        <RemoveExpander
         macAddress={macAddress}
        />
        <ReplaceExpander 
         macAddress={macAddress}
        />
        <UpdateRepeaterFirmware
         macAddress={macAddress}
        />
        <ResetExpander 
         macAddress={macAddress}
        />
      </fieldset>
    </div>
  )
}
