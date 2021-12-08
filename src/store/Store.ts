import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
import { FilterGroupsShape, FilterShape } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import parseRuleGroup from "../utils/parseRuleGroup";

export interface RuleGroupType {
  id: string;
  group: FilterGroupsShape;
}

const RuleDefault: FilterShape = {
  type: "rule",
  field: "",
  condition: "",
  value: "",
};

const RuleGroupDefault: FilterGroupsShape = {
  children: [{ ...RuleDefault, id: uuidv4() }],
  conjuction: "AND",
  not: false,
  type: "rule_group",
};

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  RuleGroups: RuleGroupType[] = [
    {
      id: uuidv4(),
      group: RuleGroupDefault,
    },
  ];

  addRuleGroup = () => {
    this.RuleGroups.push({ group: RuleGroupDefault, id: uuidv4() });
  };

  toggleRuleGroupConjuction = (id: string, conjuction: "AND" | "OR") => {
    const index = _.findIndex(this.RuleGroups, { id });
    this.RuleGroups[index].group.conjuction = conjuction;
  };

  addRule = (group_id: string) => {
    const group = _.find(this.RuleGroups, { id: group_id });
    const index = _.findIndex(this.RuleGroups, { id: group_id });

    if (group) {
      group.group.children.push({ ...RuleDefault, id: uuidv4() });
      this.RuleGroups[index] = group;
    }
  };

  deleteRule = (group_id: string, rule_id: string) => {
    const group = _.find(this.RuleGroups, { id: group_id });
    const index = _.findIndex(this.RuleGroups, { id: group_id });

    if (group) {
      _.remove(group.group.children, { id: rule_id });
      this.RuleGroups[index] = group;
    }
  };

  updateRule = (group_id: string, rule_id: string, rule: FilterShape) => {
    const group = _.find(this.RuleGroups, { id: group_id });
    const index = _.findIndex(this.RuleGroups, { id: group_id });

    if (group) {
      const rule_index = _.findIndex(group.group.children, { id: rule_id });
      group.group.children[rule_index] = rule;
      this.RuleGroups[index] = group;
    }
  };

  getQueryString = () => parseRuleGroup(this.RuleGroups);
  getQueryObject = () => toJS(this.RuleGroups);
}

export default createContext(new Store());
