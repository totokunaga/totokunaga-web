import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import style from "@styles/default.module.scss";
import { PathfindingControlSection, Grid } from "@components/algorithms";
import { CELL_SIZE, paths } from "@utils/constants";
import { useWindowSize } from "@utils/hooks";
import { MyHead } from "@components/common";
import { pages, pathfindingPageId } from "@utils/constants";
import { selectPathfindingController, selectWindow } from "@utils/slices";
import GraphIcon from "@assets/graph.svg";
import ColoredGraphIcon from "@assets/colored-graph.svg";

const { pathfinding } = pages;

const PathfindingIndex: React.FC = () => {
  const { width, height } = useWindowSize();
  const [rowSize, setRowSize] = useState(0);
  const [colSize, setColSize] = useState(0);
  const [unmarkExecuted, setUnmarkExecuted] = useState(false);

  const { algorithmExecuted } = useSelector(selectPathfindingController);
  const { isDarkMode } = useSelector(selectWindow);
  const router = useRouter();

  useEffect(() => {
    if (!algorithmExecuted && width && height && rowSize === 0) {
      const d = document;
      const pathfindingPage = d.getElementById(pathfindingPageId);
      if (pathfindingPage) {
        const gridHeight = pathfindingPage.clientHeight;
        const gridWidth = pathfindingPage.clientWidth;
        const rowSize = Math.floor(gridHeight / CELL_SIZE);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "min(12.5%, 40px)",
                marginRight: 5,
                cursor: "pointer",
              }}
              onClick={() => router.push(paths.algorigthms)}
            >
              {!isDarkMode ? (
                <GraphIcon width={"100%"} height={"100%"} />
              ) : (
                <ColoredGraphIcon width={"100%"} height={"100%"} />
              )}
            </div>
            <h3
              style={{ margin: "4px 0 8px 2.5px", cursor: "pointer" }}
              onClick={() => router.push(paths.algorigthms)}
            >
              Pathfinding
            </h3>
          </div>

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
