"use client";

import React, { useState, useEffect } from "react";

import "./MapChart.css";
import useCountryStore from "./useCountryStore";
import { SearchBox } from "@/components/custom/SearchBox";
import { DarkSwitch } from "@/components/ui/darkSwitch";
import { Switch } from "@/components/ui/switch";
import {
  IconRefresh,
} from "@tabler/icons-react";
import ShuffleCountries from "../components/custom/shuffle";
import TabDiv from "../components/custom/FrameChildren/TabDiv";
import { MapDiv } from "@/components/custom/FrameChildren/MapDiv";
import IconButton from "../components/custom/boxbutton";
import MapFrame from "@/components/custom/FrameMapAndSidebar";

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/*
Future goals for this project:
4. decide to delete or fix the second order setting
5 . Toggle between: different projections? different color schemes? different data?
6. Option to amplify/bolden when the projections are small
7. Text based summary using GPT

Possible in the backened I need to weigh the importance of each relationship.

1. Add prominent conflicts to the map

*/

export default function MapChart() {
  const resetAllExcept = useCountryStore((state) => state.resetAllExcept);
  const { setMapMode } = useCountryStore((state) => ({
    setMapMode: state.setMapMode,
  }));

  useEffect(() => {
    resetAllExcept();
    setMapMode("single");
  }, []);
  return (
    <MapFrame
      LeftSidebar={LeftSidebar}
      RightSidebar={RightSidebar}
      TabDiv = {TabDiv}
      MapDiv = {MapDiv}
      pageMode = "single"
    />
  );
}

const RightSidebar = () => {
  return (
    <div className="h-[60%] w-full flex items-start justify-center px-0 pt-4 xl:px-0.5 sm:pt-2 xl:pt-4">
      <div className="w-full">
        <h2 className=" font-semibold mb-2 pl-3 text-sm lg:text-base">Country Search</h2>
        <SearchBox />
      </div>
    </div>
  );
};

const LeftSidebar = () => {
  return (
    <div className="flex flex-col justify-evenly  text-sm">
                <div className="flex justify-evenly mt-4">
            <ShuffleCountries singleMode = {true} />
            <ResetCountries />
          </div>


      <div className="h-1/3 p-1 lg:p-[1.5px] xl:p-4 border-muted w-full text-sm">
        <h2 className=" font-semibold">Presets</h2>
        <div className="mt-2 overflow-hidden">
          <PresetPairings />
        </div>
      </div>
    </div>
  );
};

const PresetPairings = () => {
  const resetAllExcept = useCountryStore((state) => state.resetAllExcept);
  const setCountryPhase = useCountryStore((state) => state.setCountryPhase);
  const mapMode = useCountryStore((state) => state.mapMode);

  const handlePairingSelection = (event) => {
    const [country1, country2] = event.target.value.split("-");
    resetAllExcept();
    setCountryPhase(country1.trim(), 2);
    if (country2) {
      setTimeout(() => {
        setCountryPhase(country2.trim(), 3);
      }, 1);
    }
  };

  const handleSingleCountrySelection = (event) => {
    const country = event.target.value;
    resetAllExcept();
    setCountryPhase(country, 2);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center overflow-y-auto ">
      {mapMode === "single" ? (
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button className="rounded-md shadow bg-primary text-white p-1" onClick={() => handleSingleCountrySelection({ target: { value: 'Palestine' } })}>Palestine</button>
          <button className="rounded-md shadow bg-primary text-white p-1" onClick={() => handleSingleCountrySelection({ target: { value: 'Israel' } })}>Israel</button>
          <button className="rounded-md shadow bg-primary text-white p-1" onClick={() => handleSingleCountrySelection({ target: { value: 'Kosovo' } })}>Kosovo</button>
          <button className="rounded-md shadow bg-primary text-white p-1" onClick={() => handleSingleCountrySelection({ target: { value: 'Cyprus' } })}>Cyprus</button>
          <button className="rounded-md shadow bg-primary text-white p-1" onClick={() => handleSingleCountrySelection({ target: { value: 'Taiwan' } })}>Taiwan</button>
          <button className="rounded-md shadow bg-primary text-white p-1" onClick={() => handleSingleCountrySelection({ target: { value: 'Armenia' } })}>Armenia</button>
        </div>
      ) : (
        <select
          className="rounded shadow bg-primary-foreground text-wh mb-2 w-40"
          onChange={handlePairingSelection}
        >
          <option value="">Select pairing</option>
          <option value="Israel - Iran">Israel - Iran</option>
          <option value="Saudi Arabia - Iran">Saudi Arabia - Iran</option>
          <option value="United States - Iran">United States - Iran</option>
          <option value="United States - Russia">United States - Russia</option>
          <option value="United States - China">United States - China</option>
          <option value="Israel - Palestine">Israel - Palestine</option>
          <option value="Armenia - Azerbaijan">Armenia - Azerbaijan</option>
          <option value="India - Pakistan">India - Pakistan</option>
          <option value="North Korea - South Korea">
            North Korea - South Korea
          </option>
          <option value="Russia - Ukraine">Russia - Ukraine</option>
          <option value="Turkey - Greece">Turkey - Greece</option>
          <option value="China - Taiwan">China - Taiwan</option>
          <option value="China - India">China - India</option>
          <option value="Iran - Saudi Arabia">Iran - Saudi Arabia</option>
          <option value="Syria - Turkey">Syria - Turkey</option>
          <option value="Saudi Arabia - Yemen">Saudi Arabia - Yemen</option>
          <option value="Ethiopia - Egypt">Ethiopia - Egypt</option>
        </select>
      )}
    </div>
  );
};

// refresh button to reset all countries
const ResetCountries = () => {
  const resetAllExcept = useCountryStore((state) => state.resetAllExcept);
  return (
    <IconButton
      icon={IconRefresh}
      size = "medium"
      onClick={() => {
        resetAllExcept();
      }}
    />
  );
};

export const MapControls = ({}) => {
  const { mapMode, setMapMode } = useCountryStore((state) => ({
    mapMode: state.mapMode,
    setMapMode: state.setMapMode,
  }));

  const handleSingleModeToggle = async () => {
    console.log("single mode toggle");
    setMapMode(mapMode == "single" ? "default" : "single");
  };

  const handleProjectionToggle = async () => {
    setMapMode(mapMode != "off" ? "off" : "default");
  };

  const handleWarToggle = async () => {
    setMapMode(mapMode === "war" ? "default" : "war");
  };

  return (
    <div className="view-options-container flex-col overflow-hidden justify-between items-around  text-black font-medium">
      <div className="block ml-1 lg:ml-0 mt-1 md:my-2 lg:my-2 ">
        <Switch
          checked={mapMode != "off"}
          onCheckedChange={handleProjectionToggle}
        />
        <label
          className="toggle-label relative -top-0.5 ml-1"
          onClick={handleProjectionToggle}
        >
          {" "}
          Geopolitics
        </label>
      </div>
      <div className="block ml-1 lg:ml-0 mt-1 md:mt-2 lg:mt-2">
        <Switch checked={mapMode == "war"} onCheckedChange={handleWarToggle} />
        <label
          className="toggle-label relative -top-0.5 whitespace-nowrap justify-center ml-1"
          onClick={handleWarToggle}
        >
          {"  "}
          WW3
        </label>
      </div>
    </div>
  );
};
