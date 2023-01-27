export type Coordinate = [number, number];
export type CellInfo = [number, number, Coordinate | null];

export type Pathfinding = "BFS" | "DFS" | "AStar";
export type PathfindingFunction = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
) => CellInfo[];
