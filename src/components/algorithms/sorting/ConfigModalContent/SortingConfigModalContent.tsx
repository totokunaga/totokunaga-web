import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, RadioBlock, Slider } from "@components/common";
import {
  selectSortindingController,
  setNumberOfBars,
  setSortindingAlgorithm,
  setSortingAlgorithmSpeed,
} from "@utils/slices";
import { SortingAlgorithm, sortingNames } from "@utils/types";
import textStyle from "@styles/text.module.scss";

export const SortingConfigModalContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const dispatch = useDispatch();
  const { algorithm, algorithmSpeed, numberOfBars } = useSelector(
    selectSortindingController
  );

  const onChangeAlgorithm = useCallback(
    (value: SortingAlgorithm) => {
      dispatch(setSortindingAlgorithm(value));
    },
    [dispatch]
  );

  const onChangeSpeed = useCallback(
    (value: number) => {
      dispatch(setSortingAlgorithmSpeed(value));
    },
    [dispatch]
  );

  const onChangeNumberOfBars = useCallback(
    (value: number) => {
      dispatch(setNumberOfBars(value));
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

  const getBarAmount = useCallback((value: number) => {
    const baseValue = 50;
    const middleValue = 11; // # of bars in [1, 25]

    const scaled = value / baseValue;
    let numberOfBars = scaled * middleValue;
    const rounded = Math.round(numberOfBars) + 2;
    return rounded > 0 ? rounded : 2;
  }, []);

  const getDisplayedBarAmount = useCallback((value: number) => {
    return String(value);
  }, []);

  return (
    <div>
      <h3>Configuration</h3>
      <p
        className={textStyle.xlarger}
        style={{ fontWeight: 700, marginBottom: "0.75em" }}
      >
        Algorithm
      </p>
      <div style={{ marginBottom: 12 }}>
        <RadioBlock
          items={Object.keys(sortingNames)}
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
          name={"sortingAnimationSpeed"}
          initValue={algorithmSpeed}
          onChange={onChangeSpeed}
          getUpdateValue={getSpeedAmount}
          getDisplayValue={getDisplayedSpeed}
        />
      </div>

      <p
        className={textStyle.xlarger}
        style={{ fontWeight: 700, marginBottom: "0.75em" }}
      >
        Number of Bars
      </p>
      <div style={{ marginBottom: 32 }}>
        <Slider
          name={"numberOfBars"}
          initValue={numberOfBars}
          onChange={onChangeNumberOfBars}
          getUpdateValue={getBarAmount}
          getDisplayValue={getDisplayedBarAmount}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Button onClick={() => onClose()} fontWeight={700} type={"normal"}>
          {"Close Configuration"}
        </Button>
      </div>
    </div>
  );
};
