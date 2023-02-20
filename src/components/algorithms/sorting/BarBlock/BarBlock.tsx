import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CSSStyle, SortableBar, SortingPrevAnimationType } from "@utils/types";
import { Bar } from "../Bar";
import {
  animateBars,
  getSortingAnimation,
  initBars,
  visualizeSorting,
} from "@utils/functions";
import { swap } from "@utils/functions/pages/algorithms/sorting/algorithms";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectSortindingController,
  setBarRandamized,
  setSortingAlgorithmExecuted,
} from "@utils/slices";
import { shuffle } from "@utils/functions/pages/algorithms/sorting/algorithms/shuffle";
import { sortingTransitionSpeed } from "@utils/constants";
import barStyle from "../Bar/bar.module.scss";

type BarBlockProp = CSSStyle & {
  values: number[];
  setControllerVisible: Dispatch<SetStateAction<boolean>>;
};

export const BarBlock: React.FC<BarBlockProp> = ({
  values,
  setControllerVisible,
}) => {
  const [innerValues, setInnerValues] = useState<number[]>([]);
  const [bars, setBars] = useState<SortableBar[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);
  const [showValue, setShowValue] = useState(true);

  const [rearrangeTargetOne, setRearrangeTargetOne] = useState<number>();
  const [rearrangeTargetTwo, setRearrangeTargetTwo] = useState<number>();

  const dispatch = useDispatch();
  const { algorithm, algorithmSpeed, algorithmExecuted, randomizeExecuted } =
    useSelector(selectSortindingController);

  // Initialize bar related UI information
  useEffect(() => {
    setInnerValues(values);
    setBars(initBars(values));
    setIndexes(values.map((_, i) => i));
    setControllerVisible(true);
  }, [values]);

  useEffect(() => {
    const barElement = document.getElementById("bar-1");
    if (barElement) {
      const barWidth = barElement.clientWidth;
      setShowValue(barWidth > 24);
    }
  });

  // Clearup function when unmounted
  useEffect(() => {
    return () => {
      dispatch(setSortingAlgorithmExecuted(false));
      dispatch(setBarRandamized(false));
    };
  }, [dispatch]);

  // When "Start" button is hit
  useEffect(() => {
    if (algorithmExecuted) {
      visualizeSorting(
        algorithm,
        bars,
        indexes,
        innerValues,
        setBars,
        setIndexes
      );
    }
  }, [algorithmExecuted]);

  // When "Randomize" button is hit
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

  // When a user clicks two different bars to rearrange elements
  useEffect(() => {
    if (rearrangeTargetOne && rearrangeTargetTwo) {
      const indexOne = innerValues.indexOf(rearrangeTargetOne);
      const indexTwo = innerValues.indexOf(rearrangeTargetTwo);
      const animations = [];
      const prevAnimation = new SortingPrevAnimationType("none");
      animations.push(
        getSortingAnimation("swap", [indexOne, indexTwo], prevAnimation)
      );
      animations.push(getSortingAnimation("reset", [], prevAnimation));

      let timeoutAmount = 0;
      let newBars = [...bars];
      let newIndexes = [...indexes];
      let newInnerValues = [...innerValues];
      swap(newInnerValues, indexOne, indexTwo);
      animations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          animateBars(newBars, newIndexes, animation);
          setBars([...newBars]);
          setIndexes([...newIndexes]);
          setInnerValues(newInnerValues);

          if (i === animations.length - 1) {
            setRearrangeTargetOne(undefined);
            setRearrangeTargetTwo(undefined);
          }
        }, timeoutAmount);
      });
    }
  }, [rearrangeTargetOne, rearrangeTargetTwo]);

  const onBarClick = useCallback(
    (value?: number) => {
      if (!algorithmExecuted && !randomizeExecuted && value !== undefined) {
        let newBars = [...bars];
        if (rearrangeTargetOne === undefined) {
          setRearrangeTargetOne(value);
          const animation = getSortingAnimation(
            "focus",
            [innerValues.indexOf(value)],
            new SortingPrevAnimationType("none")
          );
          animateBars(newBars, indexes, animation);
          setBars([...newBars]);
        } else {
          if (value === rearrangeTargetOne) {
            setRearrangeTargetOne(undefined);
            const animation = getSortingAnimation(
              "clear",
              [innerValues.indexOf(value)],
              new SortingPrevAnimationType("none")
            );
            animateBars(newBars, indexes, animation);
            setBars([...newBars]);
          } else {
            setRearrangeTargetTwo(value);
          }
        }
      }
    },
    [bars, innerValues, rearrangeTargetOne, rearrangeTargetTwo]
  );

  return (
    <div className={barStyle.barblock_wrapper}>
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
              onClickHandler={onBarClick}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
