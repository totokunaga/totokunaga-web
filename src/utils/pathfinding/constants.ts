import { DropdownItem } from "@components/common/DropdownList";
import { aStar, bfs, bidirectional, dfs } from "./algorithms";
import { Pathfinding, PathfindingFunction, Speed } from "./types";

export const ROWS = [0, -1, 0, 1];
export const COLS = [1, 0, -1, 0];
// export const ROWS = [-1, -1, -1, 0, 0, 1, 1, 1];
// export const COLS = [-1, 0, 1, -1, 1, -1, 0, 1];

export const MARK_DELAY = 2;
export const PATH_FOUND_DELAY = 16;
export const CELL_SIZE = 26;

export const pathfindingAlgorithms: Record<Pathfinding, PathfindingFunction> = {
  BFS: bfs,
  DFS: dfs,
  "A*": aStar,
  Bidirectional: bidirectional,
};

export const pathfindingNames: Record<Pathfinding, string> = {
  BFS: "BFS",
  DFS: "DFS",
  "A*": "A*",
  Bidirectional: "Bidirectional",
};

export const algorithmOptions: DropdownItem<string>[] = [
  { name: "BFS", value: pathfindingNames.BFS },
  { name: "DFS", value: pathfindingNames.DFS },
  { name: "A*", value: pathfindingNames["A*"] },
  { name: "Bidirectional", value: pathfindingNames.Bidirectional },
];

export const speedAmounts: Record<Speed, number> = {
  "Super Fast": 0.05,
  Fast: 1,
  Normal: 2.5,
  Slow: 10,
  "Super Slow": 20,
};
export const speedOptions: DropdownItem<Speed>[] = [
  { name: "Super Fast", value: "Super Fast" },
  { name: "Fast", value: "Fast" },
  { name: "Normal", value: "Normal" },
  { name: "Slow", value: "Slow" },
  { name: "Super Slow", value: "Super Slow" },
];
