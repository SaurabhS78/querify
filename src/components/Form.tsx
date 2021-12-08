import { useContext } from "react";
import infoIcon from "../assets/icons/info.svg";
import Filter from "./Filter";
import {
  activeToggleStyle,
  buttonStyles,
  inactiveToggleStyle,
} from "../styles/classNames";
import { FilterGroupsShape } from "../utils/constants";
import Store from "../store/Store";
import { observer } from "mobx-react-lite";

interface Props {
  ruleGroup: FilterGroupsShape;
  id: string;
}

const Form = (props: Props) => {
  const { toggleRuleGroupConjuction, deleteRule, addRule } = useContext(Store);

  const handleToggleConjuction = (value: "AND" | "OR") => {
    toggleRuleGroupConjuction(props.id, value);
  };

  const { conjuction, children } = props.ruleGroup;

  return (
    <div className="bg-dark rounded-sm p-4 mb-5 border border-grey-200">
      <div
        className={` ${
          children.length < 2 ? "hidden" : ""
        } text-sm text-white font-medium`}
      >
        <span
          className={`rounded-l-sm ${
            conjuction === "AND" ? activeToggleStyle : inactiveToggleStyle
          }`}
          onClick={() => handleToggleConjuction("AND")}
        >
          AND
        </span>
        <span
          className={`rounded-r-sm ${
            conjuction === "OR" ? activeToggleStyle : inactiveToggleStyle
          }`}
          onClick={() => handleToggleConjuction("OR")}
        >
          OR
        </span>
        <img src={infoIcon} className="inline-block ml-2" alt="info" />
      </div>

      {children.map((rule, index) => (
        <Filter
          key={rule.id}
          deletable={index !== 0}
          onDelete={() => deleteRule(props.id, rule.id || "")}
          rule={rule}
          group_id={props.id}
        />
      ))}

      <button
        className={buttonStyles + " mt-4"}
        onClick={() => addRule(props.id)}
      >
        + Add filter
      </button>
    </div>
  );
};

export default observer(Form);
