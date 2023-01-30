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
  "2.0": 1,
  "1.5": 2,
  "1.25": 2.4,
  Normal: 3,
  "0.75": 4,
  "0.5": 6,
  "0.1": 30,
};
export const speedOptions: DropdownItem<Speed>[] = [
  { name: "2.0", value: "2.0" },
  { name: "1.5", value: "1.5" },
  { name: "1.25", value: "1.25" },
  { name: "Normal", value: "Normal" },
  { name: "0.75", value: "0.75" },
  { name: "0.5", value: "0.5" },
  { name: "0.1", value: "0.1" },
];
