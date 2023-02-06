import { SortingAnimationType } from "@utils/types";

export const sortingAnimationSpeed: Record<SortingAnimationType, number> = {
  normal: 200,
  swap: 300,
  focus: 200,
  compare: 200,
  range: 300,
  done: 200,
  clear: 200,
  reset: 200,
  move: 0,
};

export const BAR_BLOCK_WRAPPER = "barblock-wrapper";
export const defaultHeightUnit = 45;
export const defaultBarWidth = 45;
export const spaceBetweenBars = 8;

export const barBlockBottomOffset = 75;
export const barIconSize = 32;
export const maxBars = 17;
