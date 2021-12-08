import { useEffect, useState } from "react";
import Dropdown, { dropdownProps } from "./Dropdown";
import {
  commonFieldOptions,
  condOptions,
  predictionFieldOptions,
  ThemeValues,
  dropdownValues,
  SubThemeValues,
  LanguageValues,
  SourceValues,
  RatingValues,
} from "../utils/constants";
import InputField from "./InputField";
import deleteIcon from "../assets/icons/delete.svg";

const fieldOptions: dropdownProps["options"] = [
  {
    title: "PREDICTION",
    value: predictionFieldOptions,
  },
  { title: "COMMON", value: commonFieldOptions },
];

const conditionOptions: dropdownProps["options"] = [
  {
    title: "",
    value: condOptions,
  },
];

const getCriteriaOptions = (type: string) => {
  switch (type) {
    case "Theme":
      return ThemeValues;

    case "Sub-theme":
      return SubThemeValues;

    case "Language":
      return LanguageValues;

    case "Source":
      return SourceValues;

    case "Rating":
      return RatingValues;

    default:
      return [];
  }
};

export interface FilterShape {
  type: "rule" | "rule_group";
  field:
    | "Theme"
    | "Sub-theme"
    | "Reason"
    | "Language"
    | "Source"
    | "Rating"
    | "Time Period"
    | "Customer ID"
    | "";
  condition:
    | "Equals"
    | "Does not equal"
    | "Like"
    | "Not like"
    | "Is Empty"
    | "Is"
    | "Is not"
    | "";
  value: string;
}

type FilterProps = {
  filterGroupsRef: any;
  deletable: boolean;
  onDelete: () => void;
};

const Filter = (props: FilterProps) => {
  const [field, setField] = useState("");
  const [condition, setCondition] = useState("");
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    setCriteria("");
  }, [field]);

  return (
    <div className="flex mt-4 gap-x-4">
      <Dropdown
        title="Field"
        placeholder="Select field"
        selected={field}
        setSelected={setField}
        options={fieldOptions}
      />
      <Dropdown
        title="Condition"
        placeholder="Select condition"
        selected={condition}
        setSelected={setCondition}
        options={conditionOptions}
      />

      {dropdownValues.includes(field) && (
        <Dropdown
          title="Criteria"
          placeholder="Select criteria"
          selected={criteria}
          setSelected={setCriteria}
          options={[
            {
              title: "",
              value: getCriteriaOptions(field),
            },
          ]}
        />
      )}

      {field === "Reason" && (
        <InputField
          placeholder="Enter reason"
          value={criteria}
          onChange={setCriteria}
          label="Criteria"
          type="text"
        />
      )}

      {field === "Time Period" && (
        <InputField
          placeholder="Choose time period"
          value={criteria}
          onChange={setCriteria}
          label="Criteria"
          type="date"
        />
      )}

      {field === "Customer ID" && (
        <InputField
          placeholder="Enter customer ID"
          value={criteria}
          onChange={setCriteria}
          label="Criteria"
          type="number"
        />
      )}

      {props.deletable && (
        <div
          className="h-9 w-9 bg-grey-400 flex align-center justify-center rounded-md p-1 mt-6 hover:bg-black cursor-pointer"
          onClick={props.onDelete}
        >
          <img alt="" src={deleteIcon} />
        </div>
      )}
    </div>
  );
};

export default Filter;
