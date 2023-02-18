import { SortingAnimationType } from "@utils/types";

export const sortingAnimationSpeed: Record<SortingAnimationType, number> = {
  normal: 300,
  swap: 300,
  focus: 150,
  done: 150,
  clear: 150,
  reset: 150,
  move: 0,
  none: 0,
};

export const sortingTransitionSpeed: Record<SortingAnimationType, number> = {
  normal: 0.3,
  swap: 0.3,
  focus: 0.3,
  done: 0.3,
  clear: 0.3,
  reset: 0,
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

export const barIconSize = 32;
export const maxBars = 17;
