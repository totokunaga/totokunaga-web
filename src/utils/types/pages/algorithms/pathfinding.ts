import Coordinate from "@utils/classes/Coordinate";

export type ClearableCellType = "Blocked" | "Visited" | "Path";
export type CellType = "Selected" | "Empty" | ClearableCellType;
export const EMPTY: CellType = "Empty";
export const VISITED: ClearableCellType = "Visited";
export const BLOCKED: ClearableCellType = "Blocked";
export const PATH: ClearableCellType = "Path";
export const SELECTED: CellType = "Selected";

export const EMPTY_0 = 0;
export const VISITED_1 = 1;
export const BLOCKED_2 = 2;
export const PATH_3 = 3;
export const SELECTED_4 = 4;

export const cellMap: Record<number, CellType> = {
  [EMPTY_0]: EMPTY,
  [VISITED_1]: VISITED,
  [BLOCKED_2]: BLOCKED,
  [PATH_3]: PATH,
  [SELECTED_4]: SELECTED,
};

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
