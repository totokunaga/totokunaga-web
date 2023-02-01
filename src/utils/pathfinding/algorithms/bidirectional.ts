import { CELL_BLOCKED } from "@components/algorithms";
import Coordinate from "@utils/classes/Coordinate";
import { initMatrix } from "@utils/functions";
import { COLS, ROWS } from "../constants";
import { CellInfo } from "../types";

export const bidirectional = (
  grid: number[][],
  start: Coordinate,
  end: Coordinate
): [CellInfo[], (Coordinate | null)[][]] => {
  let qStart: CellInfo[] = [[start, null]];
  let qEnd: CellInfo[] = [[end, null]];
  let middleFromStart = start;
  let middleFromEnd = end;

  const rowSize = grid.length;
  const colSize = grid[0].length;
  const prevs: (Coordinate | null)[][] = initMatrix(rowSize, colSize, null);
  const types = initMatrix(rowSize, colSize, 0);
  const visitedCells: CellInfo[] = [];

  prevs[start.row][start.col] = start;
  prevs[end.row][end.col] = end;
  types[start.row][start.col] = 1;
  types[end.row][end.col] = -1;

  let pathFound = false;
  while (!pathFound && (qStart.length > 0 || qEnd.length > 0)) {
    let nextStart: CellInfo[] = [];
    let nextEnd: CellInfo[] = [];

    while (!pathFound && qStart.length > 0 && qEnd.length > 0) {
      const [currentStart, prevStart] = qStart.pop() as CellInfo;
      const [currentEnd, prevEnd] = qEnd.pop() as CellInfo;

      const { row: rowStart, col: colStart } = currentStart;
      const { row: rowEnd, col: colEnd } = currentEnd;
      visitedCells.push([currentStart, prevStart]);
      visitedCells.push([currentEnd, prevEnd]);

      for (let i = 0; i < ROWS.length; i++) {
        const nextRowStart = rowStart + ROWS[i];
        const nextColStart = colStart + COLS[i];
        const nextRowEnd = rowEnd + ROWS[i];
        const nextColEnd = colEnd + COLS[i];
        const nextCoordinateStart = new Coordinate(
          nextRowStart,
          nextColStart,
          grid
        );
        const nextCoordinateEnd = new Coordinate(nextRowEnd, nextColEnd, grid);

        if (
          nextCoordinateStart.isInbound() &&
          grid[nextRowStart][nextColStart] !== CELL_BLOCKED
        ) {
          const type = types[nextRowStart][nextColStart];
          if (type === -1) {
            pathFound = true;
            middleFromStart = currentStart;
            middleFromEnd = nextCoordinateStart;
            break;
          } else if (type === 0) {
            prevs[nextRowStart][nextColStart] = currentStart;
            types[nextRowStart][nextColStart] = 1;
            nextStart.push([nextCoordinateStart, currentStart]);
          }
        }

        if (
          nextCoordinateEnd.isInbound() &&
          grid[nextRowEnd][nextColEnd] !== CELL_BLOCKED
        ) {
          const type = types[nextRowEnd][nextColEnd];
          if (type === 1) {
            pathFound = true;
            middleFromStart = nextCoordinateEnd;
            middleFromEnd = currentEnd;
            break;
          } else if (type === 0) {
            prevs[nextRowEnd][nextColEnd] = currentEnd;
            types[nextRowEnd][nextColEnd] = -1;
            nextEnd.push([nextCoordinateEnd, currentEnd]);
          }
        }
      }
    }

    while (!pathFound && qStart.length > 0) {
      const q = qStart;
      const [current, prev] = q.pop() as CellInfo;
      const { row, col } = current;
      visitedCells.push([current, prev]);

      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = row + ROWS[i];
        const nextCol = col + COLS[i];
        const nextCoordinate = new Coordinate(nextRow, nextCol, grid);
        if (
          nextCoordinate.isInbound() &&
          grid[nextRow][nextCol] !== CELL_BLOCKED
        ) {
          const type = types[nextRow][nextCol];
          if (type === -1) {
            pathFound = true;
            middleFromStart = current;
            middleFromEnd = nextCoordinate;
            break;
          } else if (type === 0) {
            prevs[nextRow][nextCol] = current;
            types[nextRow][nextCol] = 1;
            nextStart.push([nextCoordinate, current]);
          }
        }
      }
    }

    while (!pathFound && qEnd.length > 0) {
      const q = qEnd;
      const [current, prev] = q.pop() as CellInfo;
      const { row, col } = current;
      visitedCells.push([current, prev]);

      for (let i = 0; i < ROWS.length; i++) {
        const nextRow = row + ROWS[i];
        const nextCol = col + COLS[i];
        const nextCoordinate = new Coordinate(nextRow, nextCol, grid);
        if (
          nextCoordinate.isInbound() &&
          grid[nextRow][nextCol] !== CELL_BLOCKED
        ) {
          const type = types[nextRow][nextCol];
          if (type === 1) {
            pathFound = true;
            middleFromStart = nextCoordinate;
            middleFromEnd = current;
            break;
          } else if (type === 0) {
            prevs[nextRow][nextCol] = current;
            types[nextRow][nextCol] = -1;
            nextEnd.push([nextCoordinate, current]);
          }
        }
      }
    }

    qStart = nextStart;
    qEnd = nextEnd;
  }

  // Handle remained coordinates in queues
  while (qStart.length > 0 && qEnd.length > 0) {
    const [currentStart, prevStart] = qStart.pop() as CellInfo;
    const { row: rowStart, col: colStart } = currentStart;
    visitedCells.push([currentStart, prevStart]);
    prevs[rowStart][colStart] = prevStart;

    const [currentEnd, prevEnd] = qEnd.pop() as CellInfo;
    const { row: rowEnd, col: colEnd } = currentEnd;
    visitedCells.push([currentEnd, prevEnd]);
    prevs[rowEnd][colEnd] = prevEnd;
  }

  while (qStart.length > 0) {
    const [current, prev] = qStart.pop() as CellInfo;
    const { row, col } = current;
    visitedCells.push([current, prev]);
    prevs[row][col] = prev;
  }

  while (qEnd.length > 0) {
    const [current, prev] = qEnd.pop() as CellInfo;
    const { row, col } = current;
    visitedCells.push([current, prev]);
    prevs[row][col] = prev;
  }

  let prev = middleFromStart;
  let current = middleFromEnd;
  while (!current.isEqual(end)) {
    const originalEndPrev = prevs[current.row][current.col];
    prevs[current.row][current.col] = prev;
    prev = current;
    current = originalEndPrev!;
  }
  prevs[current.row][current.col] = prev;

  return [visitedCells, prevs];
};
