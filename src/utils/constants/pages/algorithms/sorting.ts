import { SortingAnimationType } from "@utils/types";

export const sortingAnimationSpeed: Record<SortingAnimationType, number> = {
  normal: 150,
  swap: 300,
  focus: 150,
  compare: 150,
  range: 150,
  done: 150,
  clear: 150,
  reset: 150,
  move: 0,
  none: 0,
};

export const baseColoringSpped = 0.1;
export const baseSwapSpeed = 0.25;

export const BAR_BLOCK_WRAPPER = "barblock-wrapper";
export const minBars = 6;
export const defaultHeightUnit = 45;
export const defaultBarWidth = 45;
export const spaceBetweenBars = 8;

export const barBlockBottomOffset = 75;
export const barIconSize = 32;
export const maxBars = 17;
