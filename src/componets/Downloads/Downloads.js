import React, { useState } from "react";
import DownloadFormats from "./components/DownloadFormats";
import DownloadFacilityCodes from "./components/DownloadFacilityCodes";
import DownloadHolidayDate from "./components/DownloadHolidayDate";
import DownloadTimezoneData from "./components/DownloadTimezoneData";
import DownloadCategories from "./components/DownloadCategories";

export default function Downloads() {
  return (
    <div>
      <DownloadFormats />
      <DownloadFacilityCodes />
      <DownloadHolidayDate />
      <DownloadTimezoneData />
      <DownloadCategories />
    </div>
  );
}
