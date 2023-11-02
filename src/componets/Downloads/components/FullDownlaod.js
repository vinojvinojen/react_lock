import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";

import axios from "axios";
import CommonTextFieldForm from "../../CommonTextFieldForm";
import CommonButton from "../../CommonButton";
export default function FullDownload({macAddress,LockID,refresh}) {
  //api details
  const token = localStorage.getItem("token");
  const baseUrl = "http://localhost:6062";

  //form set
  const [holidayForm, showHolidayForm] = useState(false);
  const [timezoneForm, showTimeZoneForm] = useState(false);
  const [CategoryCountersForm, showCategoryCountersForm] = useState(false);
  const [FacilityCodesForm, showFacilityCodesForm] = useState(false);
  const [BadgeFormatsForm, showBadgeFormatsForm] = useState(false);
  const [BadgesForm, showBadgesForm] = useState(false);
  const [submitButton, showSubmitButton] = useState(false);

  const [fullForm, addItemtoFullForm] = useState({
    LockConfigData: {},
    Holidays: [],
    Timezones: [],
    CategoryCounters: [],
    FacilityCodes: [],
    BadgeFormats: [],
    Badges: [],
  });
  const [holidayList, addHolidayList] = useState([]);
  const [timeZoneList, addTimezoneList] = useState([]);
  const [categoryCounterList, addCategoryCounterList] = useState([]);
  const [batchFormatsList, addBatchFormatList] = useState([]);
  const [batchesList, addBatchesList] = useState([]);

  const LockConfigData = useFormik({
    initialValues: {
      GatewayMACAddress: "",
      LockID: "",
      LockRFAddress: "",
      Enable: "",
      DoorStrikeTime: "",
      EnableDegradeMode: "",
      EnableKeypad: "",
      Pin: "",
      APBEntryArea: "",
      APBExitArea: "",
      APBType: "",
      IsSoftAPB: "",
      NumPinCodeAttempts: "",
      KeypadDeadTimeAfterPin: "",
      Is2CardControl: "",
      OutputEnabled: "",
      TrackTz: "",
      RelayTime: "",
      CRDuress: "",
      CRApb: "",
      CRDenied: "",
      CRVoid: "",
      OtlTime: "",
      InputType: "",
      BypassUnlocks: "",
      ReportAccessAfterDoorOpen: "",
      DoubleTap: "",
      FreeAccessScheduleId: "",
      PinAndCardScheduleId: "",
      CardOnlyScheduleId: "",
      DegradeModeScheduleId: "",
      PinOnlyScheduleId: "",
      RemoteBypassViaKeyFob: "",
      LockControl: "",
      EventRetrievalSchedule: "",
      Category1: "",
      Category2: "",
      Category3: "",
      Category4: "",
      Category5: "",
      Category6: "",
      Category7: "",
      Category8: "",
      Category9: "",
      Category10: "",
      Category11: "",
      Category12: "",
      Category13: "",
      Category14: "",
      Category15: "",
      Category16: "",
      CategoryCode: "",
      CategoryFilter: "",
      HolidayCalendarId: "",
    },
    onSubmit: (values) => {
      fullForm.LockConfigData = values;
      addItemtoFullForm({ ...fullForm });
      showHolidayForm(true);
    },
  });

  const Holidays = useFormik({
    initialValues: {
      Year: "",
      Month: "",
      Day: "",
      StartHr: "",
      StartMin: "",
      EndHr: "",
      EndMin: "",
    },
    onSubmit: (values) => {
      addHolidayList([...holidayList, values]);
      Holidays.resetForm();
    },
  });

  const FacilityCodes = useFormik({
    initialValues: {
      One: "",
      Two: "",
      Three: "",
      Four: "",
      Five: "",
      Six: "",
      Seven: "",
      Eight: "",
    },
    onSubmit: (values) => {
      var data = [values.One, values.Two, values.Three];
      const newFullForm = { ...fullForm };

      newFullForm.FacilityCodes = data;

      addItemtoFullForm(newFullForm);
      showBadgeFormatsForm(true);
    },
  });

  const CategoryCounter = useFormik({
    initialValues: {
      LowSetpoint: "",
      HighSetpoint: "",
      CategoryNumber: "",
    },
    onSubmit: (values) => {
      addCategoryCounterList([...categoryCounterList, values]);
      CategoryCounter.resetForm();
    },
  });

  const BatchFormat = useFormik({
    initialValues: {
      IsReversed: "",
      nScardAppType: "",
      CardNumberLengthInBits: "",
      FacilityCodeStartIndex: "",
      FacilityCodeLengthInBits: "",
      BitsForEven: "",
      BitsForOdd: "",
      IssueCodeLengthInBits: "",
      BadgeFormatType: "",
      CardNumberStartIndex: "",
      IssueCodeStartIndex: "",
      NumBitsOnCard: "",
      ParityStep: "",
      BadgeFormatID: "",
      CardNumberOffset: "",
    },
    onSubmit: (values) => {
      addBatchFormatList([...batchFormatsList, values]);
      BatchFormat.resetForm();
    },
  });

  const Batches = useFormik({
    initialValues: {
      CardNumber: "",
      APBOneFreePass: "",
      APBNotUsed: "",
      FacilityCode: "",
      IsAPBExempt: "",
      IssueCode: "",
      APBLocation: "",
      IsApbIn: "",
      PinCode: "",
      Category1: "",
      Category2: "",
      Category3: "",
      Category4: "",
      Category5: "",
      Category6: "",
      Category7: "",
      Category8: "",
      Category9: "",
      Category10: "",
      Category11: "",
      Category12: "",
      Category13: "",
      Category14: "",
      Category15: "",
      Category16: "",
      ADA: "",
      FirstInController: "",
      Atz1: "",
      Atz2: "",
      Atz3: "",
      Atz4: "",
      Atz5: "",
      Atz6: "",
      Atz7: "",
      Atz8: "",
      Atz9: "",
      Atz10: "",
      Atz11: "",
      Atz12: "",
      Atz13: "",
      Atz14: "",
      Atz15: "",
      Atz16: "",
      HolidayCalendarId: "",
    },
    onSubmit: (values) => {
      var data = {
        CardNumber: values.CardNumber,
        APBOneFreePass: values.APBOneFreePass,
        APBNotUsed: values.APBNotUsed,
        FacilityCode: values.FacilityCode,
        IsAPBExempt: values.IsAPBExempt,
        IssueCode: values.IssueCode,
        APBLocation: values.APBLocation,
        IsApbIn: values.IsApbIn,
        PinCode: values.PinCode,
        Category1: values.Category1,
        Category2: values.Category2,
        Category3: values.Category3,
        Category4: values.Category4,
        Category5: values.Category5,
        Category6: values.Category6,
        Category7: values.Category7,
        Category8: values.Category8,
        Category9: values.Category9,
        Category10: values.Category10,
        Category11: values.Category11,
        Category12: values.Category12,
        Category13: values.Category13,
        Category14: values.Category14,
        Category15: values.Category15,
        Category16: values.Category16,
        ADA: values.ADA,
        FirstInController: values.FirstInController,
        AccessTimezone: [
          values.Atz1,
          values.Atz2,
          values.Atz3,
          values.Atz4,
          values.Atz5,
          values.Atz6,
          values.Atz7,
          values.Atz8,
          values.Atz9,
          values.Atz10,
          values.Atz11,
          values.Atz12,
          values.Atz13,
          values.Atz14,
          values.Atz15,
          values.Atz16,
        ],

        HolidayCalendarId: values.HolidayCalendarId,
      };
      addBatchesList([...batchesList, data]);
      Batches.resetForm();
    },
  });

  const TimeZone = useFormik({
    initialValues: {
      TimeZoneId: "",

      DayFrom: "",
      DayTo: "",
      FromHr: "",
      FromMin: "",
      ToHr: "",
      ToMin: "",
    },
    onSubmit: (values) => {
      var data = {
        TimeZoneId: values.TimeZoneId,
        TzDetails: [
          {
            DayFrom: values.DayFrom,
            DayTo: values.DayTo,
            FromHr: values.FromHr,
            FromMin: values.FromMin,
            ToHr: values.ToHr,
            ToMin: values.ToMin,
          },
        ],
      };
      addTimezoneList([...timeZoneList, data]);
      TimeZone.resetForm();
    },
  });

  function setHolidayListToFullForm() {
    const newFullForm = { ...fullForm };

    newFullForm.Holidays = holidayList;

    addItemtoFullForm(newFullForm);
    showTimeZoneForm(true);
  }

  function setBatchesToFullForm() {
    const newFullForm = { ...fullForm };

    newFullForm.Badges = batchesList;

    addItemtoFullForm(newFullForm);
    showSubmitButton(true);
  }

  function setTimeZonesToFullForm() {
    const newFullForm = { ...fullForm };

    newFullForm.Timezones = timeZoneList;

    addItemtoFullForm(newFullForm);
    showCategoryCountersForm(true);
  }

  function setBatchFormatsToFullForm() {
    const newFullForm = { ...fullForm };

    newFullForm.BadgeFormats = batchFormatsList;

    addItemtoFullForm(newFullForm);
    showBadgesForm(true);
  }

  function setCategoryCountersToFullForm() {
    const newFullForm = { ...fullForm };

    newFullForm.CategoryCounters = categoryCounterList;

    addItemtoFullForm(newFullForm);
    showFacilityCodesForm(true);
  }

  const submitForm = async () => {
    const url = `${baseUrl}/Lock/FullDownload`;
    try {
      const response = await axios.post(url, fullForm, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(JSON.stringify(response.data));
      showBadgeFormatsForm(false);
      showHolidayForm(false);
      showBadgesForm(false);
      showCategoryCountersForm(false);
      showFacilityCodesForm(false);
      showTimeZoneForm(false);
      showSubmitButton(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <fieldset>
        <legend>Full Download Form</legend>

        <fieldset>
          <legend>Lock Config Data Form</legend>
          <form onSubmit={LockConfigData.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="Gateway MAC Address"
                      name="GatewayMACAddress"
                      placeholder="xx:xx:xx:xx:xx"
                      value={macAddress}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="Gateway Lock ID"
                      name="LockID"
                      placeholder="1234"
                      value={LockID}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="LockRFAddress"
                      name="LockRFAddress"
                      placeholder="LockRFAddress"
                      value={LockConfigData.values.LockRFAddress}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="Enable"
                      name="Enable"
                      placeholder="Enable"
                      value={LockConfigData.values.Enable}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="DoorStrikeTime"
                      name="DoorStrikeTime"
                      placeholder="DoorStrikeTime"
                      value={LockConfigData.values.DoorStrikeTime}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="EnableDegradeMode"
                      name="EnableDegradeMode"
                      placeholder="EnableDegradeMode"
                      value={LockConfigData.values.EnableDegradeMode}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="EnableKeypad"
                      name="EnableKeypad"
                      placeholder="EnableKeypad"
                      value={LockConfigData.values.EnableKeypad}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="Pin"
                      name="Pin"
                      placeholder="Pin"
                      value={LockConfigData.values.Pin}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="APBEntryArea"
                      name="APBEntryArea"
                      placeholder="APBEntryArea"
                      value={LockConfigData.values.APBEntryArea}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="APBExitArea"
                      name="APBExitArea"
                      placeholder="APBExitArea"
                      value={LockConfigData.values.APBExitArea}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="APBType"
                      name="APBType"
                      placeholder="APBType"
                      value={LockConfigData.values.APBType}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="IsSoftAPB"
                      name="IsSoftAPB"
                      placeholder="IsSoftAPB"
                      value={LockConfigData.values.IsSoftAPB}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="NumPinCodeAttempts"
                      name="NumPinCodeAttempts"
                      placeholder="NumPinCodeAttempts"
                      value={LockConfigData.values.NumPinCodeAttempts}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="KeypadDeadTimeAfterPin"
                      name="KeypadDeadTimeAfterPin"
                      placeholder="KeypadDeadTimeAfterPin"
                      value={LockConfigData.values.KeypadDeadTimeAfterPin}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="Is2CardControl"
                      name="Is2CardControl"
                      placeholder="Is2CardControl"
                      value={LockConfigData.values.Is2CardControl}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="OutputEnabled"
                      name="OutputEnabled"
                      placeholder="OutputEnabled"
                      value={LockConfigData.values.OutputEnabled}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="TrackTz"
                      name="TrackTz"
                      placeholder="TrackTz"
                      value={LockConfigData.values.TrackTz}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="RelayTime"
                      name="RelayTime"
                      placeholder="RelayTime"
                      value={LockConfigData.values.RelayTime}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="CRDuress"
                      name="CRDuress"
                      placeholder="CRDuress"
                      value={LockConfigData.values.CRDuress}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="CRApb"
                      name="CRApb"
                      placeholder="CRApb"
                      value={LockConfigData.values.CRApb}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="CRDenied"
                      name="CRDenied"
                      placeholder="CRDenied"
                      value={LockConfigData.values.CRDenied}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="CRVoid     value"
                      name="CRVoid"
                      placeholder="CRVoid"
                      value={LockConfigData.values.CRVoid}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="OtlTime"
                      name="OtlTime"
                      placeholder="OtlTime"
                      value={LockConfigData.values.OtlTime}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="InputType"
                      name="InputType"
                      placeholder="InputType"
                      value={LockConfigData.values.InputType}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="BypassUnlocks"
                      name="BypassUnlocks"
                      placeholder="BypassUnlocks"
                      value={LockConfigData.values.BypassUnlocks}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="ReportAccessAfterDoorOpen"
                      name="ReportAccessAfterDoorOpen"
                      placeholder="ReportAccessAfterDoorOpen"
                      value={LockConfigData.values.ReportAccessAfterDoorOpen}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="DoubleTap"
                      name="DoubleTap"
                      placeholder="DoubleTap"
                      value={LockConfigData.values.DoubleTap}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="FreeAccessScheduleId"
                      name="FreeAccessScheduleId"
                      placeholder="FreeAccessScheduleId"
                      value={LockConfigData.values.FreeAccessScheduleId}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="PinAndCardScheduleId"
                      name="PinAndCardScheduleId"
                      placeholder="PinAndCardScheduleId"
                      value={LockConfigData.values.PinAndCardScheduleId}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="CardOnlyScheduleId"
                      name="CardOnlyScheduleId"
                      placeholder="CardOnlyScheduleId"
                      value={LockConfigData.values.CardOnlyScheduleId}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="DegradeModeScheduleId"
                      name="DegradeModeScheduleId"
                      placeholder="DegradeModeScheduleId"
                      value={LockConfigData.values.DegradeModeScheduleId}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="PinOnlyScheduleId"
                      name="PinOnlyScheduleId"
                      placeholder="PinOnlyScheduleId"
                      value={LockConfigData.values.PinOnlyScheduleId}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="RemoteBypassViaKeyFob"
                      name="RemoteBypassViaKeyFob"
                      placeholder="RemoteBypassViaKeyFob"
                      value={LockConfigData.values.RemoteBypassViaKeyFob}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="LockControl"
                      name="LockControl"
                      placeholder="LockControl"
                      value={LockConfigData.values.LockControl}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="EventRetrievalSchedule"
                      name="EventRetrievalSchedule"
                      placeholder="EventRetrievalSchedule"
                      value={LockConfigData.values.EventRetrievalSchedule}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <CommonTextFieldForm
                      label="CategoryCode"
                      name="CategoryCode"
                      placeholder="CategoryCode"
                      value={LockConfigData.values.CategoryCode}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="CategoryFilter"
                      name="CategoryFilter"
                      placeholder="CategoryFilter"
                      value={LockConfigData.values.CategoryFilter}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                  <td>
                    <CommonTextFieldForm
                      label="HolidayCalendarId"
                      name="HolidayCalendarId"
                      placeholder="HolidayCalendarId"
                      value={LockConfigData.values.HolidayCalendarId}
                      onChange={LockConfigData.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <fieldset>
              <legend>Category</legend>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <CommonTextFieldForm
                        label="Category1"
                        name="Category1"
                        placeholder="Category1"
                        value={LockConfigData.values.Category1}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category2"
                        name="Category2"
                        placeholder="Category2"
                        value={LockConfigData.values.Category2}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category3"
                        name="Category3"
                        placeholder="Category3"
                        value={LockConfigData.values.Category3}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category4"
                        name="Category4"
                        placeholder="Category4"
                        value={LockConfigData.values.Category4}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        label="Category5"
                        name="Category5"
                        placeholder="Category5"
                        value={LockConfigData.values.Category5}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category6"
                        name="Category6"
                        placeholder="Category6"
                        value={LockConfigData.values.Category6}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category7"
                        name="Category7"
                        placeholder="Category7"
                        value={LockConfigData.values.Category7}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category8"
                        name="Category8"
                        placeholder="Category8"
                        value={LockConfigData.values.Category8}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        label="Category9"
                        name="Category9"
                        placeholder="Category9"
                        value={LockConfigData.values.Category9}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category10"
                        name="Category10"
                        placeholder="Category10"
                        value={LockConfigData.values.Category10}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category11"
                        name="Category11"
                        placeholder="Category11"
                        value={LockConfigData.values.Category11}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category12"
                        name="Category12"
                        placeholder="Category12"
                        value={LockConfigData.values.Category12}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <CommonTextFieldForm
                        label="Category13"
                        name="Category13"
                        placeholder="Category13"
                        value={LockConfigData.values.Category13}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category14"
                        name="Category14"
                        placeholder="Category14"
                        value={LockConfigData.values.Category14}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category15"
                        name="Category15"
                        placeholder="Category15"
                        value={LockConfigData.values.Category15}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                    <td>
                      <CommonTextFieldForm
                        label="Category16"
                        name="Category16"
                        placeholder="Category16"
                        value={LockConfigData.values.Category16}
                        onChange={LockConfigData.handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <CommonButton
              type="submit"
              label="Continue to Holidays"
              backgroundColor="blue"
            />
          </form>
        </fieldset>

        {holidayForm && (
          <fieldset>
            <legend>Holiday Form</legend>
            <fieldset>
              <legend>Holidays</legend>
              <form onSubmit={Holidays.handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="Year"
                          name="Year"
                          placeholder="Year"
                          value={Holidays.values.Year}
                          onChange={Holidays.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="month"
                          name="Month"
                          placeholder="month"
                          value={Holidays.values.Month}
                          onChange={Holidays.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="Day"
                          name="Day"
                          placeholder="Day"
                          value={Holidays.values.Day}
                          onChange={Holidays.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="StartHr"
                          name="StartHr"
                          placeholder="StartHr"
                          value={Holidays.values.StartHr}
                          onChange={Holidays.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="StartMin"
                          name="StartMin"
                          placeholder="StartMin"
                          value={Holidays.values.StartMin}
                          onChange={Holidays.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="EndHr"
                          name="EndHr"
                          placeholder="EndHr"
                          value={Holidays.values.EndHr}
                          onChange={Holidays.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="EndMin"
                          name="EndMin"
                          placeholder="EndMin"
                          value={Holidays.values.EndMin}
                          onChange={Holidays.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <CommonButton
                  type="submit"
                  backgroundColor="red"
                  label="Add Holiday"
                />
              </form>
            </fieldset>
            <CommonButton
              type="button"
              label="Continue to Timezone form"
              onClick={setHolidayListToFullForm}
              backgroundColor="blue"
            />
          </fieldset>
        )}

        {timezoneForm && (
          <fieldset>
            <legend>TimeZone Form</legend>
            <fieldset>
              <legend>Timezones</legend>
              <form onSubmit={TimeZone.handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="TimeZoneID"
                          placeholder="ID"
                          name="TimeZoneId"
                          value={TimeZone.values.TimeZoneId}
                          onChange={TimeZone.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="DayFrom"
                          placeholder="DayFrom"
                          name="DayFrom"
                          value={TimeZone.values.DayFrom}
                          onChange={TimeZone.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="DayTo"
                          placeholder="DayTo"
                          name="DayTo"
                          value={TimeZone.values.DayTo}
                          onChange={TimeZone.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="FromHr"
                          placeholder="FromHr"
                          name="FromHr"
                          value={TimeZone.values.FromHr}
                          onChange={TimeZone.handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="FromMin"
                          placeholder="FromMin"
                          name="FromMin"
                          value={TimeZone.values.FromMin}
                          onChange={TimeZone.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="ToHr"
                          placeholder="ToHr"
                          name="ToHr"
                          value={TimeZone.values.ToHr}
                          onChange={TimeZone.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="ToMin"
                          placeholder="ToMin"
                          name="ToMin"
                          value={TimeZone.values.ToMin}
                          onChange={TimeZone.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <CommonButton
                  type="submit"
                  label="Add Timezone"
                  backgroundColor="red"
                />
              </form>
            </fieldset>
            <CommonButton
              type="button"
              label="Continue to Category Counters"
              onClick={setTimeZonesToFullForm}
              backgroundColor="blue"
            />
          </fieldset>
        )}

        {CategoryCountersForm && (
          <fieldset>
            <legend>Category Counter Form</legend>
            <fieldset>
              <legend>Category Counters</legend>
              <form onSubmit={CategoryCounter.handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="CategoryNumber"
                          placeholder="CategoryNumber"
                          name="CategoryNumber"
                          value={CategoryCounter.values.CategoryNumber}
                          onChange={CategoryCounter.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="LowSetpoint"
                          placeholder="LowSetpoint"
                          name="LowSetpoint"
                          value={CategoryCounter.values.LowSetpoint}
                          onChange={CategoryCounter.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="HighSetpoint"
                          placeholder="HighSetpoint"
                          name="HighSetpoint"
                          value={CategoryCounter.values.HighSetpoint}
                          onChange={CategoryCounter.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <CommonButton
                  type="submit"
                  label="Add Timezone"
                  backgroundColor="red"
                />
              </form>
            </fieldset>
            <CommonButton
              type="button"
              label="Continue to Category Counters"
              onClick={setCategoryCountersToFullForm}
              backgroundColor="blue"
            />
          </fieldset>
        )}

        {FacilityCodesForm && (
          <fieldset>
            <legend>Facility Code Form</legend>
            <fieldset>
              <legend>Facility Codes</legend>
              <form onSubmit={FacilityCodes.handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="One"
                          placeholder="One"
                          name="One"
                          value={FacilityCodes.values.One}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="Two"
                          placeholder="Two"
                          name="Two"
                          value={FacilityCodes.values.Two}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="Three"
                          placeholder="Three"
                          name="Three"
                          value={FacilityCodes.values.Three}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="Four"
                          placeholder="Four"
                          name="Four"
                          value={FacilityCodes.values.Four}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="Five"
                          placeholder="Five"
                          name="Five"
                          value={FacilityCodes.values.Five}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="Six"
                          placeholder="Six"
                          name="Six"
                          value={FacilityCodes.values.Six}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="Seven"
                          placeholder="Seven"
                          name="Seven"
                          value={FacilityCodes.values.Seven}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="Eight"
                          placeholder="Eight"
                          name="Eight"
                          value={FacilityCodes.values.Eight}
                          onChange={FacilityCodes.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <CommonButton
                  type="submit"
                  label="Continue to Badge Formats"
                  backgroundColor="red"
                />
              </form>
            </fieldset>
          </fieldset>
        )}

        {BadgeFormatsForm && (
          <fieldset>
            <legend>Batch Format Form</legend>
            <fieldset>
              <legend>Batch Format</legend>
              <form onSubmit={BatchFormat.handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="IsReversed"
                          placeholder="IsReversed"
                          name="IsReversed"
                          value={BatchFormat.values.IsReversed}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="nScardAppType"
                          placeholder="nScardAppType"
                          name="nScardAppType"
                          value={BatchFormat.values.nScardAppType}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="CardNumberLengthInBits"
                          placeholder="CardNumberLengthInBits"
                          name="CardNumberLengthInBits"
                          value={BatchFormat.values.CardNumberLengthInBits}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="FacilityCodeStartIndex"
                          placeholder="FacilityCodeStartIndex"
                          name="FacilityCodeStartIndex"
                          value={BatchFormat.values.FacilityCodeStartIndex}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="FacilityCodeLengthInBits"
                          placeholder="FacilityCodeLengthInBits"
                          name="FacilityCodeLengthInBits"
                          value={BatchFormat.values.FacilityCodeLengthInBits}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="CardNumberLengthInBits"
                          placeholder="CardNumberLengthInBits"
                          name="CardNumberLengthInBits"
                          value={BatchFormat.values.CardNumberLengthInBits}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="BitsForEven"
                          placeholder="BitsForEven"
                          name="BitsForEven"
                          value={BatchFormat.values.BitsForEven}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="BitsForOdd"
                          placeholder="BitsForOdd"
                          name="BitsForOdd"
                          value={BatchFormat.values.BitsForOdd}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="IssueCodeLengthInBits"
                          placeholder="IssueCodeLengthInBits"
                          name="IssueCodeLengthInBits"
                          value={BatchFormat.values.IssueCodeLengthInBits}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="BadgeFormatType"
                          placeholder="BadgeFormatType"
                          name="BadgeFormatType"
                          value={BatchFormat.values.BadgeFormatType}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="BitsForOdd"
                          placeholder="BitsForOdd"
                          name="BitsForOdd"
                          value={BatchFormat.values.BitsForOdd}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="IssueCodeLengthInBits"
                          placeholder="IssueCodeLengthInBits"
                          name="IssueCodeLengthInBits"
                          value={BatchFormat.values.IssueCodeLengthInBits}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="BadgeFormatType"
                          placeholder="BadgeFormatType"
                          name="BadgeFormatType"
                          value={BatchFormat.values.BadgeFormatType}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="CardNumberStartIndex"
                          placeholder="CardNumberStartIndex"
                          name="CardNumberStartIndex"
                          value={BatchFormat.values.CardNumberStartIndex}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="IssueCodeStartIndex"
                          placeholder="IssueCodeStartIndex"
                          name="IssueCodeStartIndex"
                          value={BatchFormat.values.IssueCodeStartIndex}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="NumBitsOnCard"
                          placeholder="NumBitsOnCard"
                          name="NumBitsOnCard"
                          value={BatchFormat.values.NumBitsOnCard}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="ParityStep"
                          placeholder="ParityStep"
                          name="ParityStep"
                          value={BatchFormat.values.ParityStep}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="BadgeFormatID"
                          placeholder="BadgeFormatID"
                          name="BadgeFormatID"
                          value={BatchFormat.values.BadgeFormatID}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="CardNumberOffset"
                          placeholder="CardNumberOffset"
                          name="CardNumberOffset"
                          value={BatchFormat.values.CardNumberOffset}
                          onChange={BatchFormat.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <CommonButton
                  type="submit"
                  label="Add Batch Format"
                  backgroundColor="red"
                />
              </form>
            </fieldset>
            <CommonButton
              type="button"
              label="Continue to Batches"
              onClick={setBatchFormatsToFullForm}
              backgroundColor="blue"
            />
          </fieldset>
        )}

        {BadgesForm && (
          <fieldset>
            <legend>Batch Form</legend>
            <fieldset>
              <legend>Batch</legend>
              <form onSubmit={Batches.handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="CardNumber"
                          placeholder="CardNumber"
                          name="CardNumber"
                          value={Batches.values.CardNumber}
                          onChange={Batches.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="APBOneFreePass"
                          placeholder="APBOneFreePass"
                          name="APBOneFreePass"
                          value={Batches.values.APBOneFreePass}
                          onChange={Batches.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="APBNotUsed"
                          placeholder="APBNotUsed"
                          name="APBNotUsed"
                          value={Batches.values.APBNotUsed}
                          onChange={Batches.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="FacilityCode"
                          placeholder="FacilityCode"
                          name="FacilityCode"
                          value={Batches.values.FacilityCode}
                          onChange={Batches.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="IsAPBExempt"
                          placeholder="IsAPBExempt"
                          name="IsAPBExempt"
                          value={Batches.values.IsAPBExempt}
                          onChange={Batches.handleChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="IssueCode"
                          placeholder="IssueCode"
                          name="IssueCode"
                          value={Batches.values.IssueCode}
                          onChange={Batches.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="APBLocation"
                          placeholder="APBLocation"
                          name="APBLocation"
                          value={Batches.values.APBLocation}
                          onChange={Batches.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="IsApbIn"
                          placeholder="IsApbIn"
                          name="IsApbIn"
                          value={Batches.values.IsApbIn}
                          onChange={Batches.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="PinCode"
                          placeholder="PinCode"
                          name="PinCode"
                          value={Batches.values.PinCode}
                          onChange={Batches.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <fieldset>
                  <legend>Category</legend>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Category1"
                            placeholder="Category1"
                            name="Category1"
                            value={Batches.values.Category1}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category2"
                            placeholder="Category2"
                            name="Category2"
                            value={Batches.values.Category2}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category3"
                            placeholder="Category3"
                            name="Category3"
                            value={Batches.values.Category3}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category4"
                            placeholder="Category4"
                            name="Category4"
                            value={Batches.values.Category4}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Category5"
                            placeholder="Category5"
                            name="Category5"
                            value={Batches.values.Category5}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category6"
                            placeholder="Category6"
                            name="Category6"
                            value={Batches.values.Category6}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category7"
                            placeholder="Category7"
                            name="Category7"
                            value={Batches.values.Category7}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category8"
                            placeholder="Category8"
                            name="Category8"
                            value={Batches.values.Category8}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Category9"
                            placeholder="Category9"
                            name="Category9"
                            value={Batches.values.Category9}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category10"
                            placeholder="Category10"
                            name="Category10"
                            value={Batches.values.Category10}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category11"
                            placeholder="Category11"
                            name="Category11"
                            value={Batches.values.Category11}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category12"
                            placeholder="Category12"
                            name="Category12"
                            value={Batches.values.Category12}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Category13"
                            placeholder="Category13"
                            name="Category13"
                            value={Batches.values.Category13}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category14"
                            placeholder="Category14"
                            name="Category14"
                            value={Batches.values.Category14}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category15"
                            placeholder="Category15"
                            name="Category15"
                            value={Batches.values.Category15}
                            onChange={Batches.handleChange}
                          />
                        </td>
                        <td>
                          <CommonTextFieldForm
                            label="Category16"
                            placeholder="Category16"
                            name="Category16"
                            value={Batches.values.Category16}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>

                <table>
                  <tbody>
                    <tr>
                      <td>
                        <CommonTextFieldForm
                          label="ADA"
                          placeholder="ADA"
                          name="ADA"
                          value={Batches.values.ADA}
                          onChange={Batches.handleChange}
                        />
                      </td>
                      <td>
                        <CommonTextFieldForm
                          label="FirstInController"
                          placeholder="FirstInController"
                          name="FirstInController"
                          value={Batches.values.FirstInController}
                          onChange={Batches.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <fieldset>
                  <legend>Access Time Zone</legend>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Atz1"
                            placeholder="Atz1"
                            name="Atz1"
                            value={Batches.values.Atz1}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz2"
                            placeholder="Atz2"
                            name="Atz2"
                            value={Batches.values.Atz2}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz3"
                            placeholder="Atz3"
                            name="Atz3"
                            value={Batches.values.Atz3}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz4"
                            placeholder="Atz4"
                            name="Atz4"
                            value={Batches.values.Atz4}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Atz5"
                            placeholder="Atz5"
                            name="Atz5"
                            value={Batches.values.Atz5}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz6"
                            placeholder="Atz6"
                            name="Atz6"
                            value={Batches.values.Atz1}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz7"
                            placeholder="Atz7"
                            name="Atz7"
                            value={Batches.values.Atz7}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz8"
                            placeholder="Atz8"
                            name="Atz8"
                            value={Batches.values.Atz8}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Atz9"
                            placeholder="Atz9"
                            name="Atz9"
                            value={Batches.values.Atz9}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz10"
                            placeholder="Atz10"
                            name="Atz10"
                            value={Batches.values.Atz10}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz11"
                            placeholder="Atz11"
                            name="Atz11"
                            value={Batches.values.Atz11}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz12"
                            placeholder="Atz12"
                            name="Atz12"
                            value={Batches.values.Atz12}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <CommonTextFieldForm
                            label="Atz13"
                            placeholder="Atz13"
                            name="Atz13"
                            value={Batches.values.Atz13}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz14"
                            placeholder="Atz14"
                            name="Atz14"
                            value={Batches.values.Atz14}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz15"
                            placeholder="Atz15"
                            name="Atz15"
                            value={Batches.values.Atz15}
                            onChange={Batches.handleChange}
                          />
                        </td>

                        <td>
                          <CommonTextFieldForm
                            label="Atz16"
                            placeholder="Atz16"
                            name="Atz16"
                            value={Batches.values.Atz16}
                            onChange={Batches.handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>

                <CommonButton
                  type="submit"
                  label="Add Batch"
                  backgroundColor="red"
                />
              </form>
            </fieldset>
            <CommonButton
              type="button"
              label="Continue to Submit"
              onClick={setBatchesToFullForm}
              backgroundColor="blue"
            />
          </fieldset>
        )}
        {submitButton && (
          <CommonButton
            type="button"
            label="submit form"
            onClick={submitForm}
            backgroundColor="green"
          />
        )}
      </fieldset>
    </div>
  );
}
