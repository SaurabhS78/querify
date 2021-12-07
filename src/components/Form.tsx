import { useState } from "react";
import infoIcon from "../assets/icons/info.svg";
import {
  activeToggleStyle,
  buttonStyles,
  inactiveToggleStyle,
} from "../styles/classNames";

const Form = () => {
  const [toggle, setToggle] = useState("AND");

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
      <button className={buttonStyles + " mt-4"}>+ Add filter</button>
    </div>
  );
};

export default Form;
