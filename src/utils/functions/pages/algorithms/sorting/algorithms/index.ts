import { SortingAlgorithm, SortingFunction } from "@utils/types";
import { quicksort } from "./quick-sort";
import { selectionSort } from "./selection-sort";

export * from "./selection-sort";
export * from "./quick-sort";

export const sortingAlgorithms: Record<SortingAlgorithm, SortingFunction> = {
  Quicksort: quicksort,
  "Selection sort": selectionSort,
};

export const swap = <T>(values: T[], i: number, j: number) => {
  const temp = values[i];
  values[i] = values[j];
  values[j] = temp;
};
