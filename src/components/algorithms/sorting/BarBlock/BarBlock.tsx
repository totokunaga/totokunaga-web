import { Fragment, useEffect, useState } from "react";
import { CSSStyle, SortableBar } from "@utils/types";
import { Bar } from "../Bar";
import { animateBars, initBars } from "@utils/functions";
import { sortingAlgorithms } from "@utils/functions/pages/algorithms/sorting/algorithms";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectSortindingController,
  setBarRandamized,
  setSortingAlgorithmExecuted,
} from "@utils/slices";
import { shuffle } from "@utils/functions/pages/algorithms/sorting/algorithms/shuffle";
import { sortingTransitionSpeed } from "@utils/constants";
import { useWindowSize } from "@utils/hooks";

type BarBlockProp = CSSStyle & {
  values: number[];
};

export const BarBlock: React.FC<BarBlockProp> = ({ values }) => {
  const [innerValues, setInnerValues] = useState<number[]>([]);
  const [bars, setBars] = useState<SortableBar[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);
  const [showValue, setShowValue] = useState(true);
  const { width } = useWindowSize();

  const dispatch = useDispatch();
  const { algorithm, algorithmSpeed, algorithmExecuted, randomizeExecuted } =
    useSelector(selectSortindingController);

  useEffect(() => {
    setInnerValues(values);
    setBars(initBars(values));
    setIndexes(values.map((_, i) => i));
  }, [values]);

  useEffect(() => {
    const barElement = document.getElementById("bar-1");
    if (barElement) {
      console.log(barElement.clientWidth, barElement.clientHeight);
      setShowValue(barElement.clientWidth > 24 && barElement.clientHeight > 24);
    }
  }, [values, width]);

  useEffect(() => {
    if (algorithmExecuted) {
      const sortingAnimations = sortingAlgorithms[algorithm](innerValues);

      let timeoutAmount = 0;
      let newBars = [...bars];
      let newIndexes = [...indexes];
      sortingAnimations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          animateBars(newBars, newIndexes, animation);
          setBars([...newBars]);
          setIndexes([...newIndexes]);

          if (i === sortingAnimations.length - 1) {
            dispatch(setSortingAlgorithmExecuted(false));
          }
        }, timeoutAmount);
      });
    }
  }, [algorithmExecuted]);

  useEffect(() => {
    if (randomizeExecuted) {
      const shuffledValues = [...innerValues];
      const sortingAnimations = shuffle(shuffledValues);
      setInnerValues(shuffledValues);

      let timeoutAmount = 0;
      let newBars = [...bars];
      let newIndexes = [...indexes];
      sortingAnimations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          animateBars(newBars, newIndexes, animation);
          setBars([...newBars]);
          setIndexes([...newIndexes]);

          if (i === sortingAnimations.length - 1) {
            dispatch(setBarRandamized(false));
          }
        }, timeoutAmount);
      });
    }
  }, [randomizeExecuted]);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex" }}>
      {bars.map(({ value, status, relativeIndex }, i) => {
        return (
          <Fragment key={i}>
            <Bar
              value={value}
              status={status}
              height={`${Math.floor((95 / values.length) * value)}%`}
              width={"80%"}
              translate={{ x: relativeIndex, y: 0 }}
              transition={`all ${
                sortingTransitionSpeed[status] / algorithmSpeed
              }s ease-in-out`}
              showValue={showValue}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
