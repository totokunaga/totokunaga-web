import { useCallback, useEffect, useState } from "react";

import { CELL_SIZE, MARK_DELAY } from "@utils/pathfinding/constants";
import {
  Cell,
  CELL_BLOCKED,
  CELL_EMPTY,
  CELL_IN_PATH,
  CELL_MARKED,
} from "../Cell";
import { GridProp } from "./types";
import Coordinate from "@utils/classes/Coordinate";

const Grid: React.FC<GridProp> = (props) => {
  const {
    rowSize,
    colSize,
    cellSize = CELL_SIZE,
    pathfindingAlgorithm,
    algorithmExecuted,
    setAlgorithmExecuted,
    clearExecuted,
    setClearExecuted,
    unmarkExecuted,
    setUnmarkExecuted,
  } = props;

  const [grid, setGrid] = useState(
    Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => CELL_EMPTY)
    )
  );
  const [start, setStart] = useState(new Coordinate(0, 0, grid));
  const [end, setEnd] = useState(
    new Coordinate(rowSize - 1, colSize - 1, grid)
  );

  const onClickCell = useCallback(
    (coordinate: Coordinate) => {
      if (!algorithmExecuted) {
        const { row, col } = coordinate;
        const status = grid[row][col];
        grid[row][col] = Number(status !== 1);
        setGrid([...grid]);
      }
    },
    [grid, algorithmExecuted]
  );

  const onMarked = useCallback(
    (coordinate: Coordinate) => {
      const { row, col } = coordinate;
      grid[row][col] = CELL_MARKED;
      setGrid([...grid]);
    },
    [grid]
  );

  const onPassed = useCallback(
    (coordinate: Coordinate) => {
      const { row, col } = coordinate;
      grid[row][col] = CELL_IN_PATH;
      setGrid([...grid]);
    },
    [grid]
  );

  // When "Start" button is hit
  useEffect(() => {
    if (algorithmExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          grid[i][j] = grid[i][j] === CELL_BLOCKED ? CELL_BLOCKED : CELL_EMPTY;
        })
      );
      setGrid([...grid]);

      const [visitedCells, prevs] = pathfindingAlgorithm(grid, start, end);
      visitedCells.forEach(([coordinate], i) => {
        setTimeout(() => {
          onMarked(coordinate);
        }, i * MARK_DELAY);
      });

      // if (!prevs[end.row][end.col]) {
      //   setAlgorithmExecuted(false);
      // } else {
      //   const cellsInPath: Coordinate[] = [];
      //   let currentCell = end;
      //   while (!currentCell.isEqual(start)) {
      //     cellsInPath.push(currentCell);
      //     const nextCell = prevs[currentCell.row][currentCell.col];
      //     if (nextCell) {
      //       currentCell = nextCell;
      //     }
      //   }
      //   cellsInPath.push(start);

      //   const pathSize = cellsInPath.length;
      //   cellsInPath.forEach((coordinate, i) => {
      //     setTimeout(() => {
      //       onPassed(coordinate);
      //       if (i === pathSize - 1) {
      //         setAlgorithmExecuted(false);
      //       }
      //     }, (visitedCells.length + (pathSize - i - 1)) * MARK_DELAY);
      //   });
      // }
    }
  }, [
    pathfindingAlgorithm,
    algorithmExecuted,
    setAlgorithmExecuted,
    start,
    end,
  ]);

  // When "Clear" button is hit
  useEffect(() => {
    if (clearExecuted) {
      grid.forEach((r, i) => r.forEach((c, j) => (grid[i][j] = CELL_EMPTY)));
      setGrid([...grid]);
      setClearExecuted(false);
    }
  }, [clearExecuted, setClearExecuted]);

  // When non-blocked cell clear
  useEffect(() => {
    if (unmarkExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          if (grid[i][j] !== CELL_BLOCKED) {
            grid[i][j] = CELL_EMPTY;
          }
        })
      );
      setGrid([...grid]);
      setUnmarkExecuted(false);
    }
  }, [unmarkExecuted, setUnmarkExecuted]);

  // When a client window size is changed
  useEffect(() => {
    const resizedGrid = Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => CELL_EMPTY)
    );

    const resizedRow = resizedGrid.length;
    const resizedCol = resizedRow ? resizedGrid[0].length : 0;
    const middleRow = Math.floor(resizedRow / 2);
    const middleCol = Math.floor(resizedCol / 2);
    setStart(new Coordinate(middleRow, Math.floor(resizedCol / 4), grid));
    setEnd(new Coordinate(middleRow, Math.floor((3 * resizedCol) / 4), grid));

    const oneThirdRow = Math.floor(resizedRow / 3);
    if (middleCol) {
      for (let r = oneThirdRow; r < (oneThirdRow + 1) * 2; r++) {
        if (resizedGrid.length > 0) {
          resizedGrid[r][middleCol] = CELL_BLOCKED;
        }
      }
    }
    setGrid(resizedGrid);
  }, [rowSize, colSize]);

  return (
    <div>
      {grid.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((type, c) => {
            const coordinate = new Coordinate(r, c, grid);
            return (
              <Cell
                key={c}
                size={cellSize}
                status={type}
                isStart={start.isEqual(coordinate)}
                isEnd={end.isEqual(coordinate)}
                coordinate={coordinate}
                onClick={onClickCell}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
