import { SortingAnimation } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const selectionSort = (values: number[]): SortingAnimation[] => {
  const n = values.length;
  const animations: SortingAnimation[] = [];

  for (let i = 0; i < n; i++) {
    let smallestIdx = i;
    animations.push(getSortingAnimation("range", [i, n - 1]));
    animations.push(getSortingAnimation("focus", [smallestIdx]));

    for (let j = i + 1; j < n; j++) {
      animations.push(getSortingAnimation("compare", [j]));
      if (values[smallestIdx] > values[j]) {
        animations.push(getSortingAnimation("range", [smallestIdx]));
        smallestIdx = j;
        animations.push(getSortingAnimation("focus", [smallestIdx], 0));
        continue;
      }

      if (smallestIdx !== j) {
        animations.push(getSortingAnimation("range", [j]));
      }
    }

    if (smallestIdx !== i) {
      swap(values, i, smallestIdx);
      animations.push(getSortingAnimation("swap", [i, smallestIdx]));
    }
    animations.push(getSortingAnimation("done", [i]));
  }

  return animations;
};
