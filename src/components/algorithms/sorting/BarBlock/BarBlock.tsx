import { useEffect, useMemo, useState } from "react";
import { InnerValue } from "@utils/types";
import { Bar } from "../Bar";
import style from "../Bar/bar.module.scss";
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

type BarBlockProp = {
  barWidth?: number;
  values: number[];
  swapAnimationSpeed?: number;
};

const heightUnit = 45;

export const BarBlock: React.FC<BarBlockProp> = ({
  barWidth,
  values,
  swapAnimationSpeed = 0.5,
}) => {
  const [barInfo, setBarInfo] = useState<InnerValue[]>([]);
  const [barIds, setBarIds] = useState<number[]>([]);

  const dispatch = useDispatch();
  const { algorithm, algorithmExecuted, randomizeExecuted } = useSelector(
    selectSortindingController
  );

  const barBlockClassName = useMemo(() => {
    const classes = [style.barblock];
    return classes.join(" ");
  }, []);

  const barClassName = useMemo(() => {
    const classes = [style.bar_wrapper];
    return classes.join(" ");
  }, []);

  useEffect(() => {
    setBarInfo(initBars(values));
    setBarIds(values.map((v, i) => i));
  }, [values]);

  useEffect(() => {
    if (algorithmExecuted) {
      const sortingAnimations = sortingAlgorithms[algorithm](
        barIds.map((i) => barInfo[i].value)
      );

      let timeoutAmount = 0;
      let baseBarIds = barIds;
      let baseBarInfo = barInfo;
      sortingAnimations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          const [newBarInfo, newBarIds] = animateBars(
            baseBarInfo,
            baseBarIds,
            animation
          );
          baseBarIds = newBarIds;
          baseBarInfo = newBarInfo;
          setBarInfo(newBarInfo);
          setBarIds(newBarIds);

          if (i === sortingAnimations.length - 1) {
            dispatch(setSortingAlgorithmExecuted(false));
          }
        }, timeoutAmount);
      });
    }
  }, [algorithmExecuted]);

  useEffect(() => {
    if (randomizeExecuted) {
      const sortingAnimations = shuffle(barIds.map((i) => barInfo[i].value));

      let timeoutAmount = 0;
      let baseBarIds = barIds;
      let baseBarInfo = barInfo;
      sortingAnimations.forEach((animation, i) => {
        timeoutAmount += animation.duration;
        setTimeout(() => {
          const [newBarInfo, newBarIds] = animateBars(
            baseBarInfo,
            baseBarIds,
            animation
          );
          baseBarIds = newBarIds;
          baseBarInfo = newBarInfo;
          setBarInfo(newBarInfo);
          setBarIds(newBarIds);

          if (i === sortingAnimations.length - 1) {
            dispatch(setBarRandamized(false));
          }
        }, timeoutAmount);
      });
    }
  }, [randomizeExecuted]);

  return (
    <div className={barBlockClassName} style={{ margin: "0px auto 0px auto" }}>
      {barInfo.map(({ status, value, size, left }, i) => (
        <div
          key={i}
          className={barClassName}
          style={{
            bottom: 60,
            left,
            transition: `all ${swapAnimationSpeed}s ease-in-out`,
          }}
        >
          <Bar
            status={status}
            height={size}
            width={heightUnit}
            direction={"horizontal"}
            value={value}
          />
        </div>
      ))}
    </div>
  );
};
