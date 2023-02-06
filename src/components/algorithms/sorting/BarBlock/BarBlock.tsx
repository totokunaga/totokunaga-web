import { useEffect, useMemo, useState } from "react";
import { InnerValue, SortingAnimation } from "@utils/types";
import { Bar } from "../Bar";
import style from "../Bar/bar.module.scss";
import { animateBars } from "@utils/functions";
import {
  quicksort,
  selectionSort,
} from "@utils/functions/pages/algorithms/sorting/algorithms";

type BarBlockProp = {
  barWidth?: number;
  values: number[];
  swapAnimationSpeed?: number;
};

const heightUnit = 45;
const spaceAmount = 8;

export const BarBlock: React.FC<BarBlockProp> = ({
  barWidth,
  values,
  swapAnimationSpeed = 0.5,
}) => {
  const [barInfo, setBarInfo] = useState<InnerValue[]>(
    values.map((v, i) => ({
      value: v,
      status: "normal",
      size: heightUnit * v,
      left: (heightUnit + spaceAmount) * i,
    }))
  );
  const [barIds, setBarIds] = useState<number[]>(values.map((v, i) => i));

  const barBlockClassName = useMemo(() => {
    const classes = [style.barblock];
    return classes.join(" ");
  }, []);

  const barClassName = useMemo(() => {
    const classes = [style.bar_wrapper];
    return classes.join(" ");
  }, []);

  useEffect(() => {
    const sortingAnimations = quicksort(barInfo.map((b) => b.value));

    let timeoutAmount = 0;
    let baseBarIds = barIds;
    let baseBarInfo = barInfo;
    sortingAnimations.forEach((animation) => {
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
      }, timeoutAmount);
    });
  }, []);

  return (
    <div className={barBlockClassName}>
      {barInfo.map(({ status, value, size, left }, i) => (
        <div
          key={i}
          className={barClassName}
          style={{
            bottom: 0,
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
