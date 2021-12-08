import { useState } from "react";
import infoIcon from "../assets/icons/info.svg";
import {
  activeToggleStyle,
  buttonStyles,
  inactiveToggleStyle,
} from "../styles/classNames";
import Dropdown, { dropdownProps } from "./Dropdown";

const fieldOptions: dropdownProps["options"] = [
  {
    title: "PREDICTION",
    value: [
      "Theme",
      "Sub-theme",
      "Reason",
      "Language",
      "Source",
      "Rating",
      "Time Period",
    ],
  },
  { title: "COMMON", value: ["Customer ID"] },
];

const Form = () => {
  const [toggle, setToggle] = useState("AND");
  const [field, setField] = useState("");

  return (
    <div className="bg-dark rounded-sm p-4 mb-5 border border-grey-200">
      <div className="text-sm text-white font-medium">
        <span
          className={`rounded-l-sm ${
            toggle === "AND" ? activeToggleStyle : inactiveToggleStyle
          }`}
          onClick={() => setToggle("AND")}
        >
          AND
        </span>
        <span
          className={`rounded-r-sm ${
            toggle === "OR" ? activeToggleStyle : inactiveToggleStyle
          }`}
          onClick={() => setToggle("OR")}
        >
          OR
        </span>
        <img src={infoIcon} className="inline-block ml-2" alt="info" />
      </div>

      <div className="flex mt-4">
        <Dropdown
          title="Field"
          placeholder="Select field"
          selected={field}
          setSelected={setField}
          options={fieldOptions}
        />
      </div>

      <button className={buttonStyles + " mt-4"}>+ Add filter</button>
    </div>
  );
};

export default Form;
