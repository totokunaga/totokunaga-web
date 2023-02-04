import { Pathfinding, PathfindingFunction } from "@utils/types";
import { aStar } from "./a-star";
import { bfs } from "./bfs";
import { bidirectional } from "./bidirectional";
import { dfs } from "./dfs";

export const pathfindingAlgorithms: Record<Pathfinding, PathfindingFunction> = {
  BFS: bfs,
  DFS: dfs,
  "A*": aStar,
  Bidirectional: bidirectional,
};

export * from "./bfs";
export * from "./dfs";
export * from "./a-star";
export * from "./bidirectional";
