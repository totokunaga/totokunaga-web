import { DropdownItem } from "@components/common/DropdownList";
import { bfs, dfs } from "./algorithms";
import { Pathfinding, PathfindingFunction } from "./types";

export const ROWS = [0, -1, 0, 1];
export const COLS = [1, 0, -1, 0];
// export const ROWS = [-1, -1, -1, 0, 0, 1, 1, 1];
// export const COLS = [-1, 0, 1, -1, 1, -1, 0, 1];

export const MARK_DELAY = 3;

export const pathfindingAlgorithms: Record<Pathfinding, PathfindingFunction> = {
  BFS: bfs,
  DFS: dfs,
  AStar: bfs,
};

export const pathfindingNames: Record<Pathfinding, string> = {
  BFS: "BFS",
  DFS: "DFS",
  AStar: "A*",
};

export const algorithmOptions: DropdownItem<string>[] = [
  { name: "BFS", value: pathfindingNames.BFS },
  { name: "DFS", value: pathfindingNames.DFS },
  { name: "AStar", value: pathfindingNames.AStar },
];
