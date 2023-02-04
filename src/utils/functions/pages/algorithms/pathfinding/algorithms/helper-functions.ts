import Coordinate from "@utils/classes/Coordinate";
import { EMPTY_0 } from "@utils/types";

export const isValidCell = (
  grid: number[][],
  visited: (Coordinate | null)[][],
  coordinate: Coordinate
) => {
  const { row, col } = coordinate;

  return (
    coordinate.isInbound() && !visited[row][col] && grid[row][col] === EMPTY_0
  );
};
