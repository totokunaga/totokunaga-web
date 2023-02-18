import { SortingAnimation, SortingPrevAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const bubblesort = (values: number[]) => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  const prevAnimation = new SortingPrevAnimationType("none");

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    animations.push(
      getSortingAnimation("clear", [0, n - i - 1], prevAnimation)
    );

    for (let j = 1; j < n - i; j++) {
      if (values[j - 1] > values[j]) {
        animations.push(getSortingAnimation("focus", [j - 1], prevAnimation));
        animations.push(getSortingAnimation("swap", [j - 1, j], prevAnimation));
        animations.push(
          getSortingAnimation("clear", [j - 1, j], prevAnimation)
        );

        swap(values, j, j - 1);
        swapped = true;
        continue;
      }
      animations.push(getSortingAnimation("clear", [j], prevAnimation));
    }
    animations.push(getSortingAnimation("done", [n - i - 1], prevAnimation));

    if (!swapped) {
      for (let j = n - i - 2; j > 0; j--) {
        animations.push(getSortingAnimation("done", [j], prevAnimation));
      }
      break;
    }
  }
  animations.push(getSortingAnimation("done", [0], prevAnimation));
  return animations;
};
