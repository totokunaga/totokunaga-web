import { SortingAnimation } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

const quicksortHelper = (
  values: number[],
  left: number,
  right: number,
  animations: SortingAnimation[]
) => {
  if (left >= right) {
    if (left === right) {
      animations.push(getSortingAnimation("done", [left]));
    }
    return animations;
  }

  animations.push(getSortingAnimation("range", [left, right]));

  const pivot = values[right];
  let swapIdx = left;
  animations.push(getSortingAnimation("focus", [right]));

  for (let i = left; i < right; i++) {
    animations.push(getSortingAnimation("compare", [i]));
    if (values[i] <= pivot) {
      if (swapIdx < i) {
        animations.push(getSortingAnimation("swap", [swapIdx, i]));
        animations.push(getSortingAnimation("range", [swapIdx, i]));
      }
      swap(values, swapIdx, i);
      swapIdx++;

      continue;
    }

    animations.push(getSortingAnimation("range", [i]));
  }

  if (swapIdx < right) {
    swap(values, swapIdx, right);
    animations.push(getSortingAnimation("swap", [swapIdx, right]));
  }
  animations.push(getSortingAnimation("done", [swapIdx]));

  if (swapIdx > left)
    animations.push(getSortingAnimation("clear", [left, swapIdx - 1], 0));
  if (swapIdx < right)
    animations.push(getSortingAnimation("clear", [swapIdx + 1, right], 0));

  quicksortHelper(values, left, swapIdx - 1, animations);
  quicksortHelper(values, swapIdx + 1, right, animations);
  return animations;
};

export const quicksort = (values: number[]) => {
  const animations = quicksortHelper(values, 0, values.length - 1, []);
  return animations;
};
