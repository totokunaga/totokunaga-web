import { SortingAnimation, SortingPrevAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation2 } from "..";

export const selectionSort = (values: number[]): SortingAnimation[] => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  const prevAnimation = new SortingPrevAnimationType("none");

  for (let i = 0; i < n; i++) {
    let smallestIdx = i;
    animations.push(getSortingAnimation2("range", [i, n - 1], prevAnimation));
    animations.push(
      getSortingAnimation2("focus", [smallestIdx], prevAnimation)
    );

    for (let j = i + 1; j < n; j++) {
      animations.push(getSortingAnimation2("compare", [j], prevAnimation));
      if (values[smallestIdx] > values[j]) {
        animations.push(
          getSortingAnimation2("range", [smallestIdx], prevAnimation)
        );
        smallestIdx = j;
        animations.push(
          getSortingAnimation2("focus", [smallestIdx], prevAnimation)
        );
        continue;
      }

      if (smallestIdx !== j) {
        animations.push(getSortingAnimation2("range", [j], prevAnimation));
      }
    }

    if (smallestIdx !== i) {
      swap(values, i, smallestIdx);
      animations.push(
        getSortingAnimation2("swap", [i, smallestIdx], prevAnimation)
      );
    }
    animations.push(getSortingAnimation2("done", [i], prevAnimation));
  }

  return animations;
};
