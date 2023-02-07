import { SortingAnimation } from "@utils/types";
import { swap } from ".";
import { getSortingAnimation } from "..";

export const bubblesort = (values: number[]) => {
  const n = values.length;
  const animations: SortingAnimation[] = [];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    animations.push(getSortingAnimation("range", [0, n - i - 1]));

    for (let j = 1; j < n - i; j++) {
      animations.push(getSortingAnimation("compare", [j]));
      if (values[j - 1] > values[j]) {
        animations.push(getSortingAnimation("focus", [j - 1]));
        animations.push(getSortingAnimation("swap", [j - 1, j]));
        animations.push(getSortingAnimation("range", [j - 1, j]));

        swap(values, j, j - 1);
        swapped = true;
        continue;
      }
      animations.push(getSortingAnimation("range", [j]));
    }
    animations.push(getSortingAnimation("done", [n - i - 1]));

    if (!swapped) {
      for (let j = n - i - 2; j > 0; j--) {
        animations.push(getSortingAnimation("done", [j]));
      }
      break;
    }
  }
  animations.push(getSortingAnimation("done", [0]));
  return animations;
};
