import { sortingTransitionSpeed } from "@utils/constants";
import { store } from "@utils/slices";
import {
  SortableBar,
  SortingAnimation,
  SortingAnimationType,
  SortingPrevAnimationType,
} from "@utils/types";

export const initBars = (values: number[]): SortableBar[] => {
  return values.map((v) => ({
    value: v,
    status: "normal",
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
    case "compare":
      bars[indexes[positionOne!]].status = type;
      bars[indexes[positionTwo!]].status = type;
      if (type === "swap") {
        swapBars(bars, indexes, positionOne!, positionTwo!);
      }
      break;

    case "move":
      swapBars(bars, indexes, positionOne!, positionTwo!);
      break;

    case "range":
      for (let i = positionOne!; i < positionTwo! + 1; i++) {
        bars[indexes[i]].status = type;
      }
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
  prevAnimation: SortingPrevAnimationType
) => {
  const { algorithmSpeed } = store.getState().sortingController;
  const result: SortingAnimation = {
    type,
    duration: 0,
  };

  if (prevAnimation) {
    result.duration = sortingTransitionSpeed[prevAnimation.type] * 1000;
  }
  result.duration /= algorithmSpeed;

  switch (type) {
    case "focus":
    case "done":
      result.positionOne = positions[0];
      break;
    case "range":
    case "swap":
    case "compare":
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
