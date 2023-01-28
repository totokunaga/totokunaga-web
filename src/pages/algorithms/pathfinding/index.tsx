import { useCallback, useEffect, useState } from "react";

import defaultStyles from "@styles/default.module.css";
import Grid from "@components/algorithms/Grid/Grid";
import {
  algorithmOptions,
  CELL_SIZE,
  Pathfinding,
  pathfindingAlgorithms,
} from "@utils/pathfinding";
import { useWindowSize } from "@utils/hooks";
import { Button, buttonColor, buttonType, MyHead } from "@components/common";
import { DropdownList } from "@components/common/DropdownList";
import {
  pageInfo,
  pathfindingConfigId,
  pathfindingPageId,
  pathfindingText,
} from "@utils/constants";
import { Cell, cellTypes } from "@components/algorithms";

const AlgorithmHome = () => {
  const { width, height } = useWindowSize();
  const [rowSize, setRowSize] = useState(0);
  const [colSize, setColSize] = useState(0);
  const [algorithm, setAlgorithm] = useState<Pathfinding>("BFS");
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
      <div className={defaultStyles.root}>
        <div id={pathfindingPageId}>
          <div id={pathfindingConfigId}>
            <h2>{pageInfo.headerTitle}</h2>
            <div className={defaultStyles.horizontallyAligned}>
              <Button
                onClick={onStartClick}
                type={buttonType.FLAT}
                colorType={buttonColor.PINK}
                margin={"8px 0"}
              >
                {pathfindingText.startButton}
              </Button>
              <Button
                onClick={onClearClick}
                type={buttonType.FLAT}
                colorType={buttonColor.NAVY}
                margin={"8px 0 8px 8px"}
                fontWeight={400}
              >
                {pathfindingText.clearButton}
              </Button>
              <DropdownList
                title={pathfindingText.dropdownListTitle}
                value={algorithm}
                items={algorithmOptions}
                disabled={algorithmExecuted}
                optionHandler={onChangeAlgorithm}
              />

              <div style={{ display: "flex", margin: "8px 0 8px 8px" }}>
                {cellTypes.map(
                  ({ type, name }, i) =>
                    i > 0 && (
                      <div
                        key={type}
                        className={defaultStyles.horizontallyAligned}
                      >
                        <Cell
                          size={(4 * CELL_SIZE) / 5}
                          status={type}
                          disabled={true}
                        />
                        <span style={{ margin: "0px 10px 0px 5px" }}>
                          {name}
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div className={defaultStyles.horizontallyAligned}>
            <Grid
              rowSize={rowSize}
              colSize={colSize}
              pathfindingAlgorithm={pathfindingAlgorithms[algorithm]}
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
