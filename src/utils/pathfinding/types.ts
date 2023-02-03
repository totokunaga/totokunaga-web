import Coordinate from "@utils/classes/Coordinate";
import { CellType } from "@utils/types";

export type CellInfo = [Coordinate, Coordinate | null];

export type Pathfinding = "BFS" | "DFS" | "A*" | "Bidirectional";
export type PathfindingArg = {
  grid: number[][];
  start: Coordinate;
  end: Coordinate;
};
export type PathfindingFunction = (
  arg: PathfindingArg
) => [CellInfo[], (Coordinate | null)[][]];
