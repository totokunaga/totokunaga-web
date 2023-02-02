import { useCallback, useEffect, useState } from "react";

import {
  CELL_SIZE,
  pathfindingAlgorithms,
  PATH_FOUND_DELAY,
  MARK_DELAY,
} from "@utils/pathfinding/constants";
import {
  Cell,
  CELL_BLOCKED,
  CELL_EMPTY,
  CELL_IN_PATH,
  CELL_MARKED,
  CELL_SELECTED,
} from "../Cell";
import { GridProp } from "./types";
import Coordinate from "@utils/classes/Coordinate";
import { initMatrix } from "@utils/functions";
import { useSelector } from "react-redux";
import { selectPathfindingController, setClearExecuted } from "@utils/slices";
import { useDispatch } from "react-redux";

const Grid: React.FC<GridProp> = (props) => {
  const {
    rowSize,
    colSize,
    cellSize = CELL_SIZE,
    algorithmExecuted,
    setAlgorithmExecuted,
    unmarkExecuted,
    setUnmarkExecuted,
  } = props;

  const [grid, setGrid] = useState(initMatrix(rowSize, colSize, CELL_EMPTY));
  const [start, setStart] = useState(new Coordinate(0, 0, grid));
  const [end, setEnd] = useState(
    new Coordinate(rowSize - 1, colSize - 1, grid)
  );
  const [isStartFocused, setStartFocused] = useState(false);
  const [isEndFocused, setEndFocused] = useState(false);

  const dispatch = useDispatch();
  const { clearExecuted, clearableCells, algorithm, algorithmSpeed } =
    useSelector(selectPathfindingController);

  const onClickCell = useCallback(
    (coordinate: Coordinate) => {
      if (!algorithmExecuted) {
        const { row, col } = coordinate;
        if (isStartFocused || isEndFocused) {
          if (!coordinate.isEqual(end) && !coordinate.isEqual(start)) {
            if (isStartFocused) {
              setStart(coordinate);
              setStartFocused(false);
              grid[start.row][start.col] = CELL_EMPTY;
            } else {
              setEnd(coordinate);
              setEndFocused(false);
              grid[end.row][end.col] = CELL_EMPTY;
            }
            grid[row][col] = CELL_EMPTY;
            setGrid([...grid]);
          }
        } else {
          if (coordinate.isEqual(start)) {
            setStartFocused(true);
            grid[row][col] = CELL_SELECTED;
          } else if (coordinate.isEqual(end)) {
            setEndFocused(true);
            grid[row][col] = CELL_SELECTED;
          } else {
            const status = grid[row][col];
            grid[row][col] = Number(status !== 1);
          }
          setGrid([...grid]);
        }
      }
    },
    [start, end, grid, algorithmExecuted, isStartFocused, isEndFocused]
  );

  const onColored = useCallback(
    (coordinate: Coordinate, color: number) => {
      const { row, col } = coordinate;
      grid[row][col] = color;
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

      const [visitedCells, prevs] = pathfindingAlgorithms[algorithm](
        grid,
        start,
        end
      );
      visitedCells.forEach(([coordinate], i) => {
        setTimeout(() => {
          onColored(coordinate, CELL_MARKED);
        }, (i * MARK_DELAY) / algorithmSpeed);
      });

      if (!prevs[end.row][end.col]) {
        setAlgorithmExecuted(false);
      } else {
        const cellsInPath: Coordinate[] = [];
        let currentCell = end;
        while (!currentCell.isEqual(start)) {
          cellsInPath.push(currentCell);
          const nextCell = prevs[currentCell.row][currentCell.col];
          if (nextCell) {
            currentCell = nextCell;
          }
        }
        cellsInPath.push(start);

        const pathSize = cellsInPath.length;
        const visitedSize = visitedCells.length;
        const timeoutOffset = (visitedSize * MARK_DELAY) / algorithmSpeed;
        cellsInPath.forEach((coordinate, i) => {
          setTimeout(() => {
            onColored(coordinate, CELL_IN_PATH);
            if (i === 0) {
              setAlgorithmExecuted(false);
            }
          }, timeoutOffset + (pathSize - i - 1) * PATH_FOUND_DELAY);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    algorithm,
    algorithmSpeed,
    algorithmExecuted,
    setAlgorithmExecuted,
    start,
    end,
  ]);

  // When "Clear" button is hit
  useEffect(() => {
    if (clearExecuted) {
      grid.forEach((r, i) =>
        r.forEach((c, j) => {
          if (clearableCells.Blocked && grid[i][j] === CELL_BLOCKED)
            grid[i][j] = CELL_EMPTY;
          else if (clearableCells.Path && grid[i][j] === CELL_IN_PATH)
            grid[i][j] = CELL_EMPTY;
          else if (clearableCells.Visited && grid[i][j] === CELL_MARKED)
            grid[i][j] = CELL_EMPTY;
        })
      );
      setGrid([...grid]);
      dispatch(setClearExecuted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearExecuted]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unmarkExecuted, setUnmarkExecuted]);

  // When a client window size is changed
  useEffect(() => {
    const resizedGrid = initMatrix(rowSize, colSize, CELL_EMPTY);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSize, colSize]);

  return (
    <div>
      {grid.map((row, r) => (
        <div
          key={r}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {row.map((type, c) => {
            const coordinate = new Coordinate(r, c, grid);
            const isStart = start.isEqual(coordinate);
            const isEnd = end.isEqual(coordinate);
            return (
              <Cell
                key={c}
                size={cellSize}
                status={type}
                isStart={isStart}
                isEnd={isEnd}
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
