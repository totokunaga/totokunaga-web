import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell, cellTypes } from "../Cell";
import defaultStyle from "@styles/default.module.scss";
import { Button, Checkbox, RadioBlock, Slider } from "@components/common";
import { ClearableCellType } from "@utils/types";
import {
  selectPathfindingController,
  setClearableCells,
  setClearExecuted,
  setPathfindingAlgorithm,
  setPathfindingAlgorithmSpeed,
} from "@utils/slices";
import { Pathfinding } from "@utils/pathfinding";

export const pathfindingNames: Record<Pathfinding, string> = {
  BFS: "BFS",
  DFS: "DFS",
  "A*": "A*",
  Bidirectional: "Bidirectional",
};

export const ConfigModalContent: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { clearableCells, algorithm, algorithmSpeed } = useSelector(
    selectPathfindingController
  );

  const onClearableCellChecked = useCallback(
    (value: ClearableCellType) => {
      const newClearableCells = { ...clearableCells };
      newClearableCells[value] = !clearableCells[value];
      dispatch(setClearableCells(newClearableCells));
    },
    [clearableCells, dispatch]
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

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Configuration</h2>
      <h3 style={{ marginBottom: 16 }}>Algorithm</h3>
      <div style={{ marginBottom: 12 }}>
        <RadioBlock
          items={Object.keys(pathfindingNames)}
          value={algorithm}
          onChange={onChangeAlgorithm}
        />
      </div>

      <h3 style={{ marginBottom: 16 }}>Animation speed</h3>
      <div style={{ marginBottom: 20 }}>
        <Slider
          initValue={algorithmSpeed}
          onChange={onChangeSpeed}
          getUpdateValue={getSpeedAmount}
          getDisplayValue={getDisplayedSpeed}
        />
      </div>

      <h3 style={{ marginBottom: 16 }}>Cell clear setting</h3>
      {cellTypes.map(({ type, name }, i) => (
        <div
          key={type}
          className={defaultStyle.horizontallyAligned}
          style={{ marginBottom: 8 }}
        >
          <Checkbox
            checked={clearableCells[name]}
            onChecked={() => onClearableCellChecked(name)}
            value={0}
          />
          <div
            className={defaultStyle.horizontallyAligned}
            style={{ cursor: "pointer" }}
            onClick={() => onClearableCellChecked(name)}
          >
            <Cell size={30} status={type} disabled={true} />
            <span style={{ margin: "0px 0px 0px 8px" }}>{name}</span>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Button
          onClick={() => {
            dispatch(setClearExecuted(true));
            onClose();
          }}
          fontSize={16}
          fontWeight={700}
          type={"normal"}
        >
          {"Close Configuration"}
        </Button>
      </div>
    </div>
  );
};
