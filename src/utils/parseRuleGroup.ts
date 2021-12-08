import { RuleGroupType } from "../store/Store";

const santize = (string: string) => {
  let newStr = string.replace("-", "");
  newStr = newStr.replace(" ", "");
  newStr = newStr.toLowerCase();
  return newStr;
};

const getCondtionSymbol = (condition: string) => {
  switch (condition) {
    case "Equals":
      return "==";
    case "Does not equal":
      return "!=";
    case "Like":
      return "LIKE";
    case "Not like":
      return "!LIKE";
    case "Is Empty":
      return "IS_NULL";
    case "Is not Empty":
      return "!IS_NULL";
    case "Is":
      return "===";
    case "Is not":
      return "!==";
    case "AND":
      return "&&";
    case "OR":
      return "||";
    default:
      return "";
  }
};

export default function parseRuleGroup(ruleGroup: RuleGroupType[]) {
  let QueryString = "";
  ruleGroup.forEach((group) => {
    group.group.children.forEach((rule, index) => {
      QueryString += ` "(field.${santize(rule.field)}) ${getCondtionSymbol(
        rule.condition
      )} \\"${rule.value}"\\" ${
        index !== group.group.children.length - 1
          ? getCondtionSymbol(group.group.conjuction || "")
          : ""
      }`;
    });
  });

  return QueryString;
}

