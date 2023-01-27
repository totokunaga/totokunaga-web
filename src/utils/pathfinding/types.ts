import Coordinate from "@utils/classes/Coordinate";

export type CellInfo = [Coordinate, Coordinate | null];

export type Pathfinding = "BFS" | "DFS" | "A*";
export type PathfindingFunction = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
) => CellInfo[];
