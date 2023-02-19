import { nonswapSortingTransitionSpeed } from "@utils/constants";
import { setSortingAlgorithmExecuted, store } from "@utils/slices";
import {
  SortableBar,
  SortingAnimation,
  SortingAnimationType,
} from "@utils/types";
import { SetStateAction } from "react";

const mergesortHelper = (
  values: number[],
  start: number,
  end: number,
  animations: SortingAnimation[],
  movements: Array<{
    value: number;
    dest: number;
    type: SortingAnimationType;
  }>
): [number[], SortingAnimation[]] => {
  if (start >= end) {
    return [values, animations];
  }

  const middle = Math.floor((start + end) / 2);

  mergesortHelper(values, start, middle, animations, movements);
  mergesortHelper(values, middle + 1, end, animations, movements);
  const original = [...values];

  let i = start;
  let l = start;
  let r = middle + 1;
  while (l < middle + 1 && r < end + 1) {
    if (original[l] < original[r]) {
      movements.push({ value: original[l], dest: i, type: "move" });
      values[i] = original[l++];
    } else {
      movements.push({ value: original[r], dest: i, type: "move" });
      values[i] = original[r++];
    }
    i++;
  }

  while (l < middle + 1) {
    movements.push({ value: original[l], dest: i, type: "move" });
    values[i++] = original[l++];
  }

  while (r < end + 1) {
    movements.push({ value: original[r], dest: i, type: "move" });
    values[i++] = original[r++];
  }
  movements.push({
    value: values[start],
    dest: values[end],
    type: "clear",
  });

  return [values, animations];
};

export const mergesort = (
  values: number[],
  bars: SortableBar[],
  indexes: number[],
  setBars: (value: SetStateAction<SortableBar[]>) => void,
  setIndexes: (value: SetStateAction<number[]>) => void
) => {
  const movements: Array<{
    value: number;
    dest: number;
    type: SortingAnimationType;
  }> = [];
  mergesortHelper(values, 0, values.length - 1, [], movements);
  values.forEach((v) => movements.push({ value: v, dest: v, type: "done" }));

  const { dispatch } = store;
  const { algorithmSpeed } = store.getState().sortingController;
  const animations: SortingAnimation[] = [];

  let timeoutAmount = 0;
  let newBars = [...bars];
  movements.forEach(({ value, dest, type }, i) => {
    timeoutAmount +=
      i === 0
        ? 0
        : (nonswapSortingTransitionSpeed[movements[i - 1].type] * 1000) /
          algorithmSpeed;
    const barIdx = bars.findIndex((bar) => bar.value === value);
    setTimeout(() => {
      if (type === "clear") {
        newBars.forEach((_, i) => (newBars[i].status = "clear"));
      } else if (type === "done") {
        newBars[barIdx].status = "done";
      } else {
        newBars[barIdx].relativeIndex = dest - barIdx;
        newBars[barIdx].status = "swap";
      }
      setBars([...newBars]);

      if (i === movements.length - 1) {
        const newIndexes = [...indexes];
        newBars.forEach(({ relativeIndex }, j) => {
          newIndexes[j + relativeIndex] = j;
        });
        setIndexes([...newIndexes]);

        setTimeout(() => {
          dispatch(setSortingAlgorithmExecuted(false));
        }, 150);
      }
    }, timeoutAmount);
  });

  return animations;
};
