import { Pathfinding, PathfindingFunction } from "@utils/types";
import { aStar } from "./a-star";
import { bfs } from "./bfs";
import { bidirectional } from "./bidirectional";
import { dfs } from "./dfs";
import { randomWalk } from "./random-walk";

export const pathfindingAlgorithms: Record<Pathfinding, PathfindingFunction> = {
  BFS: bfs,
  DFS: dfs,
  "A*": aStar,
  Bidirectional: bidirectional,
  "Random Walk": randomWalk,
};

export * from "./bfs";
export * from "./dfs";
export * from "./a-star";
export * from "./bidirectional";
export * from "./random-walk";
