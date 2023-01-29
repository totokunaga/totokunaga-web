import { useCallback, useEffect, useState } from "react";

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

const AlgorithmHome = () => {
  const { width, height } = useWindowSize();
  const [rowSize, setRowSize] = useState(0);
  const [colSize, setColSize] = useState(0);
  const [algorithm, setAlgorithm] = useState<Pathfinding>("BFS");
  const [algorithmSpeed, setAlgorithmSpeed] = useState<Speed>("Normal");
  const [algorithmExecuted, setAlgorithmExecuted] = useState(false);
  const [clearExecuted, setClearExecuted] = useState(false);
  const [unmarkExecuted, setUnmarkExecuted] = useState(false);

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

  useEffect(() => console.log(algorithmExecuted), [algorithmExecuted]);

  useEffect(() => {
    if (width && height) {
      const d = document;
      const pathfindingPage = d.getElementById(pathfindingPageId);
      const pathfindingConfig = d.getElementById(pathfindingConfigId);
      const pageWidth = pathfindingPage?.clientWidth || 0;
      const topHeight = pathfindingConfig?.clientHeight || 0;

      const gridHeight = height - topHeight;
      const gridWidth = pageWidth;
      const colSize = gridWidth / CELL_SIZE;
      const rowSize = gridHeight / CELL_SIZE;
      setColSize(Math.floor(colSize) - 1);
      setRowSize(Math.floor(rowSize) - 1);
    }
  }, [width, height]);

  return (
    <>
      <MyHead {...pageInfo} />
      <div className={style.root}>
        <div id={pathfindingPageId}>
          <div id={pathfindingConfigId}>
            <h2>{pageInfo.headerTitle}</h2>
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
          <div className={style.horizontallyAligned}>
            <Grid
              rowSize={rowSize}
              colSize={colSize}
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
      </div>
    </>
  );
};

export default AlgorithmHome;
