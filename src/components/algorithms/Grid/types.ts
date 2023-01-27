import { Dispatch, SetStateAction } from "react";
import { CellInfo } from "@utils/pathfinding/types";
import Coordinate from "@utils/classes/Coordinate";

export type GridProp = {
  rowSize: number;
  colSize: number;
  cellSize?: number;
  pathfindingAlgorithm: (
    grid: number[][],
    start: Coordinate,
    end: Coordinate
  ) => [CellInfo[], (Coordinate | null)[][]];
  algorithmExecuted: boolean;
  setAlgorithmExecuted: Dispatch<SetStateAction<boolean>>;
  clearExecuted: boolean;
  setClearExecuted: Dispatch<SetStateAction<boolean>>;
  unmarkExecuted: boolean;
  setUnmarkExecuted: Dispatch<SetStateAction<boolean>>;
};
