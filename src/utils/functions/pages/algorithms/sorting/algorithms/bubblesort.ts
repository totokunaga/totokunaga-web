import { SortingAnimation, SortingAnimationType } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const bubblesort = (values: number[]) => {
  const n = values.length;
  const animations: SortingAnimation[] = [];
  let prevAnimation: SortingAnimationType = "none";

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    animations.push(
      getSortingAnimation("range", [0, n - i - 1], undefined, prevAnimation)
    );
    prevAnimation = "swap";

    for (let j = 1; j < n - i; j++) {
      animations.push(
        getSortingAnimation("compare", [j], undefined, prevAnimation)
      );
      prevAnimation = "compare";
      if (values[j - 1] > values[j]) {
        animations.push(
          getSortingAnimation("focus", [j - 1], undefined, prevAnimation)
        );
        prevAnimation = "focus";
        animations.push(
          getSortingAnimation("swap", [j - 1, j], undefined, prevAnimation)
        );
        prevAnimation = "swap";
        animations.push(
          getSortingAnimation("range", [j - 1, j], undefined, prevAnimation)
        );
        prevAnimation = "range";

        swap(values, j, j - 1);
        swapped = true;
        continue;
      }
      animations.push(
        getSortingAnimation("range", [j], undefined, prevAnimation)
      );
      prevAnimation = "range";
    }
    animations.push(
      getSortingAnimation("done", [n - i - 1], undefined, prevAnimation)
    );
    prevAnimation = "done";

    if (!swapped) {
      for (let j = n - i - 2; j > 0; j--) {
        animations.push(
          getSortingAnimation("done", [j], undefined, prevAnimation)
        );
        prevAnimation = "done";
      }
      break;
    }
  }
  animations.push(getSortingAnimation("done", [0], undefined, prevAnimation));
  prevAnimation = "done";
  return animations;
};
