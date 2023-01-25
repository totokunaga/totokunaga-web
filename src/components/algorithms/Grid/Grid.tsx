import { useCallback, useEffect, useState } from "react";
import { Cell } from "../Cell";
import { GridProp } from "./types";

const Grid: React.FC<GridProp> = (props) => {
  const {
    originalRowSize: rowSize,
    originalColSize: colSize,
    cellSize = 30,
  } = props;

  // const [rowSize, setRowSize] = useState(originalRowSize);
  // const [colSize, setColSize] = useState(originalColSize);
  const [grid, setGrid] = useState(
    Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => 0)
    )
  );

  useEffect(() => {
    const resized_grid = Array.from({ length: rowSize }, () =>
      Array.from({ length: colSize }, () => 0)
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

  const onClickReset = useCallback(() => {
    setGrid(
      Array.from({ length: rowSize }, () =>
        Array.from({ length: colSize }, () => 0)
      )
    );
  }, [rowSize, colSize]);

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
