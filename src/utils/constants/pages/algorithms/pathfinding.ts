import { DropdownItem } from "@components/common/DropdownList";
import { Pathfinding, PathfindingAnimationType } from "@utils/types";

export const pathfindingText = {
  startButton: "Start",
  clearButton: "Clear Grid",
  dropdownListAlgorithm: "Algorithm",
  dropdownListSpeed: "Speed",
};

// html tag `id`s
export const pathfindingConfigId = "pathfinding-config";
export const pathfindingPageId = "pathfinding-page";

export const ROWS = [0, -1, 0, 1];
export const COLS = [1, 0, -1, 0];
// export const ROWS = [-1, -1, -1, 0, 0, 1, 1, 1];
// export const COLS = [-1, 0, 1, -1, 1, -1, 0, 1];

export const CELL_SIZE = 26;

export const pathfindingNames: Record<Pathfinding, string> = {
  BFS: "BFS",
  DFS: "DFS",
  "A*": "A*",
  Bidirectional: "Bidirectional",
  "Random Walk": "Random Walk",
};

export const algorithmOptions: DropdownItem<string>[] = [
  { name: "BFS", value: pathfindingNames.BFS },
  { name: "DFS", value: pathfindingNames.DFS },
  { name: "A*", value: pathfindingNames["A*"] },
  { name: "Bidirectional", value: pathfindingNames.Bidirectional },
];

export const pathfindingAnimationSpeed: Record<
  PathfindingAnimationType,
  number
> = {
  visit: 6,
  push: 150,
  trace: 30,
};
