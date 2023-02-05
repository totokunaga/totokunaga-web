import { InnerValue, SortingAnimation } from "@utils/types";

export const swapInnerValues = (
  barInfo: InnerValue[],
  barIds: number[],
  i: number,
  j: number,
  heightUnit: number,
  spaceAmount: number
): [InnerValue[], number[]] => {
  barInfo[barIds[i]].left = (heightUnit + spaceAmount) * j;
  barInfo[barIds[j]].left = (heightUnit + spaceAmount) * i;

  const temp = barIds[i];
  barIds[i] = barIds[j];
  barIds[j] = temp;
  return [barInfo, barIds];
};

const heightUnit = 45;
const spaceAmount = 8;

export const animateBars = (
  barInfo: InnerValue[],
  barIds: number[],
  animation: SortingAnimation
): [InnerValue[], number[]] => {
  const { type, positionOne, positionTwo } = animation;
  let newBarInfo = barInfo.map((info) => ({ ...info }));
  let newBarIds = [...barIds];

  switch (type) {
    case "focus":
      newBarInfo[barIds[positionOne]].status = type;
      break;
    case "swap":
    case "compare":
      newBarInfo[barIds[positionOne]].status = type;
      newBarInfo[barIds[positionTwo]].status = type;
      if (type === "swap") {
        const [swappedBarInfo, swappedBarIds] = swapInnerValues(
          newBarInfo,
          newBarIds,
          positionOne,
          positionTwo,
          heightUnit,
          spaceAmount
        );
        newBarInfo = swappedBarInfo;
        newBarIds = swappedBarIds;
      }
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
