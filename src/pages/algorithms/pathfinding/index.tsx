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
import { selectPathfindingController } from "@utils/slices";
import { useSelector } from "react-redux";

const { pathfinding } = pages;

const PathfindingIndex: React.FC = () => {
  const { width, height } = useWindowSize();
  const [rowSize, setRowSize] = useState(0);
  const [colSize, setColSize] = useState(0);
  const [unmarkExecuted, setUnmarkExecuted] = useState(false);

  const { algorithmExecuted } = useSelector(selectPathfindingController);

  useEffect(() => {
    if (!algorithmExecuted && width && height && rowSize === 0) {
      const d = document;
      const pathfindingPage = d.getElementById(pathfindingPageId);
      if (pathfindingPage) {
        const gridHeight = pathfindingPage.clientHeight;
        const gridWidth = pathfindingPage.clientWidth;
        const rowSize = Math.max(Math.floor(gridHeight / CELL_SIZE), 15);
        const colSize = Math.floor(gridWidth / CELL_SIZE);
        setRowSize(rowSize);
        setColSize(colSize);
      }
    }
  }, [width, height]);

  return (
    <>
      <MyHead {...pathfinding} />
      <div className={style.root} style={{ height: "100dvh" }}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <h3 style={{ marginBottom: 8 }}>Pathfinding</h3>
          <div
            className={style.mobile_friendly_flex}
            style={{ height: "100%" }}
          >
            <PathfindingControlSection />
            <Grid
              rowSize={rowSize}
              colSize={colSize}
              unmarkExecuted={unmarkExecuted}
              setUnmarkExecuted={setUnmarkExecuted}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PathfindingIndex;
