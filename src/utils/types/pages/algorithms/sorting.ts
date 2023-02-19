import { SetStateAction } from "react";

export type BarStatus = "normal" | "swap" | "focus" | "done";
export type SortingAnimationType =
  | BarStatus
  | "clear"
  | "reset"
  | "move"
  | "none";

export class SortingPrevAnimationType {
  type: SortingAnimationType;

  constructor(type: SortingAnimationType) {
    this.type = type;
  }
}

export type SortableBar = {
  value: number;
  status: SortingAnimationType;
  relativeIndex: number;
};

export type InnerValue = {
  value: number;
  status: SortingAnimationType;
  size: number;
  left: number | string;
};

export type SortingAnimation = {
  type: SortingAnimationType;
  positionOne?: number;
  positionTwo?: number;
  positions?: number[];
  duration: number;
};

export type SwapSortingAlgorithm =
  | "Quicksort"
  | "Selection"
  | "Bubble"
  | "Insertion"
  | "Heapsort";
export type NonswapSortingAlgorithm = "Mergesort";
export type SortingAlgorithm = SwapSortingAlgorithm | NonswapSortingAlgorithm;

export const QUICKSORT = "Quicksort";
export const SELECTION_SORT = "Selection";
export const BUBBLE_SORT = "Bubble";
export const INSERTION_SORT = "Insertion";
export const HEAPSORT = "Heapsort";
export const MERGESORT = "Mergesort";
export const sortingNames: Record<SortingAlgorithm, string> = {
  Quicksort: QUICKSORT,
  Selection: SELECTION_SORT,
  Bubble: BUBBLE_SORT,
  Insertion: INSERTION_SORT,
  Heapsort: HEAPSORT,
  Mergesort: MERGESORT,
};

export const swapSortingAlgorithmSet = new Set([
  QUICKSORT,
  SELECTION_SORT,
  BUBBLE_SORT,
  INSERTION_SORT,
  HEAPSORT,
]);

export type SwapSortingFunction = (values: number[]) => SortingAnimation[];
export type NonswapSortingFunction = (
  values: number[],
  bars: SortableBar[],
  indexes: number[],
  setBars: (value: SetStateAction<SortableBar[]>) => void,
  setIndexes: (value: SetStateAction<number[]>) => void
) => any[];
export type SortingFunction = SwapSortingFunction | NonswapSortingFunction;
