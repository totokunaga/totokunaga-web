import Coordinate from "@utils/classes/Coordinate";

export type CellInfo = [Coordinate, Coordinate | null];

export type Pathfinding = "BFS" | "DFS" | "A*" | "Bidirectional";
export type PathfindingFunction = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
) => [CellInfo[], (Coordinate | null)[][]];

export type Speed = "Super Fast" | "Fast" | "Normal" | "Slow" | "Super Slow";
