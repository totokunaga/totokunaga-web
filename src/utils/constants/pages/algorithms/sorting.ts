import { SortingAnimationType } from "@utils/types";

export const sortingAnimationSpeed: Record<SortingAnimationType, number> = {
  normal: 300,
  swap: 400,
  focus: 300,
  compare: 300,
  range: 300,
  done: 300,
  clear: 300,
  reset: 300,
  move: 0,
};

export const BAR_BLOCK_WRAPPER = "barblock-wrapper";
export const defaultHeightUnit = 45;
export const defaultBarWidth = 45;
export const spaceBetweenBars = 8;

export const barBlockBottomOffset = 65;
export const barIconSize = 32;
export const maxBars = 17;
