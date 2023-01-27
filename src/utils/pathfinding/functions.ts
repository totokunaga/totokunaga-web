import { CELL_EMPTY } from "@components/algorithms";
import Coordinate from "@utils/classes/Coordinate";

export const isValidCell = (
  grid: number[][],
  visited: (Coordinate | null)[][],
  coordinate: Coordinate
) => {
  const { row, col } = coordinate;

  return (
    coordinate.isOutOfBounds() &&
    !visited[row][col] &&
    grid[row][col] === CELL_EMPTY
  );
};
