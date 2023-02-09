import { Fragment, useEffect, useState } from "react";
import { CSSStyle, SortableBar } from "@utils/types";
import { TestBar } from "../Bar";
import { animateTestBars, initTestBars } from "@utils/functions";
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

type BarBlockProp = CSSStyle & {
  values: number[];
};

export const BarBlock: React.FC<BarBlockProp> = ({ values }) => {
  const [innerValues, setInnerValues] = useState<number[]>([]);
  const [bars, setBars] = useState<SortableBar[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);

  const dispatch = useDispatch();
  const { algorithm, algorithmSpeed, algorithmExecuted, randomizeExecuted } =
    useSelector(selectSortindingController);

  useEffect(() => {
    setInnerValues(values);
    setBars(initTestBars(values));
    setIndexes(values.map((_, i) => i));
  }, [values]);

  useEffect(() => {
    if (algorithmExecuted) {
      const sortingAnimations = sortingAlgorithms[algorithm](innerValues);

      let timeoutAmount = 0;
      let newBars = [...bars];
      let newIndexes = [...indexes];
      sortingAnimations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          animateTestBars(newBars, newIndexes, animation);
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
          animateTestBars(newBars, newIndexes, animation);
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
            <TestBar
              status={status}
              height={`${Math.floor(14 * value)}%`}
              width={"80%"}
              translate={{ x: relativeIndex, y: 0 }}
              transition={`all ${
                sortingTransitionSpeed[status] / algorithmSpeed
              }s ease-in-out`}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
