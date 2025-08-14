export const BTN_SIZE_VAR = {
  lg: "h-8 md:h-9 text-xs w-full",
  md: "h-6 md:h-[30px] text-xs w-full",
  text: "text-sm md:text-base underline underline-offest-8 w-fit",
} as const;

export const BTN_COLOR_VAR = {
  blue01Filled: "bg-blue01 text-white hover:bg-blue02 focus:bg-blue02",
  blue03Outline:
    "border border-blue03 text-blue03 hover:border-blue04 focus:border-blue04 hover:text-blue04 focus:text-blue04",
  blue03Text: "text-blue03 hover:text-blue04 focus:text-blue04",
  disabled: "bg-bg03 text-white",
  textDisabled: "text-bg03",
} as const;

export const INPUT_COLOR_VAR = {
  default: "border-text04 ",
  focused: "border-blue01",
  warning: "border-negative",
  disabled: "border-bg03 cursor-not-allowed",
};

export const INPUT_STATUS_VAR = {
  default: "default",
  focused: "focused",
  warning: "warning",
  disabled: "disabled",
} as const;
