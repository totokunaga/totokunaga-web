import { useCallback, useEffect, useState } from "react";
import { Cell, CELL_EMPTY, CELL_MARKED } from "../Cell";
import { GridProp } from "./types";

const Grid: React.FC<GridProp> = (props) => {
  const {
    originalRowSize: rowSize,
    originalColSize: colSize,
    cellSize = 30,
    pathfindingAlgorithm,
    algorithmFired,
  } = props;

  const [start, setStart] = useState<[number, number]>([0, 0]);
  const [end, setEnd] = useState<[number, number]>([rowSize - 1, colSize - 1]);
  const [grid, setGrid] = useState(
    Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => 0)
    )
  );

  useEffect(() => {
    const resized_grid = Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => CELL_EMPTY)
    );

    setGrid(resized_grid);
  }, [rowSize, colSize]);

  const onClickCell = useCallback(
    (coordinate: [number, number]) => {
      const [r, c] = coordinate;
      const status = grid[r][c];
      grid[r][c] = Math.abs(status - 1);
      setGrid([...grid]);
    },
    [grid]
  );

  const onMarked = useCallback(
    (coordinate: [number, number]) => {
      const [r, c] = coordinate;
      grid[r][c] = CELL_MARKED;
      setGrid([...grid]);
    },
    [grid]
  );

  useEffect(() => {
    if (algorithmFired) {
      pathfindingAlgorithm(grid, start, end).forEach(([r, c], i) => {
        setTimeout(() => onMarked([r, c]), i * 5);
      });
    }
  }, [pathfindingAlgorithm, algorithmFired, start, end, grid]);

  return (
    <div>
      {grid.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((type, c) => (
            <Cell
              key={c}
              size={cellSize}
              status={type}
              coordinate={[r, c]}
              onClick={onClickCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
