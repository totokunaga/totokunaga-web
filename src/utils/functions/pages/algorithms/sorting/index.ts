import { sortingAnimationSpeed, spaceBetweenBars } from "@utils/constants";
import { store } from "@utils/slices";
import {
  InnerValue,
  SortingAnimation,
  SortingAnimationType,
} from "@utils/types";

export const initBars = (
  values: number[],
  barWidth: number,
  heightUnit: number
): InnerValue[] => {
  const n = values.length;
  const mostLeft = (barWidth + spaceBetweenBars) * (-n / 2);

  return values.map((v, i) => {
    const left = mostLeft + (barWidth + spaceBetweenBars) * i;

    return {
      value: v,
      status: "normal",
      size: heightUnit * v,
      left,
    };
  });
};

export const swapInnerValues = (
  barInfo: InnerValue[],
  barIds: number[],
  i: number,
  j: number,
  barWidth: number
): [InnerValue[], number[]] => {
  const n = barInfo.length;
  const mostLeft = (barWidth + spaceBetweenBars) * (-n / 2);
  barInfo[barIds[i]].left = mostLeft + (barWidth + spaceBetweenBars) * j;
  barInfo[barIds[j]].left = mostLeft + (barWidth + spaceBetweenBars) * i;

  const temp = barIds[i];
  barIds[i] = barIds[j];
  barIds[j] = temp;
  return [barInfo, barIds];
};

export const animateBars = (
  barInfo: InnerValue[],
  barIds: number[],
  barWidth: number,
  animation: SortingAnimation
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
          barWidth
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
        barWidth
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
