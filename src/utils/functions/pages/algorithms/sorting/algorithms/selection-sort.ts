import { SortingAnimation, SortingPrevAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const selectionSort = (values: number[]): SortingAnimation[] => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  const prevAnimation = new SortingPrevAnimationType("none");

  for (let i = 0; i < n; i++) {
    let smallestIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (values[smallestIdx] > values[j]) {
        smallestIdx = j;
        continue;
      }
    }

    if (smallestIdx !== i) {
      swap(values, i, smallestIdx);
      animations.push(
        getSortingAnimation("focus", [smallestIdx], prevAnimation)
      );
      animations.push(
        getSortingAnimation("swap", [i, smallestIdx], prevAnimation)
      );
      animations.push(
        getSortingAnimation("clear", [i, smallestIdx], prevAnimation)
      );
    }
    animations.push(getSortingAnimation("done", [i], prevAnimation));
  }

  return animations;
};
