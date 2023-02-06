import { SortingAnimation } from "@utils/types";
import { swap } from ".";

export const selectionSort = (
  values: number[]
): [number[], SortingAnimation[]] => {
  const n = values.length;
  const animations: SortingAnimation[] = [];

  for (let i = 0; i < n; i++) {
    let smallestIdx = i;
    for (let j = i; j < n; j++) {
      if (values[smallestIdx] > values[j]) {
        smallestIdx = j;
      }
    }

    if (smallestIdx !== i) {
      swap(values, i, smallestIdx);
      animations.push({
        type: "swap",
        positionOne: i,
        positionTwo: smallestIdx,
        duration: 500,
      });
      animations.push({
        type: "clear",
        positions: [smallestIdx],
        duration: 400,
      });
    }
    animations.push({
      type: "done",
      positionOne: i,
      duration: 200,
    });
  }

  return [values, animations];
};
