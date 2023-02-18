import { SortingAlgorithm, SortingFunction } from "@utils/types";
import { bubblesort } from "./bubblesort";
import { heapsort } from "./heapsort";
import { insertionSort } from "./insertion-sort";
import { quicksort } from "./quicksort";
import { selectionSort } from "./selection-sort";

export * from "./selection-sort";
export * from "./quicksort";
export * from "./bubblesort";
export * from "./shuffle";
export * from "./insertion-sort";
export * from "./heapsort";
export * from "./mergesort";

export const sortingAlgorithms: Record<SortingAlgorithm, SortingFunction> = {
  Quicksort: quicksort,
  Selection: selectionSort,
  Bubble: bubblesort,
  Insertion: insertionSort,
  Heapsort: heapsort,
};

export const swap = <T>(values: T[], i: number, j: number) => {
  const temp = values[i];
  values[i] = values[j];
  values[j] = temp;
};
