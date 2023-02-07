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
import {
  barBlockBottomOffset,
  baseColoringSpped,
  baseTransitionSpeed,
} from "@utils/constants";

type BarBlockProp = {
  barWidth: number;
  heightUnit: number;
  values: number[];
};

export const BarBlock: React.FC<BarBlockProp> = ({
  barWidth,
  heightUnit,
  values,
}) => {
  const [barInfo, setBarInfo] = useState<InnerValue[]>([]);
  const [barIds, setBarIds] = useState<number[]>([]);
  const [coloringSpeed, setColoringSpeed] = useState(baseColoringSpped);
  const [swapSpeed, setSwapSpeed] = useState(baseColoringSpped);

  const dispatch = useDispatch();
  const { algorithm, algorithmExecuted, randomizeExecuted, algorithmSpeed } =
    useSelector(selectSortindingController);

  const barBlockClassName = useMemo(() => {
    const classes = [style.barblock];
    return classes.join(" ");
  }, []);

  const barClassName = useMemo(() => {
    const classes = [style.bar_wrapper];
    return classes.join(" ");
  }, []);

  useEffect(() => {
    setBarInfo(initBars(values, barWidth, heightUnit));
    setBarIds(values.map((v, i) => i));
  }, [values]);

  useEffect(() => {
    setSwapSpeed(baseTransitionSpeed / algorithmSpeed);
    setColoringSpeed(baseColoringSpped / algorithmSpeed);
  }, [algorithmSpeed]);

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
            barWidth,
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
            barWidth,
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
            bottom: barBlockBottomOffset,
            left,
            transition: `left ${swapSpeed}s ease-in-out, background-color ${coloringSpeed}s`,
          }}
        >
          <Bar
            status={status}
            height={size}
            width={barWidth}
            direction={"horizontal"}
            value={value}
          />
        </div>
      ))}
    </div>
  );
};
