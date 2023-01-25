import { CellInfo } from "@pages/algorithms/pathfinding/types";

export type GridProp = {
  originalRowSize: number;
  originalColSize: number;
  cellSize?: number;
  pathfindingAlgorithm: (
    grid: number[][],
    start: [number, number],
    end: [number, number]
  ) => CellInfo[];
  algorithmFired: boolean;
};
