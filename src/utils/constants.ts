export const predictionFieldOptions = [
  "Theme",
  "Sub-theme",
  "Reason",
  "Language",
  "Source",
  "Rating",
  "Time Period",
];

export const commonFieldOptions = ["Customer ID"];

export const condOptions = [
  "Equals",
  "Does not equal",
  "Like",
  "Not like",
  "Is Empty",
  "Is",
  "Is not",
];

export const ThemeValues = [
  "Offers",
  "Performance",
  "Platform",
  "Product Feedback",
];

export const SubThemeValues = [
  "Retention",
  "Engagement",
  "Customer Satisfaction",
  "Efficiency",
  "Growing",
  "Other",
];

export const LanguageValues = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
];

export const SourceValues = [
  "Facebook",
  "Twitter",
  "Instagram",
  "LinkedIn",
  "Google",
];

export const RatingValues = ["1", "2", "3", "4", "5"];

export const dropdownValues = [
  "Theme",
  "Sub-theme",
  "Language",
  "Source",
  "Rating",
  "",
];

export interface FilterShape {
  type: "rule";
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
  id?: string;
}

export interface FilterGroupsShape {
  children: FilterShape[];
  conjuction?: "AND" | "OR";
  not?: boolean;
  type: "rule_group";
}