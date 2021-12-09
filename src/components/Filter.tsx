/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import Dropdown, { dropdownProps } from "./Dropdown";
import {
  commonFieldOptions,
  predictionFieldOptions,
  ThemeValues,
  dropdownValues,
  SubThemeValues,
  LanguageValues,
  SourceValues,
  RatingValues,
  FilterShape,
  condOptionType1,
  condOptionType3,
  condOptionType2,
  condOptionType4,
  condOptionType5,
  condOptionType6,
  condOptionType7,
} from "../utils/constants";
import InputField from "./InputField";
import deleteIcon from "../assets/icons/delete.svg";
import { observer } from "mobx-react-lite";
import Store from "../store/Store";
import { v4 as uuidv4 } from "uuid";

const fieldOptions: dropdownProps["options"] = [
  {
    title: "PREDICTION",
    value: predictionFieldOptions,
  },
  { title: "COMMON", value: commonFieldOptions },
];

const getConditionOptions = (field: string) => {
  switch (field) {
    case "Theme":
      return [...condOptionType3, ...condOptionType4];
    case "Sub-theme":
      return [...condOptionType2, ...condOptionType3];
    case "Reason":
      return [...condOptionType2, ...condOptionType4, ...condOptionType6];
    case "Language":
      return [...condOptionType3, ...condOptionType6, ...condOptionType4];
    case "Source":
      return [...condOptionType3, ...condOptionType6];
    case "Rating":
      return [...condOptionType1, ...condOptionType5];
    case "Time Period":
      return [...condOptionType1, ...condOptionType7];
    case "Customer ID":
      return [...condOptionType1, ...condOptionType6];
    default:
      return [];
  }
};

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

type FilterProps = {
  deletable: boolean;
  onDelete: () => void;
  rule: FilterShape;
  group_id: string;
};

const Filter = (props: FilterProps) => {
  const [field, setField] = useState<FilterShape["field"]>("");
  const [condition, setCondition] = useState<FilterShape["condition"]>("");
  const [criteria, setCriteria] = useState<FilterShape["value"]>("");

  const { updateRule } = useContext(Store);

  useEffect(() => {
    setCriteria("");
  }, [field]);

  useEffect(() => {
    const newRule: FilterShape = {
      ...props.rule,
      field,
      condition,
      value: criteria,
    };

    updateRule(props.group_id, newRule.id || uuidv4(), newRule);
  }, [field, condition, criteria]);

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
        options={[
          {
            title: "",
            value: getConditionOptions(field),
          },
        ]}
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

export default observer(Filter);
