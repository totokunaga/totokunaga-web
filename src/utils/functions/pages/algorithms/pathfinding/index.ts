import Coordinate from "@utils/classes/Coordinate";
import { pathfindingAnimationSpeed } from "@utils/constants";
import { store } from "@utils/slices";
import {
  PathfindingAnimation,
  PathfindingAnimationType,
  PATH_3,
  PUSHED_5,
  VISITED_1,
} from "@utils/types";

export * from "./algorithms";

export const getPathfindingAnimation = (
  type: PathfindingAnimationType,
  positions: Coordinate[],
  duration?: number
) => {
  const { algorithmSpeed } = store.getState().pathfindingController;
  const result: PathfindingAnimation = {
    type,
    positions,
    duration:
      duration === undefined ? pathfindingAnimationSpeed[type] : duration,
  };
  result.duration /= algorithmSpeed;

  return result;
};

export const animateCell = (
  grid: number[][],
  animation: PathfindingAnimation
) => {
  const { type, positions } = animation;
  const newGrid = [...grid];

  switch (type) {
    case "push":
      positions?.forEach(({ row, col }) => {
        newGrid[row][col] = PUSHED_5;
      });
      break;

    case "visit":
      positions?.forEach(({ row, col }) => {
        newGrid[row][col] = VISITED_1;
      });
      break;

    case "trace":
      positions?.forEach(({ row, col }) => {
        newGrid[row][col] = PATH_3;
      });
      break;

    default:
      break;
  }

  return newGrid;
};
