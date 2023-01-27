import { Dispatch, SetStateAction } from "react";
import { CellInfo } from "@utils/pathfinding/types";

export type GridProp = {
  rowSize: number;
  colSize: number;
  cellSize?: number;
  pathfindingAlgorithm: (
    grid: number[][],
    start: [number, number],
    end: [number, number]
  ) => CellInfo[];
  algorithmExecuted: boolean;
  setAlgorithmExecuted: Dispatch<SetStateAction<boolean>>;
  clearExecuted: boolean;
  setClearExecuted: Dispatch<SetStateAction<boolean>>;
};
