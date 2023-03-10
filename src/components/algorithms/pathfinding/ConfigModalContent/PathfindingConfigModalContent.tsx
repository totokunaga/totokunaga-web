import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import textStyle from "@styles/text.module.scss";
import { Button, RadioBlock, Slider } from "@components/common";
import { ClearableCellType } from "@utils/types";
import {
  selectPathfindingController,
  setClearableCells,
  setPathfindingAlgorithm,
  setPathfindingAlgorithmSpeed,
} from "@utils/slices";
import { Pathfinding } from "@utils/types";

export const pathfindingNames: Record<Pathfinding, string> = {
  "A*": "A*",
  "Random Walk": "Random Walk",
  Bidirectional: "Bidirectional",
  BFS: "BFS",
  DFS: "DFS",
};

const configModalContentId = "pathfinding-config-modal-content";
const configOptionsWrapperId = "pathfinding-config-options-wrapper";
const configModalTitleId = "pathfinding-config-modal-title";
const configModalCloseButtonId = "pathfinding-config-modal-close-button";

export const ConfigModalContent: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [configOptionsHeight, setConfigOptionsHeight] = useState<number>();

  const dispatch = useDispatch();
  const { algorithm, algorithmSpeed } = useSelector(
    selectPathfindingController
  );

  const onChangeAlgorithm = useCallback(
    (value: Pathfinding) => {
      dispatch(setPathfindingAlgorithm(value));
    },
    [dispatch]
  );

  const onChangeSpeed = useCallback(
    (value: number) => {
      dispatch(setPathfindingAlgorithmSpeed(value));
    },
    [dispatch]
  );

  const getSpeedAmount = useCallback((value: number) => {
    const roundAmount = 100;
    const baseValue = 50;
    const scaled = value / baseValue;
    const rounded = Math.round(scaled * roundAmount) / roundAmount;
    return rounded > 0 ? rounded : 0.01;
  }, []);

  const getDisplayedSpeed = useCallback((value: number) => {
    let displayed = String(value);
    if (value % 1 === 0) {
      displayed = displayed.padEnd(4, ".00");
    }
    displayed = displayed.padEnd(4, "0");
    return `x${displayed}`;
  }, []);

  useEffect(() => {
    const configModalContentElement =
      document.getElementById(configModalContentId);
    const configOptionsWrapperElement = document.getElementById(
      configOptionsWrapperId
    );
    const configModalContentTitleElement =
      document.getElementById(configModalTitleId);
    const configOptionsWrapperCloseButtonElement = document.getElementById(
      configModalCloseButtonId
    );

    if (
      configModalContentElement &&
      configOptionsWrapperElement &&
      configModalContentTitleElement &&
      configOptionsWrapperCloseButtonElement
    ) {
      const modalContentHeight = configModalContentElement.clientHeight;
      const modalOptionsHeight = configOptionsWrapperElement.clientHeight;
      const maxModalOptionsHeight = modalContentHeight * 0.7;
      if (modalOptionsHeight > maxModalOptionsHeight) {
        setConfigOptionsHeight(maxModalOptionsHeight);
      }
    }
  }, []);

  return (
    <div id={configModalContentId}>
      <h3 id={configModalTitleId}>Configuration</h3>
      <div id={configOptionsWrapperId} style={{ height: configOptionsHeight }}>
        <p
          className={textStyle.xlarger}
          style={{ fontWeight: 700, marginBottom: "0.75em" }}
        >
          Algorithm
        </p>
        <div style={{ marginBottom: 12 }}>
          <RadioBlock
            items={Object.values(pathfindingNames)}
            value={algorithm}
            onChange={onChangeAlgorithm}
          />
        </div>

        <p
          className={textStyle.xlarger}
          style={{ fontWeight: 700, marginBottom: "0.75em" }}
        >
          Animation speed
        </p>
        <div style={{ marginBottom: 32 }}>
          <Slider
            name={"pathfindingAlgorithmSpeed"}
            initValue={algorithmSpeed}
            onChange={onChangeSpeed}
            getUpdateValue={getSpeedAmount}
            getDisplayValue={getDisplayedSpeed}
          />
        </div>
      </div>
      <div
        id={configModalCloseButtonId}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 32,
        }}
      >
        <Button
          onClick={() => onClose()}
          fontWeight={700}
          type={"normal"}
          flexGrow={1}
        >
          {"Close Configuration"}
        </Button>
      </div>
    </div>
  );
};
