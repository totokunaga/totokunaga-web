import { SortingAnimation, SortingPrevAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const insertionSort = (values: number[]) => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  const prevAnimation = new SortingPrevAnimationType("none");

  for (let i = 1; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (values[j] > values[j + 1]) {
        swap(values, j, j + 1);
        animations.push(getSortingAnimation("swap", [j, j + 1], prevAnimation));
        animations.push(
          getSortingAnimation("clear", [j, j + 1], prevAnimation)
        );
      } else {
        break;
      }
    }
  }

  values.forEach((_, i) => {
    animations.push(getSortingAnimation("done", [i], prevAnimation));
  });

  return animations;
};
