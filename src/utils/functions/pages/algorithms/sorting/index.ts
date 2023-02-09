import {
  barBlockBottomOffset,
  barIconSize,
  BAR_BLOCK_WRAPPER,
  sortingAnimationSpeed,
  spaceBetweenBars,
} from "@utils/constants";
import { store } from "@utils/slices";
import {
  InnerValue,
  SortableBar,
  SortingAnimation,
  SortingAnimationType,
} from "@utils/types";

// Test Bar
export const initTestBars = (values: number[]): SortableBar[] => {
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
  bars[smallerBarIndex].relativeIndex -= idxDiff;
  bars[largerBarIndex].relativeIndex += idxDiff;

  const temp = indexes[smallerIdx];
  indexes[smallerIdx] = indexes[largerIdx];
  indexes[largerIdx] = temp;
};

export const animateTestBars = (
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

// Bar
export const initBars = (
  values: number[],
  barWidth: number,
  heightUnit: number,
  startOffset = 0,
  withNegativeOffset = true
): InnerValue[] => {
  const n = values.length;
  const mostLeft = (barWidth + spaceBetweenBars) * (-n / 2);

  return values.map((v, i) => {
    const left =
      (withNegativeOffset ? mostLeft : 0) +
      (barWidth + spaceBetweenBars) * i +
      startOffset;

    return {
      value: v,
      status: "normal",
      size: heightUnit * v,
      left,
    };
  });
};

export const getBarSizeFromAmount = (numBars: number) => {
  const wrapperElement = document.getElementById(BAR_BLOCK_WRAPPER);
  let barWidth = 0;
  let heightUnit = 0;

  if (wrapperElement) {
    const parentWidth = wrapperElement.clientWidth;
    const parentHeight = wrapperElement.clientHeight;
    barWidth = Math.floor((parentWidth - numBars * spaceBetweenBars) / numBars);
    const barBlockContainerHeight =
      parentHeight - barBlockBottomOffset - barIconSize;

    heightUnit = Math.floor(barBlockContainerHeight / numBars);
  }

  return { heightUnit, barWidth };
};

export const swapInnerValues = (
  barInfo: InnerValue[],
  barIds: number[],
  i: number,
  j: number,
  barWidth: number,
  startOffset = 0,
  withNegativeOffset = true
): [InnerValue[], number[]] => {
  const n = barInfo.length;
  const mostLeft = (barWidth + spaceBetweenBars) * (-n / 2);
  barInfo[barIds[i]].left =
    (withNegativeOffset ? mostLeft : 0) +
    (barWidth + spaceBetweenBars) * j +
    startOffset;
  barInfo[barIds[j]].left =
    (withNegativeOffset ? mostLeft : 0) +
    (barWidth + spaceBetweenBars) * i +
    startOffset;

  const temp = barIds[i];
  barIds[i] = barIds[j];
  barIds[j] = temp;
  return [barInfo, barIds];
};

export const animateBars = (
  barInfo: InnerValue[],
  barIds: number[],
  barWidth: number,
  animation: SortingAnimation,
  startOffset = 0,
  withNegativeOffset = true
): [InnerValue[], number[]] => {
  const { type, positionOne, positionTwo, positions } = animation;
  let newBarInfo = barInfo.map((info) => ({ ...info }));
  let newBarIds = [...barIds];

  switch (type) {
    case "focus":
    case "done":
      newBarInfo[barIds[positionOne!]].status = type;
      break;

    case "swap":
    case "compare":
      newBarInfo[barIds[positionOne!]].status = type;
      newBarInfo[barIds[positionTwo!]].status = type;
      if (type === "swap") {
        const [swappedBarInfo, swappedBarIds] = swapInnerValues(
          newBarInfo,
          newBarIds,
          positionOne!,
          positionTwo!,
          barWidth,
          startOffset,
          withNegativeOffset
        );
        newBarInfo = swappedBarInfo;
        newBarIds = swappedBarIds;
      }
      break;

    case "move":
      const [movedBarInfo, movedBarIds] = swapInnerValues(
        newBarInfo,
        newBarIds,
        positionOne!,
        positionTwo!,
        barWidth,
        startOffset,
        withNegativeOffset
      );
      newBarInfo = movedBarInfo;
      newBarIds = movedBarIds;
      break;

    case "range":
      for (let i = positionOne!; i < positionTwo! + 1; i++) {
        newBarInfo[barIds[i]].status = type;
      }
      break;

    case "clear":
      positions?.forEach((i) => {
        newBarInfo[barIds[i]].status = "normal";
      });
      break;

    case "reset":
      for (let i = 0; i < newBarInfo.length; i++) {
        newBarInfo[i].status = "normal";
      }
      break;

    default:
      break;
  }

  return [newBarInfo, newBarIds];
};

export const getSortingAnimation = (
  type: SortingAnimationType,
  positions: number[],
  duration?: number
) => {
  const { algorithmSpeed } = store.getState().sortingController;
  const result: SortingAnimation = {
    type,
    duration: duration === undefined ? sortingAnimationSpeed[type] : duration,
  };

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

  return result;
};
