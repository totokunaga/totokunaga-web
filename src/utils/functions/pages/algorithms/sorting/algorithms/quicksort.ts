import { SortingAnimation, SortingPrevAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation2 } from "..";

const quicksortHelper = (
  values: number[],
  left: number,
  right: number,
  animations: SortingAnimation[],
  prevAnimation: SortingPrevAnimationType
) => {
  if (left >= right) {
    if (left === right) {
      animations.push(getSortingAnimation2("done", [left], prevAnimation));
    }
    return animations;
  }

  const pivot = values[right];
  let swapIdx = left;
  animations.push(getSortingAnimation2("focus", [right], prevAnimation));

  for (let i = left; i < right; i++) {
    if (values[i] <= pivot) {
      if (swapIdx < i) {
        animations.push(
          getSortingAnimation2("swap", [swapIdx, i], prevAnimation)
        );
        animations.push(
          getSortingAnimation2("range", [swapIdx, i], prevAnimation)
        );
      }

      swap(values, swapIdx, i);
      swapIdx++;

      continue;
    }
  }

  if (swapIdx < right) {
    swap(values, swapIdx, right);
    animations.push(
      getSortingAnimation2("swap", [swapIdx, right], prevAnimation)
    );
  }
  animations.push(getSortingAnimation2("done", [swapIdx], prevAnimation));

  if (swapIdx > left)
    animations.push(
      getSortingAnimation2("clear", [left, swapIdx - 1], prevAnimation)
    );
  if (swapIdx < right)
    animations.push(
      getSortingAnimation2("clear", [swapIdx + 1, right], prevAnimation)
    );

  quicksortHelper(values, left, swapIdx - 1, animations, prevAnimation);
  quicksortHelper(values, swapIdx + 1, right, animations, prevAnimation);
  return animations;
};

export const quicksort = (values: number[]) => {
  const animations = quicksortHelper(
    values,
    0,
    values.length - 1,
    [],
    new SortingPrevAnimationType("none")
  );
  return animations;
};
