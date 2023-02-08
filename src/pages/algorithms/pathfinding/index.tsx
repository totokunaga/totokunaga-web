import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import style from "@styles/default.module.scss";
import { PathfindingControlSection, Grid } from "@components/algorithms";
import { CELL_SIZE } from "@utils/constants";
import { useWindowSize } from "@utils/hooks";
import { MyHead } from "@components/common";
import {
  pages,
  pathfindingConfigId,
  pathfindingPageId,
} from "@utils/constants";
import { selectPathfindingController, setWidth } from "@utils/slices";
import { getStripeSize } from "@utils/functions";
import { useSelector } from "react-redux";

const { pathfinding } = pages;

const PathfindingIndex: React.FC = () => {
  const { width, height } = useWindowSize();
  const [rowSize, setRowSize] = useState(0);
  const [colSize, setColSize] = useState(0);
  const [cellSize, setCellSize] = useState(0);
  const [unmarkExecuted, setUnmarkExecuted] = useState(false);

  const dispatch = useDispatch();
  const { algorithmExecuted } = useSelector(selectPathfindingController);

  useEffect(() => {
    if (!algorithmExecuted && width && height) {
      const d = document;
      const pathfindingPage = d.getElementById(pathfindingPageId);
      const pathfindingConfig = d.getElementById(pathfindingConfigId);
      const pageWidth = pathfindingPage?.clientWidth || 0;
      const topHeight = pathfindingConfig?.clientHeight || 0;

      const gridHeight = height - topHeight - 16;
      const gridWidth = pageWidth;
      const [cellSize, colSize] = getStripeSize(gridWidth, CELL_SIZE);
      const rowSize = Math.max(Math.floor(gridHeight / cellSize), 15);
      setCellSize(cellSize);
      setColSize(Math.floor(colSize) - 1);
      setRowSize(Math.floor(rowSize) - 1);

      dispatch(setWidth(width));
    }
  }, [width]);

  return (
    <>
      <MyHead {...pathfinding} />
      <div className={style.root}>
        <div
          id={pathfindingPageId}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div id={pathfindingConfigId}>
            <h3 style={{ marginBottom: 8 }}>Pathfinding</h3>
            <PathfindingControlSection />
          </div>
          <Grid
            rowSize={rowSize}
            colSize={colSize}
            cellSize={cellSize}
            unmarkExecuted={unmarkExecuted}
            setUnmarkExecuted={setUnmarkExecuted}
          />
        </div>
      </div>
    </>
  );
};

export default PathfindingIndex;
