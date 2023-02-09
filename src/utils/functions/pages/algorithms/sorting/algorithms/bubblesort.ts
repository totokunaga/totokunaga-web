import {
  SortingAnimation,
  SortingAnimationType,
  SortingPrevAnimationType,
} from "@utils/types";
import { swap } from ".";
import { getSortingAnimation2 } from "..";

export const bubblesort = (values: number[]) => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  let prevAnimation = new SortingPrevAnimationType("none");

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    animations.push(
      getSortingAnimation2("range", [0, n - i - 1], prevAnimation)
    );

    for (let j = 1; j < n - i; j++) {
      animations.push(getSortingAnimation2("compare", [j], prevAnimation));
      if (values[j - 1] > values[j]) {
        animations.push(getSortingAnimation2("focus", [j - 1], prevAnimation));
        animations.push(
          getSortingAnimation2("swap", [j - 1, j], prevAnimation)
        );
        animations.push(
          getSortingAnimation2("range", [j - 1, j], prevAnimation)
        );

        swap(values, j, j - 1);
        swapped = true;
        continue;
      }
      animations.push(getSortingAnimation2("range", [j], prevAnimation));
    }
    animations.push(getSortingAnimation2("done", [n - i - 1], prevAnimation));

    if (!swapped) {
      for (let j = n - i - 2; j > 0; j--) {
        animations.push(getSortingAnimation2("done", [j], prevAnimation));
      }
      break;
    }
  }
  animations.push(getSortingAnimation2("done", [0], prevAnimation));
  return animations;
};
