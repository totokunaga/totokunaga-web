export type BarStatus = "normal" | "swap" | "focus" | "compare" | "range";
export type SortingAnimationType = BarStatus | "clear" | "reset";

export type InnerValue = {
  value: number;
  status: SortingAnimationType;
  size: number;
  left: number | string;
};

export type SortingAnimation = {
  type: SortingAnimationType;
  positionOne: number;
  positionTwo: number;
  duration: number;
};
