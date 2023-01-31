import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import style from "@styles/default.module.css";
import Grid from "@components/algorithms/Grid/Grid";
import {
  CELL_SIZE,
  Pathfinding,
  pathfindingAlgorithms,
  Speed,
  speedAmounts,
} from "@utils/pathfinding";
import { useWindowSize } from "@utils/hooks";
import { MyHead } from "@components/common";
import {
  pageInfo,
  pathfindingConfigId,
  pathfindingPageId,
} from "@utils/constants";
import ControlSection from "@components/algorithms/ControlSection";
import { setWidth } from "@utils/slices";
import { getStripeSize } from "@utils/functions";

const AlgorithmHome: React.FC = () => {
  const { width, height } = useWindowSize();
  const [rowSize, setRowSize] = useState(0);
  const [colSize, setColSize] = useState(0);
  const [cellSize, setCellSize] = useState(0);
  const [algorithm, setAlgorithm] = useState<Pathfinding>("BFS");
  const [algorithmSpeed, setAlgorithmSpeed] = useState<Speed>("Normal");
  const [algorithmExecuted, setAlgorithmExecuted] = useState(false);
  const [clearExecuted, setClearExecuted] = useState(false);
  const [unmarkExecuted, setUnmarkExecuted] = useState(false);

  const dispatch = useDispatch();

  const onStartClick = useCallback(() => {
    if (!algorithmExecuted) {
      setAlgorithmExecuted(!algorithmExecuted);
    }
  }, [algorithmExecuted]);

  const onClearClick = useCallback(() => {
    if (!clearExecuted) {
      setClearExecuted(!clearExecuted);
    }
  }, [clearExecuted]);

  const onChangeAlgorithm = useCallback(
    (value: Pathfinding) => {
      setAlgorithm(value);
      if (!unmarkExecuted) {
        setUnmarkExecuted(!unmarkExecuted);
      }
    },
    [unmarkExecuted, setUnmarkExecuted]
  );

  const onChangeAlgorithmSpeed = useCallback((value: Speed) => {
    setAlgorithmSpeed(value);
  }, []);

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
      <MyHead {...pageInfo} />
      <div className={style.root}>
        <div id={pathfindingPageId}>
          <div id={pathfindingConfigId}>
            <h2 style={{ marginBottom: 8 }}>{pageInfo.headerTitle}</h2>
            <ControlSection
              onStartClick={onStartClick}
              onClearClick={onClearClick}
              onChangeAlgorithm={onChangeAlgorithm}
              onChangeAlgorithmSpeed={onChangeAlgorithmSpeed}
              algorithm={algorithm}
              algorithmSpeed={algorithmSpeed}
              algorithmExecuted={algorithmExecuted}
            />
          </div>
          <Grid
            rowSize={rowSize}
            colSize={colSize}
            cellSize={cellSize}
            pathfindingAlgorithm={pathfindingAlgorithms[algorithm]}
            algorithmSpeed={speedAmounts[algorithmSpeed]}
            algorithmExecuted={algorithmExecuted}
            setAlgorithmExecuted={setAlgorithmExecuted}
            clearExecuted={clearExecuted}
            setClearExecuted={setClearExecuted}
            unmarkExecuted={unmarkExecuted}
            setUnmarkExecuted={setUnmarkExecuted}
          />
        </div>
      </div>
    </>
  );
};

export default AlgorithmHome;
