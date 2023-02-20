import { sortingTransitionSpeed } from "@utils/constants";
import { setSortingAlgorithmExecuted, store } from "@utils/slices";
import {
  SortableBar,
  SortingAlgorithm,
  SortingAnimation,
  SortingAnimationType,
  SortingPrevAnimationType,
} from "@utils/types";
import { SetStateAction } from "react";
import { sortingAlgorithms } from "./algorithms";

export const initBars = (values: number[]): SortableBar[] => {
  return values.map((v) => ({
    value: v,
    status: "default",
    relativeIndex: 0,
  }));
};

export const swapBars = (
  bars: SortableBar[],
  indexes: number[],
  smallerIdx: number,
  largerIdx: number
) => {
  const idxDiff = largerIdx - smallerIdx;
  const smallerBarIndex = indexes[smallerIdx];
  const largerBarIndex = indexes[largerIdx];
  bars[smallerBarIndex].relativeIndex += idxDiff;
  bars[largerBarIndex].relativeIndex -= idxDiff;

  const temp = indexes[smallerIdx];
  indexes[smallerIdx] = indexes[largerIdx];
  indexes[largerIdx] = temp;
};

export const animateBars = (
  bars: SortableBar[],
  indexes: number[],
  animation: SortingAnimation
) => {
  const { type, positionOne, positionTwo, positions } = animation;
  switch (type) {
    case "focus":
    case "done":
      bars[indexes[positionOne!]].status = type;
      break;

    case "swap":
      bars[indexes[positionOne!]].status = type;
      bars[indexes[positionTwo!]].status = type;
      if (type === "swap") {
        swapBars(bars, indexes, positionOne!, positionTwo!);
      }
      break;

    case "move":
      swapBars(bars, indexes, positionOne!, positionTwo!);
      break;

    case "clear":
      positions?.forEach((i) => {
        bars[indexes[i]].status = "normal";
      });
      break;

    case "reset":
      for (let i = 0; i < bars.length; i++) {
        bars[i].status = "normal";
      }
      break;

    default:
      break;
  }
};

export const getSortingAnimation = (
  type: SortingAnimationType,
  positions: number[],
  prevAnimation: SortingPrevAnimationType,
  duration?: number
) => {
  const { algorithmSpeed } = store.getState().sortingController;
  const result: SortingAnimation = {
    type,
    duration: duration || 0,
  };

  if (duration === undefined && prevAnimation) {
    result.duration = sortingTransitionSpeed[prevAnimation.type] * 1000;
  }
  result.duration /= algorithmSpeed;

  switch (type) {
    case "focus":
    case "done":
      result.positionOne = positions[0];
      break;
    case "swap":
    case "move":
      result.positionOne = positions[0];
      result.positionTwo = positions.length > 1 ? positions[1] : positions[0];
      break;
    case "clear":
      result.positions = positions;
      break;
    default:
      break;
  }

  prevAnimation.type = type;
  return result;
};

export const visualizeSorting = (
  algorithm: SortingAlgorithm,
  bars: SortableBar[],
  indexes: number[],
  values: number[],
  setBars: (value: SetStateAction<SortableBar[]>) => void,
  setIndexes: (value: SetStateAction<number[]>) => void
) => {
  const { dispatch } = store;
  const sortingAnimations = sortingAlgorithms[algorithm](
    values,
    bars,
    indexes,
    setBars,
    setIndexes
  );

  let timeoutAmount = 0;
  let newBars = [...bars];
  let newIndexes = [...indexes];
  sortingAnimations.forEach((animation, i) => {
    timeoutAmount += animation.duration;
    setTimeout(() => {
      animateBars(newBars, newIndexes, animation);
      setBars([...newBars]);
      setIndexes([...newIndexes]);

      if (i === sortingAnimations.length - 1) {
        dispatch(setSortingAlgorithmExecuted(false));
      }
    }, timeoutAmount);
  });
};
