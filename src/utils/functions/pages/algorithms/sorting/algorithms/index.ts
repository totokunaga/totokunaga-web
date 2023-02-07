import { SortingAlgorithm, SortingFunction } from "@utils/types";
import { bubblesort } from "./bubblesort";
import { quicksort } from "./quicksort";
import { selectionSort } from "./selection-sort";

export * from "./selection-sort";
export * from "./quicksort";
export * from "./bubblesort";
export * from "./shuffle";

export const sortingAlgorithms: Record<SortingAlgorithm, SortingFunction> = {
  Quicksort: quicksort,
  Selection: selectionSort,
  Bubble: bubblesort,
};

export const swap = <T>(values: T[], i: number, j: number) => {
  const temp = values[i];
  values[i] = values[j];
  values[j] = temp;
};
